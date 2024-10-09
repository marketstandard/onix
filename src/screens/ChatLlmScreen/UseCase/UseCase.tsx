import React from 'react';
import TagList from './TagList';

interface UseCaseProps {
  title: string;
  description: string;
  tags: string[];
}

export default function UseCase({ title, description, tags }: UseCaseProps) {
  return (
    <div className="mx-auto flex max-w-[90%] flex-col">
      <h3 className="mb-4 w-full font-title text-3xl font-medium tracking-tight text-white max-md:max-w-full">
        {title}
      </h3>
      <div className="h-px max-w-[80%] bg-gradient-to-r from-[rgba(0,253,200,1)] to-[rgba(0,0,0,0)]">
        &nbsp;
      </div>
      <div className="mt-3 flex w-full flex-col max-md:max-w-full">
        <p className="text-base leading-6 text-text-secondary-darkmode max-md:max-w-full">
          {description}
        </p>
        <TagList tags={tags} />
      </div>
    </div>
  );
}
