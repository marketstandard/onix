import { useCallback, useRef, useState } from 'react';
import { API_URL } from 'constants/api';
import { HttpMethods } from 'constants/http';
import {
  RequestStatus,
  /**
   * @todo Introduce FetchStatus? One shows the state of data, and the other shows if it's fetching.
   * Ex. Perhaps I want to fetch again without removing the old data and showing it loading.
   */
  // FetchStatus
} from 'constants/requests';
import { getViewerToken } from 'services/client';
import { useToastifyErrors } from './useToastifyErrors';

/**
 * @todo SHOULD I JUST USE REACT QUERY?
 */

/**
 * @todo Should I make a simple version that just returns the response and manages the loading state?
 */

interface Params {
  id?: string;
  baseUrl?: string;
  endpoint?: string;
  injectHeaders?: () => Promise<object>;
  onStreamItem?: (data: any) => void;
  transformer?: (data: any) => string;
}

interface RequestConfig<TRequestPayload> extends RequestInit {
  endpoint?: string;
  payload?: TRequestPayload;
  onStreamComplete?: (data: string) => void;
}

type FetchResponse<TRequestPayload> = {
  data?: TRequestPayload | string;
  isStream: boolean;
  error?: string | null;
  isError: boolean;
};

type UseApiReturnType<TRequestPayload, TResponsePayload> = {
  response: Response | null;
  data: TResponsePayload | null;
  stream: string | null;
  isStreamResponse: boolean;
  status: RequestStatus;
  error: string | null;
  fetchData: (config?: RequestConfig<TRequestPayload>) => Promise<FetchResponse<TResponsePayload>>;
  post: (config?: RequestConfig<TRequestPayload>) => Promise<FetchResponse<TResponsePayload>>;
  get: (config?: RequestConfig<TRequestPayload>) => Promise<FetchResponse<TResponsePayload>>;
  put: (config?: RequestConfig<TRequestPayload>) => Promise<FetchResponse<TResponsePayload>>;
  patch: (config?: RequestConfig<TRequestPayload>) => Promise<FetchResponse<TResponsePayload>>;
  delete: (config?: RequestConfig<TRequestPayload>) => Promise<FetchResponse<TResponsePayload>>;
  isCalled: boolean;
  RequestStatus: typeof RequestStatus;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  responseStatusCode: number | null;
  responseHeaders: Headers | null;
  stopRequest: () => void;
  resetInitialState: () => void;
};

const injectViewerToken = async () => {
  const token = await getViewerToken();

  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
};

const removeBoundSlash = (endpoint: string = '') => {
  let endpointWithoutSlash = endpoint;
  endpointWithoutSlash = endpoint[0] === '/' ? endpoint.slice(1) : endpoint;
  endpointWithoutSlash =
    endpointWithoutSlash[endpointWithoutSlash.length - 1] === '/'
      ? endpointWithoutSlash.slice(0, -1)
      : endpointWithoutSlash;
  return endpointWithoutSlash;
};

