export const toPostgresArray = (arr: string[]) => {
  return `{${arr.join(',')}}`;
};

export const fromPostgresArray = (arrayString: string) => {
  const arrayContent = arrayString.replace('{', '').replace('}', '');
  return arrayContent.split(',').map((item) => item.trim());
};
