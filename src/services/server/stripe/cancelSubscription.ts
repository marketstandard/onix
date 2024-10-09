import stripe from './instance';

interface Params {
  stripeSubscriptionId: string;
}

export const cancelSubscription = async ({ stripeSubscriptionId }: Params) => {
  const res = await stripe.subscriptions.update(stripeSubscriptionId, {
    cancel_at_period_end: true,
  });

  return res;
};
