import { listCustomerCards } from 'services/server/stripe/listCustomerCards';

/**
 * @todo consider using our database instead so we don't hit Stripe to often
 */
export const hasCardOnFile = async ({
  organizationStripeId,
  customerStripeId,
}: {
  organizationStripeId: string;
  customerStripeId: string;
}) => {
  if (organizationStripeId) {
    const cards = await listCustomerCards({ customerId: organizationStripeId, limit: 10 });

    if (cards.length > 0) {
      return true;
    }
  }

  if (customerStripeId) {
    const cards = await listCustomerCards({ customerId: customerStripeId, limit: 10 });

    if (cards.length > 0) {
      return true;
    }
  }

  return false;
};
