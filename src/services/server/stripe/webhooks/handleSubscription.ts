import { type Stripe } from 'stripe';
import { SubscriptionStatusesEnum } from 'types/generated/server';
import { upsertSubscription } from 'services/server/graphql/mutations/upsertSubscription';
import { getStripeCustomer } from 'services/server/graphql/queries/getStripeCustomer';
import { getCustomerIdFromObject } from 'services/server/stripe/getCustomerIdFromObject';
import { getSubscription } from 'services/server/stripe/getSubscription';

export const handleSubscription = async (event: Stripe.Event) => {
  const subscriptionObject = event.data.object as Stripe.Subscription;
  const subscription = await getSubscription(subscriptionObject.id);

  const {
    id: stripeSubscriptionId,
    customer,
    status,
    start_date,
    current_period_start,
    current_period_end,
    cancel_at_period_end,
    canceled_at,
    trial_start,
    trial_end,
    metadata,
  } = subscription;
  const stripeCustomerId = getCustomerIdFromObject({ customer });

  if (!stripeCustomerId) {
    throw new Error('Subscription is not attached to a customer.');
  }

  const user = await getStripeCustomer({ stripeCustomerId });

  if (!customer) {
    throw new Error('Customer not found.');
  }

  await upsertSubscription({
    object: {
      id: subscription.id,
      userId: user.id,
      stripeSubscriptionId: stripeSubscriptionId,
      status: status as SubscriptionStatusesEnum,
      startDate: new Date(start_date * 1000).toISOString(),
      currentPeriodStart: new Date(current_period_start * 1000).toISOString(),
      currentPeriodEnd: new Date(current_period_end * 1000).toISOString(),
      cancelAtPeriodEnd: cancel_at_period_end,
      canceledAt: canceled_at ? new Date(canceled_at * 1000).toISOString() : null,
      trialStart: trial_start ? new Date(trial_start * 1000).toISOString() : null,
      trialEnd: trial_end ? new Date(trial_end * 1000).toISOString() : null,
      metadata: metadata || {},
    },
  });
};
