import Stripe from 'stripe';

interface ObjectWithCustomer {
  customer: Stripe.Customer | Stripe.DeletedCustomer | string | null;
}

export const getCustomerIdFromObject = ({ customer }: ObjectWithCustomer) => {
  if (!customer) {
    return '';
  }
  if (typeof customer === 'string') {
    return customer;
  }
  if (typeof customer === 'object') {
    return customer.id;
  }

  return '';
};
