import React from 'react';
import { Message } from '@ai-sdk/react';
import MessageCard from './MessageCard';

interface Props {
  messages: Message[];
}

export default function Component({ messages }: Props) {
  return (
    <div className="flex flex-col gap-4 px-1 pb-16 pt-8">
      {messages.map(({ role, content, toolInvocations }, index) => (
        <MessageCard
          key={index}
          attempts={index === 1 ? 2 : 1}
          avatar={role === 'assistant' ? '/images/ai-avatar.png' : '/images/empty-avatar.png'}
          currentAttempt={index === 1 ? 2 : 1}
          // @ts-ignore result will exist or be empty
          message={content || toolInvocations.map((tool) => tool.result).join('')}
          messageClassName={role === 'user' ? 'bg-content3 text-content3-foreground' : ''}
          showFeedback={role === 'assistant'}
          role={role}
        />
      ))}
    </div>
  );
}
