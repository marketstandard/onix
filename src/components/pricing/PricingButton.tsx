'use client';

import React from 'react';
import type { CardProps } from '@nextui-org/react';
import { Card } from '@nextui-org/react';
import { cn } from '@nextui-org/react';

const PricingRadioItem = React.forwardRef<HTMLInputElement, CardProps>(
  ({ classNames = {}, className, children, ...props }, ref) => (
    <Card
      {...props}
      ref={ref}
      classNames={{
        ...classNames,
        base: cn(
          'relative max-w-full inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between',
          'flex-row-reverse cursor-pointer rounded-lg gap-4 !border-medium border-default-200',
          'data-[selected=true]:border-primary',
          classNames?.base,
          className,
        ),
      }}
    >
      {children}
    </Card>
  ),
);

PricingRadioItem.displayName = 'PricingRadioItem';

export default PricingRadioItem;
