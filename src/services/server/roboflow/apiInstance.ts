import APIService from '../ApiService';

const BASE_URL = `https://api.roboflow.com`;
const API_KEY = process.env['ROBOFLOW_API_KEY']!;

const api = new APIService({
  baseUrl: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export default api;
