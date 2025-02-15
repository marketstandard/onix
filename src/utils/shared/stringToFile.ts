export const stringToFile = async (string: string, filename: string) => {
  const blob = new Blob([string], { type: 'text/plain' });
  const file = new File([blob], filename, { type: 'text/plain' });
  return file;
};
