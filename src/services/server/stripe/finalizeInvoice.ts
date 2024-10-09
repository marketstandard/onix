import stripe from './instance';

interface Params {
  invoiceId: string;
}

export const finalizeAndSendInvoice = async ({ invoiceId }: Params) => {
  await stripe.invoices.finalizeInvoice(invoiceId, { auto_advance: true });
  const res = stripe.invoices.pay(invoiceId);
  return res;
};
