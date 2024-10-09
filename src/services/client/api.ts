import { API_URL } from 'constants/api';
import { getViewerToken } from 'services/client';
import APIService from './ApiService';

const BASE_URL = API_URL;

const api = new APIService({
  baseUrl: BASE_URL,
  injectHeaders: async () => {
    const token = await getViewerToken();

    if (token) {
      return { Authorization: `Bearer ${token}` };
    } else {
      return {};
    }
  },
});

export default api;
