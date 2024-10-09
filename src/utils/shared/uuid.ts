import { v4 } from 'uuid';

export const uuid = v4;

const UUID_V4_REGEX = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
export const isValidUuid = (text: string) => {
  return UUID_V4_REGEX.test(text);
};
