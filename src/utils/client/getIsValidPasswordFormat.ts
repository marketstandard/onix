export const MINIMUM_PASSWORD_LENGTH = 8;

export const getIsValidPasswordFormat = (password: string) =>
  password.length >= MINIMUM_PASSWORD_LENGTH;
