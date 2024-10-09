export const SCHEDULED_EVENT_CREATE_TYPE = 'create_scheduled_event';
export const SCHEDULED_EVENT_DELETE_TYPE = 'delete_scheduled_event';

export interface RetryConfig {
  num_retries?: number;
  retry_interval_seconds?: number;
  timeout_seconds?: number;
  tolerance_seconds?: number;
}

export interface EventTriggerPayload<T = any> {
  event: {
    session_variables: { [x: string]: string };
    op: 'INSERT' | 'UPDATE' | 'DELETE' | 'MANUAL';
    data: {
      old: T | null;
      new: T | null;
    };
  };
  created_at: string;
  id: string;
  delivery_info: {
    max_retries: number;
    current_retry: number;
  };
  trigger: {
    name: string;
  };
  table: {
    schema: string;
    name: string;
  };
}

export interface ScheduledEventCreatePayload<T = any> {
  type: typeof SCHEDULED_EVENT_CREATE_TYPE;
  args: {
    webhook: string;
    schedule_at: string;
    payload?: T | null;
    headers?: {
      name: string;
      value: string;
    }[];
    retry_conf?: RetryConfig;
    comment?: string;
  };
}

export interface ScheduledEventCreateResponse {
  message: string;
  event_id?: string | null;
}

export interface ScheduledEventDeletePayload {
  type: typeof SCHEDULED_EVENT_DELETE_TYPE;
  args: {
    type: 'one_off' | 'cron';
    event_id: string;
  };
}

export interface ScheduledEventWebhookPayload<T = any> {
  created_at: string;
  scheduled_time: string;
  payload?: T | null;
  comment?: string;
}
