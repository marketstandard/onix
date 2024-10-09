import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';
import {
  UpsertCheckoutSessionMutation,
  UpsertCheckoutSessionMutationVariables,
} from 'types/generated/server';
import client from 'services/server/graphql/client';

const MUTATION = gql`
  mutation upsertCheckoutSession($object: CheckoutSessionsInsertInput = {}) {
    insertCheckoutSessionsOne(
      object: $object
      onConflict: {
        constraint: checkout_sessions_stripe_checkout_session_id_key
        updateColumns: [
          amountTotal
          currency
          metadata
          mode
          status
          stripeCustomerId
          stripeInvoiceId
          stripeSubscriptionId
        ]
      }
    ) {
      id
    }
  }
`;

export const upsertCheckoutSession = async (variables: UpsertCheckoutSessionMutationVariables) => {
  const data = await client.request<UpsertCheckoutSessionMutation>(print(MUTATION), variables);
  return data;
};
