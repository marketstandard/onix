import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';
import { UpsertInvoiceMutation, UpsertInvoiceMutationVariables } from 'types/generated/server';
import client from 'services/server/graphql/client';

const MUTATION = gql`
  mutation upsertInvoice($object: InvoicesInsertInput!) {
    insertInvoicesOne(
      object: $object
      onConflict: {
        constraint: invoices_stripe_invoice_id_key
        updateColumns: [
          amountDue
          amountPaid
          amountRemaining
          attemptCount
          attempted
          dueDate
          hostedInvoiceUrl
          invoicePdf
          metadata
          paid
          status
          stripeInvoiceId
          subscriptionId
        ]
      }
    ) {
      id
    }
  }
`;

export const upsertInvoice = async (variables: UpsertInvoiceMutationVariables) => {
  const data = await client.request<UpsertInvoiceMutation>(print(MUTATION), variables);
  return data;
};
