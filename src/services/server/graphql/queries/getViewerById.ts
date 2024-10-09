import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';
import { GetViewerByIdQuery, GetViewerByIdQueryVariables } from 'types/generated/server';
import client from 'services/server/graphql/client';

const QUERY = gql`
  query getViewerById($id: uuid!) {
    usersByPk(id: $id) {
      createdAt
      email
      emailVerified
      id
      image
      name
      stripeCustomerId
      accounts {
        id
        expiresAt
      }
      subscriptions {
        cancelAtPeriodEnd
        canceledAt
        createdAt
        currentPeriodEnd
        currentPeriodStart
        id
        startDate
        status
        trialEnd
        trialStart
        stripeSubscriptionId
      }
    }
  }
`;

export const GetViewerById = async (variables: GetViewerByIdQueryVariables) => {
  const data = await client.request<GetViewerByIdQuery>(print(QUERY), variables);
  return data?.usersByPk;
};
