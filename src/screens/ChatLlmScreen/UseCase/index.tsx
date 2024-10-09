import React from 'react';
import UseCase from './UseCase';

export default function LegalProfessionalsContainer({
  title,
  description,
  tags,
}: {
  title: string;
  description: string;
  tags: string[];
}) {
  return <UseCase title={title} description={description} tags={tags} />;
}
