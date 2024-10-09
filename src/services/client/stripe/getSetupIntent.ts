import Stripe from 'stripe';
import api from 'services/client/api';

export interface Response {
  publishableKey: string | undefined;
  ephemeralKey: string | undefined;
  setupIntentClientSecret: string | undefined;
  customerId: string | null;
}
export const getSetupIntent = async (idToken: string) => {
  const response = await api.post('v1/payment-providers/stripe/setup-intent', {
    payload: { token: idToken },
  });
  return response as Response;
};
