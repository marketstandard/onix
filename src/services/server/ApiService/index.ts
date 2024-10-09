import fetch from 'isomorphic-unfetch';
import { HttpMethods } from 'constants/http';

const DEFAULT_HEADERS = {
  'content-type': 'application/json',
};

type HeadersInit =
  | Record<string, string>
  | Iterable<readonly [string, string]>
  | Iterable<Iterable<string>>;

interface ConstructorConfig {
  baseUrl?: string;
  headers?: HeadersInit;
}

const removeLeadingSlash = (endpoint: string = '') => {
  return endpoint[0] === '/' ? endpoint.slice(1) : endpoint;
};

export interface RequestConfig extends RequestInit {
  payload?: object;
}

class APIService {
  baseUrl: string;
  headers: HeadersInit;

  constructor({ baseUrl = '', headers = {} }: ConstructorConfig) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  request(endpoint: string, { payload, ...customConfig }: RequestConfig = {}) {
    const headers = { ...DEFAULT_HEADERS, ...this.headers };
    const config: RequestInit = {
      method: payload ? HttpMethods.Post : HttpMethods.Get,
      ...customConfig,
      headers: {
        ...headers,
        ...customConfig.headers,
      },
    };

    if (payload) {
      config.body = JSON.stringify(payload);
    }

    const requestEndpoint = removeLeadingSlash(endpoint);

    return fetch(`${this.baseUrl}/${requestEndpoint}`, config).then(async (response) => {
      const isJson = response.headers.get('content-type')?.includes('application/json');

      if (response.ok) {
        if (isJson) {
          const data = await response.json();
          return data;
        } else {
          return response;
        }
      } else {
        // TODO: Log in sentry
        return Promise.reject(isJson ? await response.json() : await response.text());
      }
    });
  }

  get(endpoint: string, config: RequestConfig = {}) {
    config.method = HttpMethods.Get;
    return this.request(endpoint, config);
  }

  post(endpoint: string, config: RequestConfig = {}) {
    config.method = HttpMethods.Post;
    return this.request(endpoint, config);
  }

  put(endpoint: string, config: RequestConfig = {}) {
    config.method = HttpMethods.Put;
    return this.request(endpoint, config);
  }

  patch(endpoint: string, config: RequestConfig = {}) {
    config.method = HttpMethods.Patch;
    return this.request(endpoint, config);
  }

  delete(endpoint: string, config: RequestConfig = {}) {
    config.method = HttpMethods.Delete;
    return this.request(endpoint, config);
  }
}

export default APIService;
