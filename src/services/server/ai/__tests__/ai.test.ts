jest.mock('@ai-sdk/openai', () => ({
  createOpenAI: jest.fn(() => (modelId: string) => ({ modelId, type: 'mock-model' })),
}));

import { isModelNotFoundError, getModel, getFallbackModel } from '../index';

describe('AI service', () => {
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

  describe('getModel', () => {
    it('should return a model object', () => {
      const model = getModel();
      expect(model).toBeDefined();
      expect(typeof model).toBe('object');
      expect(model.modelId).toBe('openai/gpt-oss-120b');
    });
  });

  describe('getFallbackModel', () => {
    it('should return a model object', () => {
      const model = getFallbackModel();
      expect(model).toBeDefined();
      expect(typeof model).toBe('object');
      expect(model.modelId).toBe('openai/gpt-oss-20b');
    });

    it('should return a different model than getModel', () => {
      const primaryModel = getModel();
      const fallbackModel = getFallbackModel();
      expect(primaryModel.modelId).not.toEqual(fallbackModel.modelId);
    });
  });
});
