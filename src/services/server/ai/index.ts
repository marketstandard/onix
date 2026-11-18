import { createOpenAI } from '@ai-sdk/openai';

const GROQ_PRIMARY_MODEL = 'openai/gpt-oss-120b';
const GROQ_FALLBACK_MODEL = 'openai/gpt-oss-20b';

function createGroqClient() {
  return createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: process.env.GROQ_API_KEY,
  });
}

export const getServerModel = ({ model }: { model?: string }) => {
  const groq = createGroqClient();
  return groq(GROQ_PRIMARY_MODEL);
};

export const getFallbackModel = () => {
  const groq = createGroqClient();
  return groq(GROQ_FALLBACK_MODEL);
};

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
