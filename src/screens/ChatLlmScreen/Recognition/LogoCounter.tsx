import React from 'react';

interface LogoCounterProps {
  userCount: number;
}

export function LogoCounter({ userCount }: LogoCounterProps) {
  return (
    <div className="mt-4 flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(127,124,136,0.06)] bg-opacity-10 p-4 text-center font-semibold uppercase leading-none shadow-[0px_0px_27.6px_0px_rgba(255,255,255,0.12)_inset] backdrop-blur-sm">
      <div className="flex rotate-[-2.9238912286005955e-17rad] flex-col">
        <div className="flex rotate-[-2.94064858432194e-17rad] items-center gap-4 text-3xl text-white">
          <div className="my-auto rotate-[-2.94064858432194e-17rad] self-stretch">
            {userCount.toLocaleString()}+
          </div>
          <img
            loading="lazy"
            src="/users.png"
            alt="Logo"
            className="my-auto aspect-[3.89] min-h-[36px] w-[140px] shrink-0 gap-0 self-stretch object-contain"
          />
        </div>
        <div className="mt-1 rotate-[-2.9238912286005955e-17rad] self-start text-xs text-zinc-300">
          users and counting
        </div>
      </div>
    </div>
  );
}
