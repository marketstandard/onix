/**
 * Groq retired llama-3.3-70b-versatile for non-enterprise accounts.
 * openai/gpt-oss-120b is the default replacement and stays OpenAI-chat compatible:
 * assistant text is `message.content`, function calls are `tool_calls` with
 * string `function.arguments`, and JSON mode is a JSON string in `content`.
 * gpt-oss does not support `reasoning_format`. Reasoning is a separate
 * `message.reasoning` field unless `include_reasoning` is false.
 */
export const DEFAULT_GROQ_MODEL = 'openai/gpt-oss-120b';

export const GROQ_MODEL_UNAVAILABLE_TEXT =
  'The AI model is unavailable right now. Please try again later.';

const MODEL_NOT_FOUND =
  /does not exist or you do not have access|model_not_found|no longer available/i;

export function resolveGroqModelId(model?: string): string {
  const explicit = model?.trim();
  if (explicit) return explicit;
  const fromEnv = process.env.GROQ_MODEL?.trim();
  if (fromEnv) return fromEnv;
  return DEFAULT_GROQ_MODEL;
}

type GroqErrorRecord = {
  message?: unknown;
  responseBody?: unknown;
  statusCode?: unknown;
  name?: unknown;
  data?: { error?: { code?: unknown; message?: unknown } };
  cause?: unknown;
};

function errorText(error: unknown): string {
  if (typeof error === 'string') return error;
  if (!error || typeof error !== 'object') return '';
  const record = error as GroqErrorRecord;
  return [
    record.message,
    record.responseBody,
    record.data?.error?.message,
    record.data?.error?.code,
    record.name,
  ]
    .filter((part): part is string => typeof part === 'string')
    .join('\n');
}

export function isGroqModelNotFoundError(error: unknown): boolean {
  if (!error) return false;
  if (typeof error === 'string') return MODEL_NOT_FOUND.test(error);
  if (typeof error !== 'object') return false;

  const record = error as GroqErrorRecord;
  if (record.data?.error?.code === 'model_not_found') return true;

  const text = errorText(error);
  if (MODEL_NOT_FOUND.test(text)) return true;
  if (record.statusCode === 404 && /model/i.test(text)) return true;
  if (record.cause) return isGroqModelNotFoundError(record.cause);
  return false;
}

export function logGroqModelNotFound(error: unknown, modelId = resolveGroqModelId()): void {
  const detail = errorText(error) || 'The provider rejected the model id.';
  console.error(
    `[groq] Model "${modelId}" is not available (model_not_found). ` +
      'Set GROQ_MODEL to a model this API key can call. ' +
      'The chat request was handled without crashing. ' +
      `Provider message: ${detail}`,
  );
}

/**
 * User-facing stream error text when Groq rejects the configured model.
 * Returns undefined for every other failure so callers can keep their default.
 */
export function groqRequestErrorMessage(error: unknown): string | undefined {
  if (!isGroqModelNotFoundError(error)) return undefined;
  logGroqModelNotFound(error);
  return GROQ_MODEL_UNAVAILABLE_TEXT;
}

export function stringifyToolArguments(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value == null) return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

/**
 * Drop a complete `<think>...</think>` block. Partial tags (split across
 * stream deltas) are left intact so the next chunk can still match.
 */
export function stripThinkTags(content: string): string {
  if (!/<think[\s>]/i.test(content) || !/<\/think>/i.test(content)) return content;
  const stripped = content.replace(/<think>[\s\S]*?<\/think>/gi, '');
  return stripped === content ? content : stripped.replace(/^\s+|\s+$/g, '');
}

function contentToString(content: unknown): string | undefined {
  if (typeof content === 'string') return stripThinkTags(content);
  if (!Array.isArray(content)) return undefined;
  const text = content
    .map((part) => {
      if (typeof part === 'string') return part;
      if (part && typeof part === 'object' && 'text' in part && typeof part.text === 'string') {
        return part.text;
      }
      return '';
    })
    .join('');
  return stripThinkTags(text);
}

function normalizeToolCall(toolCall: unknown): unknown {
  if (!toolCall || typeof toolCall !== 'object') return toolCall;
  const call = toolCall as {
    function?: { name?: unknown; arguments?: unknown };
  };
  if (!call.function || typeof call.function !== 'object') return toolCall;
  return {
    ...call,
    function: {
      ...call.function,
      arguments: stringifyToolArguments(call.function.arguments),
    },
  };
}

/**
 * Shape a Groq chat completion (or one SSE chunk) so the OpenAI-compatible
 * SDK schema accepts it. `reasoning` is not the answer and is omitted.
 * Tool-call arguments are always a JSON string. JSON-mode bodies stay a
 * string in `content` for the caller to parse.
 */
export function normalizeGroqChatCompletion<T>(payload: T): T {
  if (!payload || typeof payload !== 'object') return payload;
  const data = payload as { choices?: unknown };
  if (!Array.isArray(data.choices)) return payload;

  data.choices.forEach((choice) => {
    if (!choice || typeof choice !== 'object') return;
    const record = choice as { message?: unknown; delta?: unknown };
    if (record.message && typeof record.message === 'object') {
      record.message = normalizeGroqMessage(record.message);
    }
    if (record.delta && typeof record.delta === 'object') {
      record.delta = normalizeGroqMessage(record.delta);
    }
  });
  return payload;
}

