import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';
import {
  GetSubscriptionByStripeIdQuery,
  GetSubscriptionByStripeIdQueryVariables,
} from 'types/generated/server';
import client from 'services/server/graphql/client';

const QUERY = gql`
  query getSubscriptionByStripeId($stripeSubscriptionId: String!) {
    subscriptions(where: { stripeSubscriptionId: { _eq: $stripeSubscriptionId } }, limit: 1) {
      cancelAtPeriodEnd
      canceledAt
      createdAt
      currentPeriodEnd
      currentPeriodStart
      id
      startDate
      status
      stripeSubscriptionId
      trialEnd
      trialStart
      updatedAt
      userId
    }
  }
`;

export const getSubscriptionByStripeId = async (
  variables: GetSubscriptionByStripeIdQueryVariables,
) => {
  const data = await client.request<GetSubscriptionByStripeIdQuery>(print(QUERY), variables);
  return data?.subscriptions?.[0];
};
