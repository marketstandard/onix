import { SubscriptionStatusesEnum } from 'types/generated/server';

const mapStatusToEnum = {
  active: SubscriptionStatusesEnum.Active,
  canceled: SubscriptionStatusesEnum.Canceled,
  incomplete: SubscriptionStatusesEnum.Incomplete,
  incomplete_expired: SubscriptionStatusesEnum.IncompleteExpired,
  past_due: SubscriptionStatusesEnum.PastDue,
  trialing: SubscriptionStatusesEnum.Trialing,
  unpaid: SubscriptionStatusesEnum.Unpaid,
};

export const getEnumForStatus = (newStatus: string) => {
  return mapStatusToEnum[newStatus];
};
