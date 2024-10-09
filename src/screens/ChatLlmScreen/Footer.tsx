import React from 'react';

interface InfoButtonProps {
  text: string;
}

const InfoButton = ({ text }: InfoButtonProps) => {
  return <button className="self-stretch rounded-xl px-3 py-1 shadow-sm">{text}</button>;
};

const FooterText = () => {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-1 self-center text-sm leading-none text-neutral-300 max-md:max-w-full">
      <span className="text-3xl">©</span>
      <p className="my-auto self-stretch max-md:max-w-full">2024 Market Standard LLC</p>
    </div>
  );
};

const infoButtons = ['Open Source', 'How We Protect Privacy', 'Do We Store Data?'];

export default function Footer() {
  return (
    <footer className="flex flex-col bg-zinc-950 px-20 pb-10 pt-8 max-md:px-5">
      <div className="flex w-full items-start justify-between border-b border-white border-opacity-20 pb-6 max-md:max-w-full">
        <div className="flex w-full min-w-[240px] flex-1 basis-0 items-center justify-center max-md:max-w-full">
          <div className="flex min-w-[240px] flex-col items-center max-md:max-w-full">
            <div className="flex flex-col items-center justify-center text-center font-medium leading-loose text-white">
              <h2 className="font-title text-2xl">Own Your Data</h2>
              <p className="mt-2 text-base">Privacy First. Always.</p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="mt-8 flex items-center justify-center gap-2 rounded-xl p-1 text-center text-sm leading-none text-zinc-300 max-md:max-w-full">
        {infoButtons.map((text, index) => (
          <InfoButton key={index} text={text} />
        ))}
      </div> */}
      <FooterText />
    </footer>
  );
}
