import stripe from 'services/server/stripe/instance';

const ONBOARDING_TYPE = 'account_onboarding';
const REFRESH_URL = `${process.env.APP_URL}/my/stripe/connect/refresh`;
const RETURN_URL = `${process.env.APP_URL}/my/stripe/connect/return`;

export const createConnectOnboardingSession = async (accountId: string) => {
  const accountLink = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: REFRESH_URL,
    return_url: `${RETURN_URL}?acct=${accountId}`,
    type: ONBOARDING_TYPE,
  });

  return accountLink;
};
