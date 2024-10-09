import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';
import {
  UpdateUserStripeCustomerIdMutation,
  UpdateUserStripeCustomerIdMutationVariables,
} from 'types/generated/server';
import client from 'services/server/graphql/client';

const MUTATION = gql`
  mutation updateUserStripeCustomerId($id: uuid!, $stripeCustomerId: String!) {
    updateUsersByPk(pkColumns: { id: $id }, _set: { stripeCustomerId: $stripeCustomerId }) {
      id
      stripeCustomerId
    }
  }
`;

export const updateUserStripeCustomerId = async (
  variables: UpdateUserStripeCustomerIdMutationVariables,
) => {
  const data = await client.request<UpdateUserStripeCustomerIdMutation>(print(MUTATION), variables);
  return data;
};
