const WALLSTREET_TIME_ZONE = 'America/New_York';
const LOCALE = 'en-US';

const convertTimestampToTime = (timestamp: string | number) => {
  const localeDateString = new Date(timestamp).toLocaleString(LOCALE, {
    timeZone: WALLSTREET_TIME_ZONE,
  });
  const splitTimeString = localeDateString.split(', ');
  const dateString = splitTimeString[0];
  const timeString = splitTimeString[1];
  const [fullTime, timeSubscript] = timeString.split(' ');
  const timeHoursMinutes = fullTime.split(':').slice(0, 2).join(':');

  return { time: timeHoursMinutes, timeSubscript, date: dateString };
};

export default convertTimestampToTime;
