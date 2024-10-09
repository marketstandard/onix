import { type Stripe } from 'stripe';
import {
  CheckoutSessionStatusesEnum,
  InvoiceStatusesEnum,
  SubscriptionStatusesEnum,
} from 'types/generated/server';
import { upsertCheckoutSession } from 'services/server/graphql/mutations/upsertCheckoutSession';
import { upsertInvoice } from 'services/server/graphql/mutations/upsertInvoice';
import { upsertSubscription } from 'services/server/graphql/mutations/upsertSubscription';
import { getStripeCustomer } from 'services/server/graphql/queries/getStripeCustomer';
import { getSubscriptionByStripeId } from 'services/server/graphql/queries/getSubscriptionByStripeId';
import { getCheckoutSession } from 'services/server/stripe/getCheckoutSession';
import { getCustomerIdFromObject } from 'services/server/stripe/getCustomerIdFromObject';
import { getInvoice } from 'services/server/stripe/getInvoice';
import { getSubscription } from 'services/server/stripe/getSubscription';

export const handleCheckoutSessionCompleted = async (event: Stripe.Event) => {
  const sessionObject = event.data.object as Stripe.Checkout.Session;

  // Fetch the full session from Stripe
  const session = await getCheckoutSession({ sessionId: sessionObject.id });
  let subscriptionId: string | null = null;

  const {
    id: sessionId,
    customer,
    subscription: stripeSubscriptionId,
    invoice: sessionInvoice,
    metadata,
  } = session;

  const stripeCustomerId = getCustomerIdFromObject({ customer });

  if (!stripeCustomerId) {
    throw new Error('Checkout session is not attached to a customer.');
  }

  // Fetch the user from your database using the Stripe customer ID
  const user = await getStripeCustomer({ stripeCustomerId });

  if (!user) {
    throw new Error('Customer not found.');
  }

  // Handle subscription
  if (stripeSubscriptionId) {
    // Fetch subscription from Stripe
    const stripeSubscription = await getSubscription(
      typeof stripeSubscriptionId === 'string' ? stripeSubscriptionId : stripeSubscriptionId.id,
    );

    // Upsert subscription into the database
    const upsertedSubscription = await upsertSubscription({
      object: {
        id: stripeSubscription.id,
        stripeSubscriptionId: stripeSubscription.id,
        userId: user.id,
        status: stripeSubscription.status as SubscriptionStatusesEnum,
        startDate: new Date(stripeSubscription.start_date * 1000).toISOString(),
        currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000).toISOString(),
        currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000).toISOString(),
        cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
        canceledAt: stripeSubscription.canceled_at
          ? new Date(stripeSubscription.canceled_at * 1000).toISOString()
          : null,
        trialStart: stripeSubscription.trial_start
          ? new Date(stripeSubscription.trial_start * 1000).toISOString()
          : null,
        trialEnd: stripeSubscription.trial_end
          ? new Date(stripeSubscription.trial_end * 1000).toISOString()
          : null,
        metadata: stripeSubscription.metadata || {},
      },
    });

    subscriptionId = upsertedSubscription.insertSubscriptionsOne.id;
  }

  // Handle invoice
  if (sessionInvoice) {
    // Fetch invoice from Stripe
    const stripeInvoiceId = typeof sessionInvoice === 'string' ? sessionInvoice : sessionInvoice.id;
    const invoice = await getInvoice({ invoiceId: stripeInvoiceId });

    const {
      id: stripeInvoiceIdFinal,
      customer: invoiceCustomer,
      subscription: invoiceSubscriptionId,
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
      metadata: invoiceMetadata,
    } = invoice;

    const invoiceStripeCustomerId = getCustomerIdFromObject({
      customer: invoiceCustomer,
    });

    if (!invoiceStripeCustomerId) {
      throw new Error('Invoice is not attached to a customer.');
    }

    if (invoiceStripeCustomerId !== stripeCustomerId) {
      throw new Error('Invoice customer does not match session customer.');
    }

    let subscriptionId: string | null = null;

    if (invoiceSubscriptionId) {
      const subscription = await getSubscriptionByStripeId({
        stripeSubscriptionId: invoiceSubscriptionId as string,
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
        id: stripeInvoiceIdFinal,
        invoicePdf: invoice_pdf,
        metadata: invoiceMetadata || {},
        paid,
        status: status as InvoiceStatusesEnum,
        stripeInvoiceId: stripeInvoiceIdFinal,
        subscriptionId,
        userId: user.id,
        created: new Date(created * 1000).toISOString(),
        dueDate: due_date ? new Date(due_date * 1000).toISOString() : null,
      },
    });
  }

  await upsertCheckoutSession({
    object: {
      amountTotal: session.amount_total,
      currency: session.currency,
      metadata: metadata || {},
      mode: session.mode,
      status: session.payment_status as CheckoutSessionStatusesEnum,
      stripeCustomerId: getCustomerIdFromObject({ customer: session.customer }),
      stripeSubscriptionId:
        typeof session.subscription === 'string' ? session.subscription : session.subscription?.id,
      stripeCheckoutSessionId: session.id,
      subscriptionId: subscriptionId,
    },
  });
};
