export const parseGeneratedPrompt = (text: string) => {
  let promptRecommended = text
    ?.split('2. Recommended Additional Detail for Elaborate Prompt:')?.[0]
    ?.split('1. Revised and Expanded Elaborate Prompt with List of Topics:')?.[1]
    ?.trim();
  let promptContext = text
    ?.split('3. Questions to Guide Conversation:')[0]
    ?.split('2. Recommended Additional Detail for Elaborate Prompt:')?.[1]
    ?.trim();
  let promptFollowup = text?.split('3. Questions to Guide Conversation:')[1]?.trim();

  return {
    promptFullOutput: text,
    promptRecommended,
    promptContext,
    promptFollowup,
  };
};
