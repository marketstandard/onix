import * as React from 'react';
import { Transition } from '@headlessui/react';

interface Props {
  children: React.ReactNode;
  isShowing: boolean;
  className?: string;
}

const TransitionFadeIn = ({ isShowing, children, className = '' }: Props) => {
  return (
    <Transition
      className={className}
      show={isShowing}
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  );
};

export default TransitionFadeIn;
