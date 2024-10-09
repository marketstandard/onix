import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';
import {
  UpsertSubscriptionMutation,
  UpsertSubscriptionMutationVariables,
} from 'types/generated/server';
import client from 'services/server/graphql/client';

const MUTATION = gql`
  mutation upsertSubscription($object: SubscriptionsInsertInput!) {
    insertSubscriptionsOne(
      object: $object
      onConflict: {
        constraint: subscriptions_stripe_subscription_id_key
        updateColumns: [
          cancelAtPeriodEnd
          canceledAt
          currentPeriodEnd
          currentPeriodStart
          metadata
          startDate
          status
          stripeSubscriptionId
          trialEnd
          trialStart
        ]
      }
    ) {
      id
    }
  }
`;

export const upsertSubscription = async (variables: UpsertSubscriptionMutationVariables) => {
  const data = await client.request<UpsertSubscriptionMutation>(print(MUTATION), variables);
  return data;
};
