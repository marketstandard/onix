import api from 'services/client/api';

export const updateUserOnboardStatus = async (accountId: string) => {
  const response = await api.post('v1/payment-providers/stripe/connect/refresh', {
    payload: { accountId },
  });
  return response;
};
