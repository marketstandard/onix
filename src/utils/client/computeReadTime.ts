export const computeReadTime = (wordCount: number) => {
  let lowerBound = Math.floor(wordCount * 0.0055);
  let upperBound = Math.ceil(wordCount * 0.0083);

  if (lowerBound === 0) {
    lowerBound = 1;
    upperBound += 1;
  }

  return `${lowerBound}-${upperBound} Minute Read`;
};
