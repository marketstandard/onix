import React from 'react';

interface Props {
  children: React.ReactNode;
}

const CardError: React.FC<Props> = ({ children }) => {
  return (
    <div className="mb-4 w-full rounded-lg border border-negative p-4 text-center text-sm text-negative">
      {children}
    </div>
  );
};

export default CardError;
