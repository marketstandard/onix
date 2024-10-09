import React, { useEffect, useState } from 'react';
import { ProcessingPhrasesThemes, getProcessingPhrases } from 'constants/app';
import Loader from 'svg/Loader';
import classNames from 'styles/utils/classNames';

export default function LoaderWithText({
  direction = 'column',
  theme = ProcessingPhrasesThemes.Default,
}: {
  direction?: 'row' | 'column';
  theme?: ProcessingPhrasesThemes;
}) {
  const phrases = getProcessingPhrases(theme);

  // Initialize with a random phrase index
  const [phraseIndex, setPhraseIndex] = useState(Math.floor(Math.random() * phrases.length));

  useEffect(() => {
    // Set up an interval to change the phrase every 2 seconds
    const intervalId = setInterval(() => {
      setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 2000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className={classNames(
        'flex items-center justify-center',
        direction === 'row' ? 'flex-row gap-2' : 'flex-col gap-3',
      )}
    >
      <Loader className="h-5 w-5 text-brand-primary" />
      <span>{phrases[phraseIndex]}</span>
    </div>
  );
}
