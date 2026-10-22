/**
 * @jest-environment node
 */
import { z } from 'zod';
import {
  DEFAULT_GROQ_MODEL,
  GROQ_MODEL_UNAVAILABLE_TEXT,
  createGroqFetch,
  createGroqUnavailableMiddleware,
  groqRequestErrorMessage,
  isGroqModelNotFoundError,
  normalizeGroqChatCompletion,
  normalizeGroqSseChunk,
  readGroqJsonContent,
  resolveGroqModelId,
  stripThinkTags,
  withGroqReasoningDisabled,
} from '../groq';

const openaiChatMessageSchema = z.object({
  role: z.literal('assistant').nullish(),
  content: z.string().nullish(),
  tool_calls: z
    .array(
      z.object({
        id: z.string().nullish(),
        type: z.literal('function'),
        function: z.object({
          name: z.string(),
          arguments: z.string(),
        }),
      }),
    )
    .nullish(),
});

describe('resolveGroqModelId', () => {
  const original = process.env.GROQ_MODEL;

  afterEach(() => {
    if (original === undefined) delete process.env.GROQ_MODEL;
    else process.env.GROQ_MODEL = original;
  });

  it('defaults to openai/gpt-oss-120b', () => {
    delete process.env.GROQ_MODEL;
    expect(resolveGroqModelId()).toBe(DEFAULT_GROQ_MODEL);
    expect(DEFAULT_GROQ_MODEL).toBe('openai/gpt-oss-120b');
  });

  it('reads GROQ_MODEL from the environment', () => {
    process.env.GROQ_MODEL = ' llama-3.1-8b-instant ';
    expect(resolveGroqModelId()).toBe('llama-3.1-8b-instant');
  });

  it('lets an explicit model override the environment', () => {
    process.env.GROQ_MODEL = 'llama-3.1-8b-instant';
    expect(resolveGroqModelId('openai/gpt-oss-20b')).toBe('openai/gpt-oss-20b');
  });
});

describe('normalizeGroqChatCompletion', () => {
  it('keeps gpt-oss text in content and drops the reasoning field', () => {
    const normalized = normalizeGroqChatCompletion({
      choices: [
        {
          index: 0,
          message: {
            role: 'assistant',
            content: 'Airplanes fly by generating lift.',
            reasoning: 'Think about Bernoulli first.',
          },
        },
      ],
    });

    expect(normalized.choices[0].message).toEqual({
      role: 'assistant',
      content: 'Airplanes fly by generating lift.',
    });
    expect(openaiChatMessageSchema.parse(normalized.choices[0].message).content).toBe(
      'Airplanes fly by generating lift.',
    );
  });

  it('strips think tags from a full message without using them as the answer', () => {
    expect(stripThinkTags('  <think>secret</think>  visible answer  ')).toBe('visible answer');
    const normalized = normalizeGroqChatCompletion({
      choices: [
        {
          message: {
            role: 'assistant',
            content: '<think>hidden</think>final answer',
          },
        },
      ],
    });
    expect(normalized.choices[0].message.content).toBe('final answer');
  });

  it('joins array content parts into the string the SDK schema requires', () => {
    const normalized = normalizeGroqChatCompletion({
      choices: [
        {
          message: {
            role: 'assistant',
            content: [
              { type: 'text', text: 'Hello ' },
              { type: 'text', text: 'there' },
            ],
          },
        },
      ],
    });
    expect(openaiChatMessageSchema.parse(normalized.choices[0].message).content).toBe(
      'Hello there',
    );
  });

  it('stringifies tool-call arguments so they match the OpenAI tool_calls schema', () => {
    const normalized = normalizeGroqChatCompletion({
      choices: [
        {
          message: {
            role: 'assistant',
            content: null,
            tool_calls: [
              {
                id: 'call_1',
                type: 'function',
                function: { name: 'get_weather', arguments: { location: 'Paris' } },
              },
            ],
          },
        },
      ],
    });
    const message = openaiChatMessageSchema.parse(normalized.choices[0].message);
    expect(message.tool_calls?.[0].function).toEqual({
      name: 'get_weather',
      arguments: '{"location":"Paris"}',
    });
  });

  it('leaves partial streamed tool-call argument strings unchanged', () => {
    const chunk = normalizeGroqSseChunk(
      'data: {"choices":[{"index":0,"delta":{"tool_calls":[{"index":0,"function":{"arguments":"{\\"loca"}}]}}]}\n',
    );
    const payload = JSON.parse(chunk.replace(/^data:\s*/, ''));
    expect(payload.choices[0].delta.tool_calls[0].function.arguments).toBe('{"loca');
  });

  it('parses JSON-mode content as an object while leaving the wire value a string', () => {
    const normalized = normalizeGroqChatCompletion({
      choices: [
        {
          message: {
            role: 'assistant',
            content: '{"title":"How airplanes fly"}',
          },
        },
      ],
    });
    const content = openaiChatMessageSchema.parse(normalized.choices[0].message).content;
    expect(content).toBe('{"title":"How airplanes fly"}');
    expect(readGroqJsonContent(content)).toEqual({ title: 'How airplanes fly' });
  });
});

