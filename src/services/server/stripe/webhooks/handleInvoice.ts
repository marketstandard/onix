import { type Stripe } from 'stripe';
import { InvoiceStatusesEnum } from 'types/generated/server';
import { upsertInvoice } from 'services/server/graphql/mutations/upsertInvoice';
import { getStripeCustomer } from 'services/server/graphql/queries/getStripeCustomer';
import { getSubscriptionByStripeId } from 'services/server/graphql/queries/getSubscriptionByStripeId';
import { getCustomerIdFromObject } from 'services/server/stripe/getCustomerIdFromObject';
import { getInvoice } from 'services/server/stripe/getInvoice';

export const handleInvoice = async (event: Stripe.Event) => {
  const invoiceObject = event.data.object as Stripe.Invoice;
  const invoice = await getInvoice({ invoiceId: invoiceObject.id });
  const {
    id: stripeInvoiceId,
    customer,
    subscription: stripeSubscriptionId,
    status,
    amount_due,
    amount_paid,
    amount_remaining,
    attempted,
    attempt_count,
    paid,
    created,
    due_date,
    hosted_invoice_url,
    invoice_pdf,
    metadata,
  } = invoice;
  const stripeCustomerId = getCustomerIdFromObject({ customer });

  if (!stripeCustomerId) {
    throw new Error('Subscription is not attached to a customer.');
  }

  const user = await getStripeCustomer({ stripeCustomerId });

  if (!customer) {
    throw new Error('Customer not found.');
  }

  let subscriptionId: string | null = null;

  if (stripeSubscriptionId) {
    const subscription = await getSubscriptionByStripeId({
      stripeSubscriptionId:
        typeof stripeSubscriptionId === 'string' ? stripeSubscriptionId : stripeSubscriptionId.id,
    });
    subscriptionId = subscription?.id || null;
  }

  await upsertInvoice({
    object: {
      amountDue: amount_due,
      amountPaid: amount_paid,
      amountRemaining: amount_remaining,
      attemptCount: attempt_count,
      attempted,
      hostedInvoiceUrl: hosted_invoice_url,
      id: invoice.id,
      invoicePdf: invoice_pdf,
      metadata: metadata || {},
      paid,
      status: status as InvoiceStatusesEnum,
      stripeInvoiceId,
      subscriptionId,
      userId: user.id,
      created: new Date(created * 1000).toISOString(),
      dueDate: due_date ? new Date(due_date * 1000).toISOString() : null,
    },
  });
};
