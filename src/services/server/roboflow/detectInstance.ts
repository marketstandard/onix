import APIService from '../ApiService';

const BASE_URL = `https://detect.roboflow.com`;
const API_KEY = process.env['ROBOFLOW_API_KEY']!;

export const parameterizedAuth = `api_key=${API_KEY}`;

const api = new APIService({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export default api;
