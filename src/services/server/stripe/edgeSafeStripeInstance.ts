import ApiService from 'services/server/ApiService';

const BASE_URL = `https://api.stripe.com/v1`;
const API_KEY = process.env['STRIPE_SECRET_KEY']!;

export const BasicAuth = {
  Authorization: `Basic ${Buffer.from(API_KEY).toString('base64')}`,
};

export const BearerAuth = {
  Authorization: `Bearer ${API_KEY}`,
};

export const FormURLEncodedContentType = {
  'content-type': 'application/x-www-form-urlencoded',
};

const api = new ApiService({
  baseUrl: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export default api;
