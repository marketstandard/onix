import React from 'react';
import classNames from 'styles/utils/classNames';

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
}

export default function SidebarRight({ isOpen, children }: Props) {
  return (
    <div
      className={classNames(
        'bg-color-bg-lightmode-primary border-primary-lightmode fixed bottom-0 right-0 z-30 hidden h-screen overflow-hidden border-l transition-all dark:border-border-primary-darkmode lg:block',
        isOpen ? 'w-[360px] opacity-100' : 'w-[0px] opacity-0',
      )}
    >
      {children}
    </div>
  );
}
