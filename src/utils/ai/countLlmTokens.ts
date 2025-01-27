/**
 * Rough estimation of GPT tokens. While not as accurate as tiktoken,
 * this works in all environments and is good enough for estimation purposes.
 * GPT models generally treat 3.8 characters as ~1 token on average.
 * We add a 20% buffer to ensure client-side estimates are higher than server-side counts.
 */
export const countLlmTokens = (text: string): number => {
  const baseEstimate = Math.ceil(text.length / 3.8);
  return Math.ceil(baseEstimate * 1.2); // Add 20% buffer
};
