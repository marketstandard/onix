import { InvoiceStatusesEnum } from 'types/generated/server';

const mapStatusToEnum = {
  draft: InvoiceStatusesEnum.Draft,
  open: InvoiceStatusesEnum.Open,
  paid: InvoiceStatusesEnum.Paid,
  uncollectible: InvoiceStatusesEnum.Uncollectible,
  void: InvoiceStatusesEnum.Void,
};

export const stripeInvoiceStatusToEnum = (status: string) => {
  return mapStatusToEnum[status];
};
