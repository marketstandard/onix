export const trimNonDigits = (value: string) => {
  return value.replace(/[^\d]/g, '');
};

const MIN_NUMBER_OF_DIGITS = 10;
const MAX_NUMBER_OF_DIGITS = 11;
export const isValidPhoneFormat = (phone: string) => {
  const trimmedNumber = trimNonDigits(phone);
  return (
    trimmedNumber.length >= MIN_NUMBER_OF_DIGITS && trimmedNumber.length <= MAX_NUMBER_OF_DIGITS
  );
};
