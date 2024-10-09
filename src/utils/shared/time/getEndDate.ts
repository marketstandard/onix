import convertDayToMillisecond from 'utils/shared/time/convertDayToMillisecond';

const getEndDate = (days: number) => {
  return new Date(Date.now() + convertDayToMillisecond(days));
};

export default getEndDate;
