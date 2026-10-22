// import { createMistral } from '@ai-sdk/mistral';
import { createOpenAI } from '@ai-sdk/openai';
import { extractReasoningMiddleware, wrapLanguageModel } from 'ai';
import {
  createGroqFetch,
  createGroqUnavailableMiddleware,
  resolveGroqModelId,
} from 'services/server/ai/groq';

// import { ChatOllama } from '@langchain/community/chat_models/ollama';
// import { OllamaFunctions } from '@langchain/community/experimental/chat_models/ollama_functions';
// import { Ollama } from '@langchain/community/llms/ollama';
// import { BaseMessage, HumanMessage, MessageType, SystemMessage } from '@langchain/core/messages';
// import { ChatPromptTemplate } from '@langchain/core/prompts';
// import { ChatOpenAI } from '@langchain/openai';
// import { LangChainAdapter } from 'ai';
// import { createOllama } from 'ollama-ai-provider';

/**
 * @todo checks for environment, may do different between local and server
 */

// const getOllamaModal = (model?: string) => {
//   const OLLAMA_MODEL = 'llama3.1';
//   // VERCEL BINDINGS
//   const ollama = createOllama({
//     // custom settings
//   });
//   return ollama(OLLAMA_MODEL);
// };

// export const langchainModel = ollama('langchain');

// export const getLocalModel = (model?: string) => {
//   if (model === 'ollama') {
//     return getOllamaModal();
//   } else if (model === 'mistral') {
//     const ollama = createOllama({
//       // custom settings
//     });
//     const mistalModel = ollama('mistral');
//     // const mistral = createMistral({
//     //   // custom settings
//     //   baseURL: 'http://localhost:11434/api',
//     //   apiKey: 'local',
//     // });
//     // const model = mistral('mistral-large-latest');

//     return mistalModel;
//   } else {
//     return getOllamaModal();
//   }
// };

export const getServerModel = ({ model }: { model?: string } = {}) => {
  const modelId = resolveGroqModelId(model);
  const groq = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: process.env.GROQ_API_KEY,
    fetch: createGroqFetch(),
  });
  // gpt-oss keeps the answer in `content` when include_reasoning is false.
  // Models that still emit <think> tags are stripped before the chat UI sees them.
  const languageModel = wrapLanguageModel({
    model: groq(modelId),
    middleware: extractReasoningMiddleware({ tagName: 'think' }),
  });
  return wrapLanguageModel({
    model: languageModel,
    middleware: createGroqUnavailableMiddleware(modelId),
  });
};

export const getModel = ({ model }: { model?: string } = {}) => {
  if (process.env.NODE_ENV === 'production') {
    return getServerModel({ model });
  } else {
    return getServerModel({ model });
    // return getLocalModel(model);
  }
};
