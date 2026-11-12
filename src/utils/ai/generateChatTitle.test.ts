import { Message } from '@ai-sdk/react';
import { generateFallbackTitle, sanitizeGeneratedTitle } from './generateChatTitle';

describe('generateFallbackTitle', () => {
  it('returns default title for empty messages array', () => {
    expect(generateFallbackTitle([])).toBe('New Conversation');
  });

  it('returns default title for undefined messages', () => {
    expect(generateFallbackTitle(undefined as unknown as Message[])).toBe('New Conversation');
  });

  it('returns default title for null messages', () => {
    expect(generateFallbackTitle(null as unknown as Message[])).toBe('New Conversation');
  });

  it('returns default title when no user messages exist', () => {
    const messages: Message[] = [
      { id: '1', role: 'assistant', content: 'Hello!' },
    ];
    expect(generateFallbackTitle(messages)).toBe('New Conversation');
  });

  it('returns user message content as title when short enough', () => {
    const messages: Message[] = [
      { id: '1', role: 'user', content: 'What is the weather?' },
    ];
    expect(generateFallbackTitle(messages)).toBe('What is the weather?');
  });

  it('truncates long messages with ellipsis', () => {
    const longContent =
      'This is a very long message that should be truncated because it exceeds the maximum length allowed for a title';
    const messages: Message[] = [{ id: '1', role: 'user', content: longContent }];
    const result = generateFallbackTitle(messages);
    expect(result.length).toBeLessThanOrEqual(53);
    expect(result.endsWith('...')).toBe(true);
  });

  it('returns default title for empty string content', () => {
    const messages: Message[] = [{ id: '1', role: 'user', content: '' }];
    expect(generateFallbackTitle(messages)).toBe('New Conversation');
  });

  it('returns default title for whitespace-only content', () => {
    const messages: Message[] = [{ id: '1', role: 'user', content: '   \n\t  ' }];
    expect(generateFallbackTitle(messages)).toBe('New Conversation');
  });

  it('handles array content with text parts', () => {
    const messages: Message[] = [
      {
        id: '1',
        role: 'user',
        content: [
          { type: 'text', text: 'Hello' },
          { type: 'text', text: 'world' },
        ] as unknown as string,
      },
    ];
    expect(generateFallbackTitle(messages)).toBe('Hello world');
  });

  it('skips first assistant message and uses first user message', () => {
    const messages: Message[] = [
      { id: '1', role: 'assistant', content: 'Welcome!' },
      { id: '2', role: 'user', content: 'Help me code' },
    ];
    expect(generateFallbackTitle(messages)).toBe('Help me code');
  });
});

describe('sanitizeGeneratedTitle', () => {
  const messages: Message[] = [{ id: '1', role: 'user', content: 'Test message' }];

  it('returns trimmed generated title when valid', () => {
    expect(sanitizeGeneratedTitle('  Generated Title  ', messages)).toBe('Generated Title');
  });

  it('returns fallback when generated title is undefined', () => {
    expect(sanitizeGeneratedTitle(undefined, messages)).toBe('Test message');
  });

  it('returns fallback when generated title is null', () => {
    expect(sanitizeGeneratedTitle(null, messages)).toBe('Test message');
  });

  it('returns fallback when generated title is empty string', () => {
    expect(sanitizeGeneratedTitle('', messages)).toBe('Test message');
  });

  it('returns fallback when generated title is whitespace only', () => {
    expect(sanitizeGeneratedTitle('   ', messages)).toBe('Test message');
  });

  it('uses default fallback when messages are empty and title is invalid', () => {
    expect(sanitizeGeneratedTitle(undefined, [])).toBe('New Conversation');
  });
});
