import Stripe from 'stripe';

export const API_VERSION = '2023-10-16';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: API_VERSION,
  typescript: true,
});

export default stripe;
