import React from 'react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  XMarkIcon, // Import XIcon for the close button
} from '@heroicons/react/24/outline';
import classNames from 'styles/utils/classNames';

// Ensure this utility function is correctly implemented for string concatenation

export interface Params {
  level: 'error' | 'warning' | 'success';
  message: string | React.ReactNode;
  handleClose: () => void;
}

export default function Snackbar({ level, message, handleClose }: Params) {
  let backgroundColor: string;
  let textColor: string;
  let Icon: typeof ExclamationCircleIcon;

  switch (level) {
    case 'error':
      backgroundColor = 'bg-negative border-negative';
      textColor = 'text-white';
      Icon = ExclamationTriangleIcon;
      break;
    case 'warning':
      backgroundColor = 'bg-warning border-warning';
      textColor = 'text-white';
      Icon = ExclamationCircleIcon;
      break;
    case 'success':
      backgroundColor = 'bg-positive border-positive';
      textColor = 'text-white';
      Icon = CheckCircleIcon;
      break;
  }

  const content = typeof message === 'string' ? <span>{message}</span> : message;

  return (
    <div className="mt-4 flex w-full justify-center">
      <div
        className={classNames(
          'flex w-full max-w-3xl border bg-opacity-10 lg:max-w-5xl',
          'justify-center rounded-xl px-6 py-4',
          backgroundColor,
          textColor,
          'z-50',
        )}
      >
        <div className="grid w-full grid-cols-[10%_80%_10%] items-center ">
          <Icon className="h-6 w-6 justify-self-start" />
          <div className="flex justify-center">{content}</div>
          <button
            onClick={handleClose}
            className="justify-self-end rounded-full bg-transparent p-1 hover:bg-opacity-50"
            aria-label="Close"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
