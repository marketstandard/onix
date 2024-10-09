import stripe from 'services/server/stripe/instance';

export const getCheckoutSession = async ({ sessionId }: { sessionId: string }) => {
  return await stripe.checkout.sessions.retrieve(sessionId);
};
