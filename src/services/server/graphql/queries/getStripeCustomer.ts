import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';
import { GetStripeCustomerQuery, GetStripeCustomerQueryVariables } from 'types/generated/server';
import client from 'services/server/graphql/client';

const QUERY = gql`
  query getStripeCustomer($stripeCustomerId: String!) {
    users(where: { stripeCustomerId: { _eq: $stripeCustomerId } }) {
      id
      stripeCustomerId
    }
  }
`;

export const getStripeCustomer = async (variables: GetStripeCustomerQueryVariables) => {
  const data = await client.request<GetStripeCustomerQuery>(print(QUERY), variables);
  return data?.users?.[0];
};
