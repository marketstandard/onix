import React from 'react';
import classNames from 'styles/utils/classNames';

interface Props {
  backgroundColor?: string;
  children: React.ReactNode;
}

const Card = ({ backgroundColor = 'bg-bg-primary-lightmode', children }: Props) => {
  return (
    <div className={classNames('shadow-lightmode-primary rounded-md', backgroundColor)}>
      {children}
    </div>
  );
};

export default Card;
