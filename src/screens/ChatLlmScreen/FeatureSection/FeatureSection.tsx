import React from 'react';
import FeatureCard from './FeatureCard';
import Lock from '../Lock';
import PixelCircle from '../PixelCircle';
import Target from '../Target';

export default function FeatureSection() {
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 justify-center gap-5 md:grid-cols-3">
      <FeatureCard
        icon={<PixelCircle className="w-6" />}
        title="Simple and Elegant Design"
        description="Clear, concise answers without unnecessary clutter, for a seamless user experience."
      />
      <FeatureCard
        icon={<Target className="w-6" />}
        title="Productivity Focus"
        description="Pin, tag, and group chats effortlessly to stay organized and enhance your efficiency."
      />
      <FeatureCard
        icon={<Lock className="w-6" />}
        title="Radical Privacy"
        description="Your chats are securely stored on your device, ensuring complete privacy and peace of mind."
      />
    </section>
  );
}
