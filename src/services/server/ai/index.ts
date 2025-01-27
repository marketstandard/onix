// import { createMistral } from '@ai-sdk/mistral';
import { createOpenAI } from '@ai-sdk/openai';

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

const LLAMA_SMART = 'llama-3.1-405b-reasoning';
const LLAMA_VERSATILE = 'llama-3.3-70b-versatile';
const LLAMA_INSTANT = 'llama-3.1-8b-instant';

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

export const getServerModel = ({ model }: { model?: string }) => {
  const groq = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: process.env.GROQ_API_KEY,
  });
  /**
   * @todo Drive this model selection (and overall in case we migrate from groq) using the env
   */
  return groq(LLAMA_VERSATILE);
};

/**
 * @todo Drive through .env?
 */
export const getModel = ({ model }: { model?: string } = {}) => {
  if (process.env.NODE_ENV === 'production') {
    return getServerModel({ model });
  } else {
    return getServerModel({ model });
    // return getLocalModel(model);
  }
};