describe('withGroqReasoningDisabled', () => {
  it('sets include_reasoning false on chat completion requests', () => {
    const body = withGroqReasoningDisabled(
      JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages: [{ role: 'user', content: 'Hi' }],
      }),
    );
    expect(JSON.parse(body).include_reasoning).toBe(false);
  });

  it('moves max_tokens onto max_completion_tokens', () => {
    const body = withGroqReasoningDisabled(
      JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages: [{ role: 'user', content: 'Hi' }],
        max_tokens: 100,
      }),
    );
    const parsed = JSON.parse(body);
    expect(parsed.max_completion_tokens).toBe(100);
    expect(parsed.max_tokens).toBeUndefined();
  });

  it('does not send include_reasoning together with reasoning_format', () => {
    const body = withGroqReasoningDisabled(
      JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages: [{ role: 'user', content: 'Hi' }],
        reasoning_format: 'hidden',
      }),
    );
    const parsed = JSON.parse(body);
    expect(parsed.reasoning_format).toBe('hidden');
    expect(parsed.include_reasoning).toBeUndefined();
  });
});

describe('createGroqFetch', () => {
  it('rewrites a JSON chat completion before the SDK parses it', async () => {
    const fetchImpl = jest.fn(async (_input, init) => {
      expect(JSON.parse(init.body).include_reasoning).toBe(false);
      return new Response(
        JSON.stringify({
          choices: [
            {
              index: 0,
              message: {
                role: 'assistant',
                content: '<think>x</think>answer',
                reasoning: 'x',
                tool_calls: [
                  {
                    id: 'call_1',
                    type: 'function',
                    function: { name: 'lookup', arguments: { q: 'planes' } },
                  },
                ],
              },
            },
          ],
        }),
        { status: 200, headers: { 'content-type': 'application/json' } },
      );
    });

    const response = await createGroqFetch(fetchImpl as unknown as typeof fetch)(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        body: JSON.stringify({
          model: 'openai/gpt-oss-120b',
          messages: [{ role: 'user', content: 'Hi' }],
        }),
      },
    );
    const json = await response.json();
    expect(openaiChatMessageSchema.parse(json.choices[0].message)).toMatchObject({
      content: 'answer',
      tool_calls: [{ function: { name: 'lookup', arguments: '{"q":"planes"}' } }],
    });
    expect(json.choices[0].message.reasoning).toBeUndefined();
  });

  it('normalizes tool-call arguments split across SSE chunks', async () => {
    const payload = JSON.stringify({
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: 'call_1',
                type: 'function',
                function: { name: 'lookup', arguments: { q: 'planes' } },
              },
            ],
          },
        },
      ],
    });
    const encoded = `data: ${payload}\n\n`;
    const midpoint = Math.floor(encoded.length / 2);
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(encoded.slice(0, midpoint)));
        controller.enqueue(new TextEncoder().encode(encoded.slice(midpoint)));
        controller.close();
      },
    });
    const fetchImpl = jest.fn(async () => {
      return new Response(stream, {
        status: 200,
        headers: { 'content-type': 'text/event-stream' },
      });
    });

    const response = await createGroqFetch(fetchImpl as unknown as typeof fetch)(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        body: JSON.stringify({
          model: 'openai/gpt-oss-120b',
          messages: [{ role: 'user', content: 'Hi' }],
        }),
      },
    );
    const text = await response.text();
    const dataLine = text
      .split('\n')
      .find((line) => line.startsWith('data: ') && !line.includes('[DONE]'));
    const json = JSON.parse(dataLine.replace(/^data:\s*/, ''));
    expect(json.choices[0].delta.tool_calls[0].function.arguments).toBe('{"q":"planes"}');
  });
});

describe('model not found', () => {
  const providerError = Object.assign(
    new Error(
      'The model `llama-3.3-70b-versatile` does not exist or you do not have access to it.',
    ),
    {
      name: 'AI_APICallError',
      statusCode: 404,
      data: {
        error: {
          code: 'model_not_found',
          message:
            'The model `llama-3.3-70b-versatile` does not exist or you do not have access to it.',
        },
      },
    },
  );

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('recognizes the Groq model_not_found API error', () => {
    expect(isGroqModelNotFoundError(providerError)).toBe(true);
    expect(isGroqModelNotFoundError(new Error('socket hang up'))).toBe(false);
  });

  it('logs a clear error and returns a response message instead of throwing', () => {
    expect(groqRequestErrorMessage(providerError)).toBe(GROQ_MODEL_UNAVAILABLE_TEXT);
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('model_not_found'));
    expect(groqRequestErrorMessage(new Error('socket hang up'))).toBeUndefined();
  });

  it('completes generate and stream calls when the model is missing', async () => {
    const middleware = createGroqUnavailableMiddleware('openai/gpt-oss-120b');
    const generated = await middleware.wrapGenerate({
      doGenerate: async () => {
        throw providerError;
      },
    });
    expect(generated.finishReason).toBe('stop');
    expect(generated.text).toBe('');

    const streamed = await middleware.wrapStream({
      doStream: async () => {
        throw providerError;
      },
    });
    const reader = streamed.stream.getReader();
    const parts = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      parts.push(value);
    }
    expect(parts).toEqual([
      { type: 'text-delta', textDelta: GROQ_MODEL_UNAVAILABLE_TEXT },
      {
        type: 'finish',
        finishReason: 'stop',
        usage: { promptTokens: 0, completionTokens: 0 },
      },
    ]);
    expect(console.error).toHaveBeenCalled();
  });

  it('still throws unrelated provider errors', async () => {
    const middleware = createGroqUnavailableMiddleware('openai/gpt-oss-120b');
    await expect(
      middleware.wrapGenerate({
        doGenerate: async () => {
          throw new Error('socket hang up');
        },
      }),
    ).rejects.toThrow('socket hang up');
  });
});
