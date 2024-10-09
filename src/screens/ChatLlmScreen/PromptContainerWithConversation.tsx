'use client';

import React, { useEffect, useState } from 'react';
import { Message, useChat } from '@ai-sdk/react';
import { ScrollShadow, Tab, Tabs } from '@nextui-org/react';
import { debounce } from 'lodash';
import { MSChatMessage } from 'constants/ai';
import Loader from 'svg/Loader';
import LoaderWithText from 'components/LoaderWithText';
import { cn } from 'styles/utils/cn';
import Conversation from './Conversation';
import PromptInputWithBottomActions from './PromptInputWithBottomActions';
import { SubmitChat } from './types';

const SCROLL_THRESHOLD = 96;

interface Props {
  className?: string;
  scrollShadowClassname?: string;
  stream?: string;
  displayInfo?: string;
  messages: Message[];
  messageText: string;
  setMessageText: ReturnType<typeof useChat>['handleInputChange'];
  submitChat: ReturnType<typeof useChat>['handleSubmit'];
  isLoading?: boolean;
}

export default function Component({
  className,
  scrollShadowClassname,
  stream,
  messages,
  messageText,
  setMessageText,
  submitChat,
  isLoading,
  displayInfo,
}: Props) {
  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollIfNearBottom = () => {
    const scrollContainer = chatContainerRef.current;
    if (scrollContainer) {
      const { scrollHeight, scrollTop, clientHeight } = scrollContainer;
      const bottomPosition = scrollHeight - scrollTop - clientHeight;

      if (bottomPosition < SCROLL_THRESHOLD) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight + SCROLL_THRESHOLD * 2;
      }
    }
  };

  useEffect(() => {
    if (messages) {
      scrollIfNearBottom();
    }
  }, [messages]);

  return (
    <>
      {/* <div className="flex w-full flex-wrap items-center justify-center gap-2 border-b-small border-divider pb-2 sm:justify-between">
        <p className="text-base font-medium">Creative Uses for Kids&apos; Art</p>
        <Tabs className="justify-center">
          <Tab key="creative" title="Creative" />
          <Tab key="technical" title="Technical" />
          <Tab key="precise" title="Precise" />
        </Tabs>
      </div> */}
      {messages.length > 0 ? (
        <div
          ref={chatContainerRef}
          className={cn('flex h-full flex-col overflow-y-auto', scrollShadowClassname)}
        >
          <div className="mx-auto w-full max-w-3xl">
            <Conversation messages={messages} />
          </div>
          {/* <div>
            {isLoading && (
              <>
                <LoaderWithText />
                {!!displayInfo && (
                  <div className="mx-auto max-w-xl text-center">
                    <div className="mt-4 text-sm font-medium">AI Actions</div>
                    <div className="mt-1 text-xs text-text-secondary-darkmode">{displayInfo}</div>
                  </div>
                )}
              </>
            )}
          </div> */}
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center">
          <div>
            <img src="/images/ai-avatar.png" className="w-12 rounded-full grayscale" />
            {/* <img src="/logo.png" className="w-12 grayscale" /> */}
          </div>
          <div className="mt-2 text-lg font-semibold text-text-secondary-darkmode">
            Ask me anything
          </div>
        </div>
      )}
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-2 pb-4">
        <PromptInputWithBottomActions
          submitChat={(e) => {
            submitChat(e);
            const scrollContainer = chatContainerRef.current;
            if (scrollContainer) {
              setTimeout(() => {
                scrollContainer.scrollTop = scrollContainer.scrollHeight + 100000;
              }, 100);
            }
          }}
          messageText={messageText}
          setMessageText={setMessageText}
        />
        {/* <p className="px-2 text-tiny text-default-400">
          Onix can make mistakes. Consider checking important information.
        </p> */}
      </div>
    </>
  );
}