function normalizeGroqMessage(message: object): object {
  const next = { ...(message as Record<string, unknown>) };
  delete next.reasoning;

  if ('content' in next) {
    const content = contentToString(next.content);
    if (content !== undefined) next.content = content;
  }

  if (Array.isArray(next.tool_calls)) {
    next.tool_calls = next.tool_calls.map(normalizeToolCall);
  }

  if (next.function_call && typeof next.function_call === 'object') {
    const functionCall = next.function_call as { arguments?: unknown };
    next.function_call = {
      ...functionCall,
      arguments: stringifyToolArguments(functionCall.arguments),
    };
  }

  return next;
}

export function readGroqJsonContent(content: string): unknown {
  return JSON.parse(content);
}

export function withGroqReasoningDisabled(body: string | undefined): string | undefined {
  if (!body) return body;
  let parsed: unknown;
  try {
    parsed = JSON.parse(body);
  } catch {
    return body;
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return body;
  const record = parsed as Record<string, unknown>;
  if (!('model' in record) || !('messages' in record)) return body;
  if (record.include_reasoning === undefined && record.reasoning_format === undefined) {
    record.include_reasoning = false;
  }
  // Groq deprecates max_tokens in favor of max_completion_tokens. The AI SDK
  // still sends max_tokens; gpt-oss accepts the newer field.
  if (record.max_completion_tokens == null && typeof record.max_tokens === 'number') {
    record.max_completion_tokens = record.max_tokens;
  }
  if ('max_tokens' in record) delete record.max_tokens;
  return JSON.stringify(record);
}

export function normalizeGroqSseChunk(chunk: string): string {
  return chunk
    .split('\n')
    .map((line) => {
      const match = line.match(/^data:\s?(.*)$/);
      if (!match) return line;
      const data = match[1].trim();
      if (!data || data === '[DONE]') return line;
      try {
        return `data: ${JSON.stringify(normalizeGroqChatCompletion(JSON.parse(data)))}`;
      } catch {
        return line;
      }
    })
    .join('\n');
}

function responseWithBody(original: Response, body: BodyInit): Response {
  const headers = new Headers(original.headers);
  headers.delete('content-length');
  return new Response(body, {
    status: original.status,
    statusText: original.statusText,
    headers,
  });
}

export function createGroqFetch(baseFetch: typeof fetch = fetch): typeof fetch {
  return async (input, init) => {
    const nextInit = init
      ? {
          ...init,
          body: typeof init.body === 'string' ? withGroqReasoningDisabled(init.body) : init.body,
        }
      : init;
    const response = await baseFetch(input, nextInit);
    if (!response.ok) return response;

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('text/event-stream') && response.body) {
      let pending = '';
      const stream = response.body.pipeThrough(new TextDecoderStream()).pipeThrough(
        new TransformStream<string, string>({
          transform(chunk, controller) {
            pending += chunk;
            const lines = pending.split('\n');
            pending = lines.pop() ?? '';
            if (lines.length === 0) return;
            controller.enqueue(`${normalizeGroqSseChunk(lines.join('\n'))}\n`);
          },
          flush(controller) {
            if (!pending) return;
            controller.enqueue(normalizeGroqSseChunk(pending));
          },
        }),
      );
      return responseWithBody(response, stream.pipeThrough(new TextEncoderStream()));
    }

    if (contentType.includes('application/json')) {
      const json = await response.json();
      return responseWithBody(response, JSON.stringify(normalizeGroqChatCompletion(json)));
    }

    return response;
  };
}

const unavailableGenerateResult = {
  text: '',
  finishReason: 'stop' as const,
  usage: { promptTokens: 0, completionTokens: 0 },
  rawCall: { rawPrompt: null, rawSettings: {} },
};

function unavailableStreamResult() {
  return {
    stream: new ReadableStream({
      start(controller) {
        controller.enqueue({
          type: 'text-delta',
          textDelta: GROQ_MODEL_UNAVAILABLE_TEXT,
        });
        controller.enqueue({
          type: 'finish',
          finishReason: 'stop',
          usage: { promptTokens: 0, completionTokens: 0 },
        });
        controller.close();
      },
    }),
    rawCall: { rawPrompt: null, rawSettings: {} },
  };
}

export function createGroqUnavailableMiddleware(modelId: string) {
  return {
    wrapGenerate: async ({ doGenerate }: { doGenerate: () => PromiseLike<any> }) => {
      try {
        return await doGenerate();
      } catch (error) {
        if (!isGroqModelNotFoundError(error)) throw error;
        logGroqModelNotFound(error, modelId);
        return unavailableGenerateResult;
      }
    },
    wrapStream: async ({ doStream }: { doStream: () => PromiseLike<any> }) => {
      try {
        return await doStream();
      } catch (error) {
        if (!isGroqModelNotFoundError(error)) throw error;
        logGroqModelNotFound(error, modelId);
        return unavailableStreamResult();
      }
    },
  };
}
