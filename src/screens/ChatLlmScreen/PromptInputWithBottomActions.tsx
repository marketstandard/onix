'use client';

import React from 'react';
import { useChat } from '@ai-sdk/react';
import { Icon } from '@iconify/react';
import { Button, ScrollShadow, Textarea, Tooltip } from '@nextui-org/react';
import { KeyCodes } from 'utils/client/dom';
import { cn } from 'styles/utils/cn';
import PromptInput from './PromptInput';
import { SubmitChat } from './types';

interface Props {
  messageText: string;
  setMessageText: ReturnType<typeof useChat>['handleInputChange'];
  submitChat: ReturnType<typeof useChat>['handleSubmit'];
}

export default function Component({ messageText, setMessageText, submitChat }: Props) {
  const ideas = [
    {
      title: 'Solve all my business needs',
      description: 'do things for the business',
    },
    {
      title: 'Use AI to takeover roofing',
      description: 'AI does everything',
    },
    {
      title: 'Give me all the moneys',
      description: 'all the moneys will be yours',
    },
    {
      title: 'Write a text message to my friend',
      description: 'be polite and friendly',
    },
  ];

  return (
    <div className="flex w-full flex-col gap-4">
      {/* <ScrollShadow hideScrollBar className="flex flex-nowrap gap-2" orientation="horizontal">
        <div className="flex gap-2 pr-8">
          {ideas.map(({ title, description }, index) => (
            <Button key={index} className="flex h-14 flex-col items-start gap-0" variant="flat">
              <p>{title}</p>
              <p className="text-default-500">{description}</p>
            </Button>
          ))}
        </div>
      </ScrollShadow> */}
      <form
        onSubmit={submitChat}
        className="flex w-full flex-col items-start rounded-medium bg-default-100 transition-colors hover:bg-default-200/70"
      >
        <Textarea
          aria-label="Prompt"
          className="min-h-[32px]"
          minRows={1}
          disableAnimation
          placeholder="Chat with Onix to solve any problem..."
          radius="lg"
          variant="flat"
          value={messageText}
          onChange={setMessageText}
          onKeyDown={(e) => {
            const { key, shiftKey } = e;

            if (key === KeyCodes.Enter && !shiftKey) {
              // e.preventDefault();
              submitChat(e);
            }
            return () => {};
          }}
          classNames={{
            inputWrapper: '!bg-transparent shadow-none',
            innerWrapper: 'relative',
            input: 'py-1 pl-2 text-medium',
          }}
          endContent={
            <div className="flex items-end gap-2">
              <Tooltip showArrow content="Send message">
                <Button
                  type="submit"
                  isIconOnly
                  color={!messageText ? 'default' : 'primary'}
                  isDisabled={!messageText}
                  radius="lg"
                  size="sm"
                  variant="solid"
                >
                  <Icon
                    className={'text-black [&>path]:stroke-[2px]'}
                    icon="solar:arrow-up-linear"
                    width={20}
                  />
                </Button>
              </Tooltip>
            </div>
          }
        />
        {/* <div className="flex w-full items-center justify-between  gap-2 overflow-scroll px-4 pb-4">
          <div className="flex w-full gap-1 md:gap-3">
            <Button
              size="sm"
              startContent={
                <Icon className="text-default-500" icon="solar:paperclip-linear" width={18} />
              }
              variant="flat"
            >
              Attach
            </Button>
            <Button
              size="sm"
              startContent={
                <Icon className="text-default-500" icon="solar:soundwave-linear" width={18} />
              }
              variant="flat"
            >
              Voice Commands
            </Button>
            <Button
              size="sm"
              startContent={
                <Icon className="text-default-500" icon="solar:notes-linear" width={18} />
              }
              variant="flat"
            >
              Templates
            </Button>
          </div>
        </div> */}
      </form>
    </div>
  );
}
