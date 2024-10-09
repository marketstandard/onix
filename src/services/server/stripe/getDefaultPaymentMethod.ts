import stripe from 'services/server/stripe/instance';

export const getDefaultPaymentMethod = async ({ customerId }: { customerId: string }) => {
  const customer = await stripe.customers.retrieve(customerId, {
    expand: ['invoice_settings', 'invoice_settings.default_payment_method'],
  });
  return {
    // @ts-ignore this is expanded
    invoiceSettings: customer?.invoice_settings,
    // @ts-ignore this is expanded
    defaultPaymentMethod: customer?.invoice_settings?.default_payment_method,
  };
};
