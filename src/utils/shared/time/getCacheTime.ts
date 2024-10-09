/**
 * @example
 * getCacheTimeInMs(24) --> 24 hrs
 * getCacheTimeInMs(24 * 5) --> 5 days
 */
const getCacheTimeInMs = (hours: number) => 1000 * 60 * 60 * hours;

export default getCacheTimeInMs;
