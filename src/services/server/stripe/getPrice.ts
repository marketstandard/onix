import stripe from 'services/server/stripe/instance';

export async function getPrice(priceId: string) {
  const price = await stripe.prices.retrieve(priceId);
  return price;
}
