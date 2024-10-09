import Stripe from 'stripe';
import api, { BasicAuth, FormURLEncodedContentType } from './edgeSafeStripeInstance';

interface Params {
  invoiceId: string;
}

export const payInvoice = async ({ invoiceId }: Params) => {
  const endpoint = `/invoices/${invoiceId}/pay`;
  const body = new URLSearchParams({
    off_session: 'true',
  });
  const headers = {
    ...BasicAuth,
    ...FormURLEncodedContentType,
  };

  const res = await api.post(endpoint, {
    headers,
    body: body.toString(),
  });

  const invoice = res as Stripe.Invoice;

  return invoice;
};
