import React from 'react';

interface LogoProps {
  src: string;
  alt: string;
  className: string;
}

const logos: LogoProps[] = [
  {
    src: '/recognition/ms.svg',
    alt: 'Market Standard',
    className:
      'object-contain shrink-0 self-stretch my-auto bg-blend-lighten aspect-[4.41] w-[198px]',
  },
  {
    src: '/recognition/gc.svg',
    alt: 'gitconnected',
    className:
      'object-contain shrink-0 self-stretch my-auto bg-blend-normal aspect-[6.02] w-[145px]',
  },
  {
    src: '/recognition/if.svg',
    alt: 'IF',
    className: 'object-contain shrink-0 self-stretch my-auto aspect-[5.75] w-[172px]',
  },
  {
    src: '/recognition/mavyn.svg',
    alt: 'Mavyn',
    className: 'object-contain shrink-0 self-stretch my-auto aspect-[6.13] w-[135px]',
  },
  {
    src: '/recognition/strok3.svg',
    alt: 'Strok3',
    className:
      'object-contain shrink-0 self-stretch my-auto bg-blend-luminosity aspect-[3.33] w-[100px]',
  },
  {
    src: '/recognition/equalix.svg',
    alt: 'Equalix',
    className: 'object-contain shrink-0 self-stretch my-auto aspect-[3.57] w-[107px]',
  },
];

export function LogoGrid() {
  return (
    <div className="my-auto flex w-[613px] min-w-[240px] flex-wrap items-center justify-center gap-10 self-stretch max-md:max-w-full">
      {logos.map((logo, index) => (
        <img key={index} loading="lazy" src={logo.src} alt={logo.alt} className={logo.className} />
      ))}
    </div>
  );
}
