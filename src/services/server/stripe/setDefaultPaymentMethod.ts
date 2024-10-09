import stripe from 'services/server/stripe/instance';

export const setDefaultPaymentMethod = async ({
  paymentMethodId,
  customerId,
}: {
  paymentMethodId: string;
  customerId: string;
}) => {
  const updatedCustomer = await stripe.customers.update(customerId, {
    invoice_settings: {
      default_payment_method: paymentMethodId,
    },
  });

  return updatedCustomer;
};
