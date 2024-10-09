import { GetViewerByIdQuery, SubscriptionStatusesEnum } from 'types/generated/server';

export const hasValidSubscription = (
  viewer: GetViewerByIdQuery['usersByPk'],
  serviceId: string,
) => {
  return viewer?.subscriptions.some(
    (subscription) =>
      subscription.status === SubscriptionStatusesEnum.Active ||
      subscription.status === SubscriptionStatusesEnum.Trialing,
  );
};
