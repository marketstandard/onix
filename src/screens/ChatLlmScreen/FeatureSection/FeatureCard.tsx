import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-lg border-[rgba(255,255,255,0.1)] bg-[rgba(127,124,136,0.06)] bg-opacity-10 p-6 shadow-[0px_0px_27.6px_0px_rgba(255,255,255,0.12)_inset] backdrop-blur-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-md border-[rgba(255,255,255,0.1)] bg-gradient-to-br from-[rgba(34,254,208,0.40)] to-[rgba(0,253,200,0.40)] backdrop-blur-sm">
        {icon}
      </div>
      <div className="mt-6 flex w-full flex-col">
        <h2 className="font-title text-xl font-medium">{title}</h2>
        <p className="typography-body mt-4 flex-1 text-text-secondary-lightmode dark:text-text-secondary-darkmode">
          {description}
        </p>
      </div>
    </div>
  );
}
