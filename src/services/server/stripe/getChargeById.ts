import stripe from 'services/server/stripe/instance';

export const getChargeById = async (chargeId: string) => {
  const charge = await stripe.charges.retrieve(chargeId, { expand: ['payment_intent'] });
  return charge;
};
