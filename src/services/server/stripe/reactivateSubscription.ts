import stripe from './instance';

export interface Params {
  stripeSubscriptionId: string;
}

export const reactivateSubscription = async ({ stripeSubscriptionId }: Params) => {
  const res = await stripe.subscriptions.update(stripeSubscriptionId, {
    cancel_at_period_end: false,
  });

  return res;
};
