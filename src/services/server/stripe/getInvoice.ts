import Stripe from 'stripe';
import api from './edgeSafeStripeInstance';

const STRIPE_API_KEY = process.env['STRIPE_SECRET_KEY']!;

interface Params {
  invoiceId: string;
}

export const getInvoice = async ({ invoiceId }: Params) => {
  const endpoint = `/invoices/${invoiceId}`;

  const res = await api.get(endpoint)

  const invoice = res as Stripe.Invoice;

  return invoice;
};
