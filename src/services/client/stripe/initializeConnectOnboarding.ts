import Stripe from 'stripe';
import api from 'services/client/api';

interface Response {
  accountLink: Stripe.AccountLink;
}

export const initializeConnectOnboarding = async (idToken: string) => {
  const response = await api.post('v1/payment-providers/stripe/connect/onboarding', {
    payload: { token: idToken },
  });
  return response as Response;
};
