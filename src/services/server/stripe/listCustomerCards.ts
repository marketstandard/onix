import { type Card, PaymentMethod } from '@stripe/stripe-js';

const API_KEY = process.env['STRIPE_SECRET_KEY'];

interface Params {
  customerId: string;
  limit: number;
}

export const listCustomerCards = async ({ customerId, limit }: Params) => {
  const url = `https://api.stripe.com/v1/customers/${customerId}/payment_methods?limit=${limit}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: 'Basic ' + Buffer.from(API_KEY + ':').toString('base64'),
    },
  });

  const json = await res.json();

  return json.data as PaymentMethod[];
};
