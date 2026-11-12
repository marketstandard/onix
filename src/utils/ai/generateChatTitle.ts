import { Message } from '@ai-sdk/react';

const DEFAULT_TITLE = 'New Conversation';
const MAX_FALLBACK_TITLE_LENGTH = 50;

type TextPart = { type: 'text'; text: string };

function extractTextFromContent(content: unknown): string {
  if (typeof content === 'string') {
    return content;
  }
  if (Array.isArray(content)) {
    return (content as unknown[])
      .filter((part): part is TextPart => {
        return (
          typeof part === 'object' &&
          part !== null &&
          'type' in part &&
          part.type === 'text' &&
          'text' in part
        );
      })
      .map((part) => part.text)
      .join(' ');
  }
  return '';
}

export function generateFallbackTitle(messages: Message[]): string {
  if (!messages || messages.length === 0) {
    return DEFAULT_TITLE;
  }

  const firstUserMessage = messages.find((m) => m.role === 'user');
  if (!firstUserMessage) {
    return DEFAULT_TITLE;
  }

  const content = extractTextFromContent(firstUserMessage.content);

  const trimmedContent = content.trim();
  if (!trimmedContent) {
    return DEFAULT_TITLE;
  }

  if (trimmedContent.length <= MAX_FALLBACK_TITLE_LENGTH) {
    return trimmedContent;
  }

  const truncated = trimmedContent.slice(0, MAX_FALLBACK_TITLE_LENGTH);
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > MAX_FALLBACK_TITLE_LENGTH * 0.6) {
    return truncated.slice(0, lastSpace) + '...';
  }

  return truncated + '...';
}

export function sanitizeGeneratedTitle(
  generatedTitle: string | undefined | null,
  messages: Message[],
): string {
  const trimmed = generatedTitle?.trim();
  if (trimmed && trimmed.length > 0) {
    return trimmed;
  }
  return generateFallbackTitle(messages);
}
