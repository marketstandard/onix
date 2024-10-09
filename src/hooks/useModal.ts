import { useState } from 'react';

interface Params {
  id?: string;
  isInitialOpen?: boolean;
}

const initial = {
  id: '',
  isInitialOpen: false,
};

export const useModal = (config: Params = initial) => {
  const { isInitialOpen = false } = config;

  const [isOpen, setIsOpen] = useState(isInitialOpen);

  const openModal = (_open?: boolean) => setIsOpen(true);
  const closeModal = (_close?: boolean) => setIsOpen(false);

  return {
    config,
    isOpen,
    setIsOpen,
    openModal,
    closeModal,
    toggleModal: () => setIsOpen(!isOpen),
  };
};
