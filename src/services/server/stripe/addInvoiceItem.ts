import Stripe from 'stripe';
import api, { BearerAuth, FormURLEncodedContentType } from './edgeSafeStripeInstance';

interface Params {
  stripeCustomerId: string;
  priceId: string;
  quantity: number;
  id: string;
  invoiceId: string;
}

export const addInvoiceItem = async ({
  stripeCustomerId,
  priceId,
  quantity,
  id,
  invoiceId,
}: Params) => {
  const endpoint = '/invoiceitems';

  const body = new URLSearchParams({
    customer: stripeCustomerId,
    price: priceId,
    invoice: invoiceId,
    currency: 'usd',
    quantity: quantity.toString(),
    'metadata[id]': `["${id}"]`,
  });

  const headers = {
    ...BearerAuth,
    ...FormURLEncodedContentType,
  };

  const res = await api.post(endpoint, {
    headers,
    body: body.toString(),
  });

  const invoiceItem = res as Stripe.InvoiceItem;

  return invoiceItem;
};
