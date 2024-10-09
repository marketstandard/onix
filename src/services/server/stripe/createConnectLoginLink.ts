import stripe from 'services/server/stripe/instance';

export const createConnectLoginLink = async (accountId: string) => {
  const link = await stripe.accounts.createLoginLink(accountId);
  return link;
};