export const useApi = <TRequestPayload = any, TResponsePayload = any>({
  baseUrl,
  endpoint: endpointPrefix,
  injectHeaders,
  onStreamItem,
  transformer = (data) => data,
}: Params): UseApiReturnType<TRequestPayload, TResponsePayload> => {
  const [status, setStatus] = useState(RequestStatus.Idle);
  const [data, setData] = useState<TResponsePayload | null>(null);
  const [stream, setStream] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCalled, setIsCalled] = useState(false);
  const [isStreamResponse, setIsStreamResponse] = useState(false);
  const [responseStatusCode, setResponseStatusCode] = useState<number | null>(null);
  const [responseHeaders, setResponseHeaders] = useState<Headers | null>(null);
  const [response, setResponse] = useState<Response | null>(null);
  const abortController = useRef(new AbortController());

  const resetInitialState = useCallback(() => {
    setResponse(null);
    setData(null);
    setStream(null);
    setError(null);
    setIsStreamResponse(false);
    setResponseStatusCode(null);
    setResponseHeaders(null);
    setStatus(RequestStatus.Idle);
    setIsCalled(false);
  }, []);

  const resetNewRequest = () => {
    setResponse(null);
    setData(null);
    setStream(null);
    setError(null);
    setIsStreamResponse(false);
    setResponseStatusCode(null);
    setResponseHeaders(null);
    setStatus(RequestStatus.Loading);
  };

  // Function to handle the API request
  const fetchData = async ({
    endpoint: fetchEndpoint,
    payload,
    onStreamComplete,
    ...customConfig
  }: RequestConfig<TRequestPayload> = {}) => {
    /**
     * @todo Implement some kind of refetching where it doesn't clobber the old data. May need to introduce a FetchStatus.
     */
    resetNewRequest();
    setIsCalled(true);

    try {
      const headers = { 'content-type': 'application/json' };
      const config: RequestInit = {
        ...customConfig,
        headers: {
          ...headers,
          ...customConfig.headers,
        },
      };

      if (injectHeaders) {
        const injectedHeaders = await injectHeaders();
        config.headers = {
          ...config.headers,
          ...injectedHeaders,
        };
      }

      if (payload) {
        config.body = JSON.stringify(payload);
      }

      /**
       * @todo Should I pick between the endpoints or combine them?
       */
      const endpoint = `${endpointPrefix || ''}/${removeBoundSlash(fetchEndpoint || '')}`;
      const requestEndpoint = removeBoundSlash(endpoint);

      const response = await fetch(`${baseUrl}/${requestEndpoint}`, {
        ...config,
        signal: abortController.current.signal,
      });

      setResponse(response);
      setResponseStatusCode(response.status);
      setResponseHeaders(response.headers);

      const contentType = response.headers.get('Content-Type');
      const isStream = !!contentType && contentType.includes('text/event-stream');
      const isJson = !!contentType && contentType.includes('application/json');

      if (!response.ok) {
        if (isJson) {
          const responseMessage: { message: string } = await response.json();
          throw new Error(responseMessage.message || `${response.statusText}`);
        } else {
          const errorText = await response.text();
          throw new Error(errorText || `${response.statusText}`);
        }
      }

      setIsStreamResponse(isStream);

      if (isStream) {
        const data = response.body;
        const reader = data.getReader();
        const decoder = new TextDecoder();
        let result = '';
        let done = false;

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunkValue = decoder.decode(value);

          if (onStreamItem) {
            onStreamItem(chunkValue);
          } else {
            result += chunkValue;
            setStream((prev) => (prev || '') + transformer(chunkValue));
          }
        }

        setStatus(RequestStatus.Success);

        if (onStreamComplete) {
          onStreamComplete(result);
        }

        return { data: result, isStream, isError: false };
      } else if (isJson) {
        const result: TResponsePayload = await response.json();
        setData(result);
        setStatus(RequestStatus.Success);

        return { data: result, isStream, isError: false };
      } else {
        const result = await response.text();
        setStatus(RequestStatus.Success);

        return { data: result, isStream, isError: false };
      }
    } catch (error) {
      setError(error.message);
      setStatus(RequestStatus.Error);

      return { error: error.message, isStream: false, isError: true };
    }
  };

  const stopRequest = useCallback(() => {
    abortController.current.abort();
    abortController.current = new AbortController();
  }, []);

  return {
    response,
    data,
    stream,
    isStreamResponse,
    status,
    error,
    fetchData,
    post: (data: RequestConfig<TRequestPayload> = {}) =>
      fetchData({ ...data, method: HttpMethods.Post, payload: data.payload }),
    get: (data: RequestConfig<TRequestPayload> = {}) =>
      fetchData({ ...data, method: HttpMethods.Get, payload: data.payload }),
    put: (data: RequestConfig<TRequestPayload> = {}) =>
      fetchData({ ...data, method: HttpMethods.Put, payload: data.payload }),
    patch: (data: RequestConfig<TRequestPayload> = {}) =>
      fetchData({ ...data, method: HttpMethods.Patch, payload: data.payload }),
    delete: (data: RequestConfig<TRequestPayload> = {}) =>
      fetchData({ ...data, method: HttpMethods.Delete, payload: data.payload }),
    isCalled,
    RequestStatus,
    isLoading: status === RequestStatus.Loading,
    isSuccess: status === RequestStatus.Success,
    isError: status === RequestStatus.Error,
    responseStatusCode,
    responseHeaders,
    stopRequest,
    resetInitialState,
  };
};

export const useApiGateway = <TRequestPayload = any, TResponsePayload = any>(
  endpoint?: string,
  options?: {
    hideToast?: boolean;
    onStreamItem?: (data: any) => void;
    transformer?: (data: any) => string;
  },
): UseApiReturnType<TRequestPayload, TResponsePayload> => {
  const api = useApi<TRequestPayload, TResponsePayload>({
    endpoint,
    baseUrl: API_URL,
    injectHeaders: injectViewerToken,
    onStreamItem: options?.onStreamItem,
    transformer: options?.transformer,
  });

  const error = api.error;
  useToastifyErrors(options?.hideToast ? undefined : error);

  return api;
};
