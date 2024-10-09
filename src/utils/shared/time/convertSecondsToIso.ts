const convertSecondsToIso = (timestamp: number | null) => {
  if (!timestamp) {
    return '';
  }

  const millis = timestamp * 1000;
  return new Date(millis).toISOString();
};

export default convertSecondsToIso;
