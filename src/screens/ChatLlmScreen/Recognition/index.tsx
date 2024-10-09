import React from 'react';
import { LogoCounter } from './LogoCounter';
import { LogoGrid } from './LogoGrid';

interface TrustedInnovatorsProps {
  userCount: number;
}

export default function Recognition({ userCount }: TrustedInnovatorsProps) {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-10 px-2 md:flex-row md:flex-wrap">
      <div className="my-auto flex min-h-[140px] min-w-[320px] flex-col justify-between self-stretch">
        <h2 className="w-[307px] max-w-full text-2xl font-medium leading-tight text-white">
          Trusted by Innovators
        </h2>
        <LogoCounter userCount={userCount} />
      </div>
      <LogoGrid />
    </section>
  );
}
