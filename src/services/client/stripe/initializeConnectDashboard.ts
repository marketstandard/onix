import Stripe from 'stripe';
import api from 'services/client/api';

interface Response {
  loginLink: Stripe.LoginLink;
}

export const initializeConnectDashboard = async (idToken: string) => {
  const response = await api.post('v1/payment-providers/stripe/connect/dashboard', {
    payload: { token: idToken },
  });
  return response as Response;
};
