import stripe from 'services/server/stripe/instance';

export const getAllSubscriptions = async ({ customerId }: { customerId: string }) => {
  const activeSubscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'active',
  });
  const trialSubscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'active',
  });

  return [...activeSubscriptions.data, ...trialSubscriptions.data];
};
