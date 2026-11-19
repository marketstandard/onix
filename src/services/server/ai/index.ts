import { createOpenAI } from '@ai-sdk/openai';
import { streamText, LanguageModelV1 } from 'ai';

export const GROQ_PRIMARY_MODEL = 'openai/gpt-oss-120b';
export const GROQ_FALLBACK_MODEL = 'openai/gpt-oss-20b';

function createGroqClient() {
  return createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: process.env.GROQ_API_KEY,
  });
}

export const getServerModel = ({ model }: { model?: string } = {}) => {
  const groq = createGroqClient();
  const modelId = model || GROQ_PRIMARY_MODEL;
  return groq(modelId);
};

export const getFallbackModel = () => {
  const groq = createGroqClient();
  return groq(GROQ_FALLBACK_MODEL);
};

type StreamTextOptions = Parameters<typeof streamText>[0];
type StreamTextResult = ReturnType<typeof streamText>;

async function* prependToAsyncIterable<T>(
  firstItems: T[],
  rest: AsyncIterable<T>,
): AsyncIterable<T> {
  for (const item of firstItems) {
    yield item;
  }
  for await (const item of rest) {
    yield item;
  }
}

export async function streamTextWithModelFallback(
  options: StreamTextOptions,
  fallbackModel: LanguageModelV1,
): Promise<StreamTextResult> {
  const primaryResult = streamText(options);
  const fullStreamIterator = primaryResult.fullStream[Symbol.asyncIterator]();

  let firstPart: Awaited<ReturnType<typeof fullStreamIterator.next>>;
  try {
    firstPart = await fullStreamIterator.next();
  } catch (error) {
    if (isModelNotFoundError(error)) {
      return streamText({
        ...options,
        model: fallbackModel,
      });
    }
    throw error;
  }

  if (firstPart.done) {
    return primaryResult;
  }

  const bufferedParts = [firstPart.value];

  const wrappedFullStream = prependToAsyncIterable(bufferedParts, {
    [Symbol.asyncIterator]: () => fullStreamIterator,
  });

  return {
    ...primaryResult,
    fullStream: wrappedFullStream as StreamTextResult['fullStream'],
  };
}

export function isModelNotFoundError(error: unknown): boolean {
  if (!error || typeof error !== 'object') {
    return false;
  }

  const errorObj = error as { message?: string; name?: string; cause?: unknown };

  if (errorObj.name === 'AI_APICallError') {
    const message = errorObj.message ?? '';
    if (
      message.includes('does not exist') ||
      message.includes('do not have access') ||
      message.includes('model_not_found') ||
      message.includes('invalid_model')
    ) {
      return true;
    }
  }

  if (errorObj.cause && typeof errorObj.cause === 'object') {
    return isModelNotFoundError(errorObj.cause);
  }

  return false;
}

export const getModel = ({ model }: { model?: string } = {}) => {
  return getServerModel({ model });
};
