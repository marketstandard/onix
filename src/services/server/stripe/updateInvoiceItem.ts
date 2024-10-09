import Stripe from 'stripe';
import api, {
  BasicAuth,
  FormURLEncodedContentType,
} from './edgeSafeStripeInstance';

interface Params {
  invoiceId: string;
  invoiceItemId: string;
  quantity: number;
  id: string[];
}

export const updateInvoiceItem = async ({ invoiceId, invoiceItemId, quantity, id }: Params) => {
  const endpoint = `/invoices/${invoiceId}/lines/${invoiceItemId}`;

  const body = new URLSearchParams({
    quantity: quantity.toString(),
    'metadata[id]': `${JSON.stringify(id)}`,
  });

  const headers = {
    ...BasicAuth,
    ...FormURLEncodedContentType,
  };

  const res = await api.post(endpoint, {
    headers,
    body: body.toString(),
  });

  const invoiceItem = res as Stripe.InvoiceItem;

  return invoiceItem;
};
