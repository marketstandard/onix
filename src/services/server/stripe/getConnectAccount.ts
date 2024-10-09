import stripe from 'services/server/stripe/instance';

export const getConnectAccount = async (accountId: string) => {
  const account = await stripe.accounts.retrieve(accountId);
  return account;
};
