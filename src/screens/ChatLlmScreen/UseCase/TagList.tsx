import React from 'react';

interface TagListProps {
  tags: string[];
}

export default function TagList({ tags }: TagListProps) {
  return (
    <div className="mt-6 flex items-center gap-2.5 self-start text-sm leading-none text-white shadow-[inset_0px_0px_27.6px_0px_rgba(255,255,255,0.12)]">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="my-auto self-stretch whitespace-nowrap rounded-md border border-solid border-white border-opacity-10 bg-zinc-500 bg-opacity-10 px-4 py-2"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
