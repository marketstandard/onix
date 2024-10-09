import stripe from 'services/server/stripe/instance';

export async function getProduct(productId: string) {
  const product = await stripe.products.retrieve(productId);
  return product;
}
