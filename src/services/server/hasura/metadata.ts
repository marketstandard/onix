import {
  RetryConfig,
  SCHEDULED_EVENT_CREATE_TYPE,
  ScheduledEventCreatePayload,
  ScheduledEventCreateResponse,
} from 'constants/hasura';
import ApiService from 'services/server/ApiService';

const client = new ApiService({
  baseUrl: process.env.HASURA_METADATA_API,
  headers: {
    'Content-Type': 'application/json',
    'X-Hasura-Role': 'admin',
    'X-Hasura-Admin-Secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET!,
  },
});

type CreateScheduledEvent<T = any> = (params: {
  payload: T;
  eventScheduleTime: string;
  retryConfig?: RetryConfig;
  comment?: string;
  webhook: string;
}) => Promise<ScheduledEventCreateResponse>;
export const createScheduledEvent: CreateScheduledEvent = async ({
  payload,
  eventScheduleTime,
  retryConfig,
  comment,
  webhook,
}) => {
  const createPayload: ScheduledEventCreatePayload = {
    type: SCHEDULED_EVENT_CREATE_TYPE,
    args: {
      webhook,
      schedule_at: eventScheduleTime,
      payload: payload,
      headers: [
        {
          name: 'webhook-secret',
          value: process.env.HASURA_WEBHOOK_SECRET!,
        },
      ],
      retry_conf: retryConfig,
      comment,
    },
  };

  const response: ScheduledEventCreateResponse = await client.post('', {
    payload: createPayload,
  });

  return response;
};
