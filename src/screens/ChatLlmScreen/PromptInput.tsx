import React from 'react';
import type { TextAreaProps } from '@nextui-org/react';
import { Textarea } from '@nextui-org/react';
import { cn } from 'styles/utils/cn';

const PromptInput = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ classNames = {}, ...props }, ref) => {
    return (
      <Textarea
        aria-label="Prompt"
        className="min-h-[32px]"
        classNames={{
          ...classNames,
          label: cn('hidden', classNames?.label),
          input: cn('py-0 h-[32px]', classNames?.input),
        }}
        minRows={1}
        disableAnimation
        placeholder="Chat with Onix to solve any problem..."
        radius="lg"
        variant="bordered"
        {...props}
      />
    );
  },
);

export default PromptInput;

PromptInput.displayName = 'PromptInput';
