export enum RequestStatus {
  Idle = 'IDLE',
  Loading = 'LOADING',
  Success = 'SUCCESS',
  Error = 'ERROR',
}

export enum FetchStatus {
  Idle = 'IDLE',
  Fetching = 'FETCHING',
}

export interface ErrorResponse {
  statusCode?: number;
  message?: string;
}
