import stripe from 'services/server/stripe/instance';

export const getPaymentMethodById = async (paymentMethodId: string) => {
  const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
  return paymentMethod;
};
