export const MILLISECOND = 1;
export const SECOND = 1000 * MILLISECOND;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
export const WEEK = 7 * DAY;
export const YEAR = 365 * DAY;
export const MINIMUM_BIRTH_YEAR = 1900;

export const MONTH_INDEX = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const MONTH_INDEX_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const DAY_INDEX_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface Params {
  startTime: string;
  endTime: string;
}
export const getTimeDifferenceMilliseconds = ({ startTime, endTime }: Params) => {
  const t1 = startTime.split(':').map((t) => parseInt(t, 10));
  const t2 = endTime.split(':').map((t) => parseInt(t, 10));
  const d1 = new Date(0, 0, 0, t1[0], t1[1]);
  const d2 = new Date(0, 0, 0, t2[0], t2[1]);
  const timeDiffMilliCeconds = d2.getTime() - d1.getTime();

  return timeDiffMilliCeconds;
};

export const convertMillisecondsToTime = (milliseconds: number) => {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  // 👇️ if seconds are greater than 30, round minutes up (optional)
  minutes = seconds >= 30 ? minutes + 1 : minutes;

  minutes = minutes % 60;

  // 👇️ If you don't want to roll hours over, e.g. 24 to 00
  // 👇️ comment (or remove) the line below
  // commenting next line gets you `24:00:00` instead of `00:00:00`
  // or `36:15:31` instead of `12:15:31`, etc.
  hours = hours % 24;

  return { hours, minutes, seconds };
};

const MINUTES_IN_A_DAY = 24 * 60;
export const getTimeOfDayAsPercent = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const percent = (hours * 60 + minutes) / MINUTES_IN_A_DAY;

  return percent;
};
