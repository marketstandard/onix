import { AIMessage, HumanMessage, MessageType, SystemMessage } from 'langchain/schema';

export interface MSChatMessage {
  role: 'user' | 'system' | 'assistant';
  content: string;
}

export type LangchainMessage = HumanMessage | AIMessage | SystemMessage;
export interface Message {
  text: string;
  role: MessageType;
}

export const LangchainMessageRoles = {
  Human: 'human' as MessageType,
  Ai: 'ai' as MessageType,
  Generic: 'generic' as MessageType,
  System: 'system' as MessageType,
};

export interface BaseRequestPayload {
  input: string;
  messages: Message[];
  isStreaming?: boolean;
  temperature?: number;
  systemMessage?: string;
  model?: string;
  aiClient?: string;
}

export interface BaseResponsePayload {
  messages: Message[];
  answer: Message;
  input: string;
  systemMessage?: string;
  model?: string;
}

export enum Augment {
  Roofing = 'roofing',
}
