import stripe from 'services/server/stripe/instance';

interface Params {
  id: string;
  email: string;
  additionalMetadata?: Record<string, any>;
}

export const createStripeUser = async ({ id, email, additionalMetadata = {} }: Params) => {
  const stripeUser = await stripe.customers.create({
    email,
    metadata: {
      id,
      ...additionalMetadata,
    },
  });

  return stripeUser;
};

export default createStripeUser;
