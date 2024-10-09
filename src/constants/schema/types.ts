import { Message } from '@ai-sdk/react';
import { HistoryMode } from 'constants/chat';

export type ChatParams = {
  temperature: number | null;
  presencePenalty: number | null;
  frequencyPenalty: number | null;
  topP: number | null;
  topK: number | null;
  maxTokens: number | null;
  safetySettings: any | null;
  contextLimit: number;
  streaming: boolean;
  outputTone: string;
  outputLanguage: string;
  outputStyle: string;
  outputFormat: string;
  isShowOutputSettings: boolean;
  systemMessage: string;
};

export type LinkedPlugin = {
  id: string;
  title: string;
  emoji: string;
  iconUrl?: string;
};

export type GenerativeUiComponent = {
  component: string;
  props: Record<string, unknown>;
};

// export type Message = {
//   id: string;
//   role: 'system' | 'user' | 'assistant' | 'plugin';
//   type?: string;
//   content: string | null;
//   model: string;
//   createdAt: string;
//   functionCall?: {
//     name: string;
//     arguments: string;
//   };
//   usage?: {
//     promptTokens: number;
//     completionTokens: number;
//     totalTokens: number;
//   };
//   titleUsage?: {
//     promptTokens: number;
//     completionTokens: number;
//     totalTokens: number;
//   };
//   keywords?: string[];
//   finish?: string;
//   ui?: GenerativeUiComponent[] | null;
// };

export type TokenUsage = {
  totalCostUsd: number;
  totalTokens: number;
  enhancedTokens: number;
  enhancedCostUsd: number;
  messageTokens: number;
  messageCostUsd: number;
  recordedAt: string;
};

export type ModelInfo = {
  title: string;
  id: string;
};

export type Character = {
  title: string;
  isPremium: boolean;
  imageUrl: string;
  description: string;
  instruction: string;
  invoice: string;
  trainingExamples: any[];
  conversationStarters: { id: string; text: string }[];
  welcomeMessage: string;
  assignedPlugins: Record<string, unknown>;
  id: string;
  color: string;
  createdAt: string;
  lastUsedAt: string;
  syncedAt: string | null;
  categories: string[];
  type: string;
  isPinned: boolean;
};

export type Tag = { id: string; name: string };

export type Chat = {
  id: string;
  model: string;
  title: string;
  modelInfo: ModelInfo;
  character: Character;
  preview: string;
  linkedPlugins: LinkedPlugin[];
  chatParams: ChatParams;
  createdAt: string;
  updatedAt: string;
  syncedAt: string | null;
  messages: Message[];
  tokenUsage: TokenUsage;
  pinnedAt?: string;
  tags?: Tag[];
  projectId?: string;
  isSavingChat: boolean;
  data: object;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  notes: string;
  isOpen: boolean;
  createdAt: string;
  updatedAt: string;
  syncedAt: string | null;
  order: number;
};

export type UserCharacter = {
  id: string;
  color: string;
  title: string;
  syncedAt: string | null;
  avatarURL: string;
  createdAt: string;
  deletedAt: string | null;
  description: string;
  instruction: string;
  welcomeMessage: string;
  assignedPlugins: Record<string, unknown>;
  trainingExamples: { id: string; userText: string; assistantText: string }[];
  conversationStarters: { id: string; text: string }[];
  isExcludedForUserTags?: boolean;
  isEnforceAssignedPlugins?: boolean;
  isPinned: boolean;
};

export type InstalledPlugin = {
  uuid: string;
  id: string;
  emoji: string;
  title: string;
  overviewMarkdown: string;
  openaiSpec: {
    name: string;
    description: string;
    parameters: {
      type: string;
      properties: Record<string, { type: string; description: string }>;
      required: string[];
    };
  };
  code: string;
  syncedAt: string | null;
};

export type Profile = {
  id: string;
  name: string;
  information?: string;
  imageUrl?: string;
  customInstruction?: string;
  assignedAPIKey?: Record<string, unknown>;
};

export type CustomModel = {
  title: string;
  description: string;
  iconUrl: string;
  endpoint: string;
  id: string;
  modelId: string;
  apiType: string;
  contextLength: number;
  headerRows: { id: string; key: string; value: string }[];
  bodyRows: any[];
  isSkipApiKey: boolean;
  isPluginSupported: boolean;
  isVisionSupported: boolean;
};

export type UserPrompts = {
  id: string;
  title: string;
  description: string;
  prompt: string;
  tags: Tag[];
  createdAt: string | null;
  lastUsedAt: string | null;
  syncedAt: string | null;
  pinnedAt: string | null;
};

export type User = {
  id: string;
  promptSettings: Record<string, unknown>;
  characterSettings: Record<string, unknown>;
  customSearchEngineID: string;
  customSearchAPIKey: string;
  userPluginSettings: Record<string, unknown>;
  hiddenButtons: any[];
  isActionButtonsLabel: boolean;
  isStreaming: boolean;
  isAutomaticTitle: boolean;
  isSuggestKeywords: boolean;
  searchEngine: string;
  defaultTemperature: number | null;
  defaultPresencePenalty: number | null;
  defaultFrequencyPenalty: number | null;
  defaultTopP: number | null;
  defaultTopK: number | null;
  defaultMaxTokens: number | null;
  defaultSafetySettings: any | null;
  defaultContextLimit: number;
  modelIdOrder: string[];
  hiddenModelIds: string[];
  keyboardShortcuts: Record<string, string>;
  historyMode: HistoryMode;
};

export type Checksum = {
  checksum: string;
};

export type Schema = {
  checksum: Checksum;
  data: {
    user: User;
    chats: Chat[];
    projects: Project[];
    characters: UserCharacter[];
    tags: Tag[];
    prompts: UserPrompts[];
    profiles: Profile[];
    installedPlugins: InstalledPlugin[];
    customModels: CustomModel[];
  };
};
