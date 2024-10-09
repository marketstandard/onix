import stripe from 'services/server/stripe/instance';

export const updateSubscriptionPaymentMethod = async ({
  subscriptionId,
  paymentMethodId,
}: {
  subscriptionId: string;
  paymentMethodId: string;
}) => {
  const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
    default_payment_method: paymentMethodId,
  });

  return updatedSubscription;
};
