const mockStreamText = jest.fn();

jest.mock('ai', () => ({
  streamText: (options: any) => mockStreamText(options),
}));

jest.mock('@ai-sdk/openai', () => ({
  createOpenAI: jest.fn(() => (modelId: string) => ({ modelId, type: 'mock-model' })),
}));

import {
  isModelNotFoundError,
  getModel,
  getFallbackModel,
  getServerModel,
  streamTextWithModelFallback,
  GROQ_PRIMARY_MODEL,
  GROQ_FALLBACK_MODEL,
} from '../index';

function createMockAsyncIterator<T>(items: T[], errorOnFirst = false, error?: Error) {
  let index = 0;
  return {
    async next() {
      if (errorOnFirst && index === 0) {
        throw error;
      }
      if (index < items.length) {
        return { value: items[index++], done: false };
      }
      return { value: undefined, done: true };
    },
  };
}

function createMockFullStream<T>(items: T[], errorOnFirst = false, error?: Error) {
  return {
    [Symbol.asyncIterator]: () => createMockAsyncIterator(items, errorOnFirst, error),
  };
}

describe('AI service', () => {
  describe('model constants', () => {
    it('should export GROQ_PRIMARY_MODEL', () => {
      expect(GROQ_PRIMARY_MODEL).toBe('openai/gpt-oss-120b');
    });

    it('should export GROQ_FALLBACK_MODEL', () => {
      expect(GROQ_FALLBACK_MODEL).toBe('openai/gpt-oss-20b');
    });
  });

  describe('isModelNotFoundError', () => {
    it('should return true for AI_APICallError with "does not exist" message', () => {
      const error = {
        name: 'AI_APICallError',
        message: 'The model `llama-3.3-70b-versatile` does not exist or you do not have access to it.',
      };
      expect(isModelNotFoundError(error)).toBe(true);
    });

    it('should return true for AI_APICallError with "do not have access" message', () => {
      const error = {
        name: 'AI_APICallError',
        message: 'You do not have access to this model.',
      };
      expect(isModelNotFoundError(error)).toBe(true);
    });

    it('should return true for AI_APICallError with "model_not_found" message', () => {
      const error = {
        name: 'AI_APICallError',
        message: 'Error: model_not_found - The requested model is unavailable.',
      };
      expect(isModelNotFoundError(error)).toBe(true);
    });

    it('should return true for AI_APICallError with "invalid_model" message', () => {
      const error = {
        name: 'AI_APICallError',
        message: 'invalid_model: The model specified is not valid.',
      };
      expect(isModelNotFoundError(error)).toBe(true);
    });

    it('should return false for non-AI_APICallError', () => {
      const error = {
        name: 'Error',
        message: 'The model does not exist.',
      };
      expect(isModelNotFoundError(error)).toBe(false);
    });

    it('should return false for AI_APICallError with unrelated message', () => {
      const error = {
        name: 'AI_APICallError',
        message: 'Rate limit exceeded.',
      };
      expect(isModelNotFoundError(error)).toBe(false);
    });

    it('should return false for null', () => {
      expect(isModelNotFoundError(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isModelNotFoundError(undefined)).toBe(false);
    });

    it('should return false for non-object', () => {
      expect(isModelNotFoundError('error string')).toBe(false);
    });

    it('should check nested cause for model errors', () => {
      const error = {
        name: 'SomeWrapper',
        message: 'Wrapped error',
        cause: {
          name: 'AI_APICallError',
          message: 'The model does not exist.',
        },
      };
      expect(isModelNotFoundError(error)).toBe(true);
    });
  });

  describe('getServerModel', () => {
    it('should return the primary model when no custom model is provided', () => {
      const model = getServerModel();
      expect(model.modelId).toBe(GROQ_PRIMARY_MODEL);
    });

    it('should return the primary model when model arg is undefined', () => {
      const model = getServerModel({ model: undefined });
      expect(model.modelId).toBe(GROQ_PRIMARY_MODEL);
    });

    it('should return a custom model when provided', () => {
      const customModelId = 'custom/my-model-123';
      const model = getServerModel({ model: customModelId });
      expect(model.modelId).toBe(customModelId);
    });
  });

  describe('getModel', () => {
    it('should return the primary model by default', () => {
      const model = getModel();
      expect(model).toBeDefined();
      expect(typeof model).toBe('object');
      expect(model.modelId).toBe(GROQ_PRIMARY_MODEL);
    });

    it('should use custom model when provided', () => {
      const customModelId = 'custom/special-model';
      const model = getModel({ model: customModelId });
      expect(model.modelId).toBe(customModelId);
    });
  });

  describe('getFallbackModel', () => {
    it('should return the fallback model', () => {
      const model = getFallbackModel();
      expect(model).toBeDefined();
      expect(typeof model).toBe('object');
      expect(model.modelId).toBe(GROQ_FALLBACK_MODEL);
    });

    it('should return a different model than getModel default', () => {
      const primaryModel = getModel();
      const fallbackModel = getFallbackModel();
      expect(primaryModel.modelId).not.toEqual(fallbackModel.modelId);
    });
  });

  describe('streamTextWithModelFallback', () => {
    beforeEach(() => {
      mockStreamText.mockReset();
    });

    it('should return stream with first chunk when model is available', async () => {
      const streamParts = [
        { type: 'text-delta', textDelta: 'Hello' },
        { type: 'text-delta', textDelta: ' World' },
      ];
      const successResult = {
        fullStream: createMockFullStream(streamParts),
        textStream: 'mock-text-stream',
        response: Promise.resolve({ headers: {} }),
      };
      mockStreamText.mockReturnValue(successResult);

      const options = { model: getModel(), messages: [] };
      const fallbackModel = getFallbackModel();

      const result = await streamTextWithModelFallback(options as any, fallbackModel as any);

      expect(mockStreamText).toHaveBeenCalledTimes(1);
      expect(result).toBeDefined();
    });

    it('should forward first chunk before stream completes (real streaming)', async () => {
      const streamParts = [
        { type: 'text-delta', textDelta: 'First' },
        { type: 'text-delta', textDelta: 'Second' },
        { type: 'text-delta', textDelta: 'Third' },
      ];
      const successResult = {
        fullStream: createMockFullStream(streamParts),
        textStream: 'mock-text-stream',
        response: Promise.resolve({ headers: {} }),
      };
      mockStreamText.mockReturnValue(successResult);

      const options = { model: getModel(), messages: [] };
      const fallbackModel = getFallbackModel();

      const result = await streamTextWithModelFallback(options as any, fallbackModel as any);

      const receivedParts: any[] = [];
      for await (const part of result.fullStream) {
        receivedParts.push(part);
        if (receivedParts.length === 1) {
          expect(part).toEqual({ type: 'text-delta', textDelta: 'First' });
        }
      }

      expect(receivedParts).toHaveLength(3);
      expect(receivedParts[0]).toEqual({ type: 'text-delta', textDelta: 'First' });
      expect(receivedParts[1]).toEqual({ type: 'text-delta', textDelta: 'Second' });
      expect(receivedParts[2]).toEqual({ type: 'text-delta', textDelta: 'Third' });
    });

    it('should retry with fallback model on model-not-found error before any chunks', async () => {
      const modelNotFoundError = {
        name: 'AI_APICallError',
        message: 'The model does not exist or you do not have access to it.',
      };
      const failedResult = {
        fullStream: createMockFullStream([], true, modelNotFoundError),
      };
      const fallbackParts = [{ type: 'text-delta', textDelta: 'Fallback response' }];
      const successResult = {
        fullStream: createMockFullStream(fallbackParts),
        textStream: 'mock-fallback-stream',
        response: Promise.resolve({ headers: {} }),
      };

      mockStreamText
        .mockReturnValueOnce(failedResult)
        .mockReturnValueOnce(successResult);

      const primaryModel = getModel();
      const fallbackModel = getFallbackModel();
      const options = { model: primaryModel, messages: [] };

      const result = await streamTextWithModelFallback(options as any, fallbackModel as any);

      expect(mockStreamText).toHaveBeenCalledTimes(2);
      expect(mockStreamText).toHaveBeenNthCalledWith(2, expect.objectContaining({
        model: fallbackModel,
      }));
      expect(result).toBe(successResult);
    });

    it('should throw non-model-not-found errors without retry', async () => {
      const networkError = new Error('Network error');
      const failedResult = {
        fullStream: createMockFullStream([], true, networkError),
      };
      mockStreamText.mockReturnValue(failedResult);

      const options = { model: getModel(), messages: [] };
      const fallbackModel = getFallbackModel();

      await expect(
        streamTextWithModelFallback(options as any, fallbackModel as any)
      ).rejects.toThrow('Network error');

      expect(mockStreamText).toHaveBeenCalledTimes(1);
    });

    it('should handle empty streams gracefully', async () => {
      const successResult = {
        fullStream: createMockFullStream([]),
        textStream: 'mock-text-stream',
        response: Promise.resolve({ headers: {} }),
      };
      mockStreamText.mockReturnValue(successResult);

      const options = { model: getModel(), messages: [] };
      const fallbackModel = getFallbackModel();

      const result = await streamTextWithModelFallback(options as any, fallbackModel as any);

      expect(result).toBe(successResult);
      expect(mockStreamText).toHaveBeenCalledTimes(1);
    });
  });
});
