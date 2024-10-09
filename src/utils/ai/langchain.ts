import { AIChatMessage, HumanChatMessage, SystemChatMessage } from 'langchain/schema';
import { LangchainMessage, LangchainMessageRoles, Message } from 'constants/ai';

export const serializeChatToLangchain = (message: Message) => {
  if (message.role === LangchainMessageRoles.Human) {
    return new HumanChatMessage(message.text);
  }

  if (message.role === LangchainMessageRoles.System) {
    return new SystemChatMessage(message.text);
  }

  return new AIChatMessage(message.text);
};

export const mapChatToLangchain = (chatHistory: Message[] = []) => {
  return chatHistory.map(serializeChatToLangchain);
};

export const deserializeLangchainToChat = (message: LangchainMessage) => {
  if (message._getType() === LangchainMessageRoles.Human) {
    return { text: message.text, role: LangchainMessageRoles.Human };
  }

  if (message._getType() === LangchainMessageRoles.System) {
    return { text: message.text, role: LangchainMessageRoles.System };
  }

  return { text: message.text, role: LangchainMessageRoles.Ai };
};

export const mapLangchainToChat = (
  chatHistory: LangchainMessage[] = [],
  { isKeepSystemMessage }: { isKeepSystemMessage?: boolean } = { isKeepSystemMessage: false },
) => {
  return chatHistory
    .map(deserializeLangchainToChat)
    .filter((message) => isKeepSystemMessage || message.role !== LangchainMessageRoles.System);
};
