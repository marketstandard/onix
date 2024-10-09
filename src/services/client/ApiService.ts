import { HttpMethods } from 'constants/http';

interface ConstructorConfig {
  baseUrl?: string;
  injectHeaders?: () => Promise<object>;
}

interface RequestConfig extends RequestInit {
  payload?: object;
}

class APIService {
  baseUrl: string;
  injectHeaders?: () => Promise<object>;

  constructor({ baseUrl = '', injectHeaders }: ConstructorConfig) {
    this.baseUrl = baseUrl;
    this.injectHeaders = injectHeaders;
  }

  async request(endpoint: string, { payload, ...customConfig }: RequestConfig = {}) {
    const headers = { 'content-type': 'application/json' };
    const config: RequestInit = {
      method: payload ? HttpMethods.Post : HttpMethods.Get,
      ...customConfig,
      headers: {
        ...headers,
        ...customConfig.headers,
      },
    };

    if (this.injectHeaders) {
      const injectedHeaders = await this.injectHeaders();
      config.headers = {
        ...config.headers,
        ...injectedHeaders,
      };
    }

    if (payload) {
      config.body = JSON.stringify(payload);
    }

    return fetch(`${this.baseUrl}/${endpoint}`, config).then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        // TODO: Log in sentry
        return Promise.reject(data);
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
