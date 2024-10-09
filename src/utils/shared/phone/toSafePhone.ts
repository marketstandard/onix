export const toSafePhone = (phoneNumber: string): string => {
  // Check if the phone number starts with a +
  const hasLeadingPlus = phoneNumber.startsWith('+');

  // Remove all non-digit characters
  let cleanedNumber = phoneNumber.replace(/\D+/g, '');

  // Prepend the + if the original number started with it
  if (hasLeadingPlus) {
    cleanedNumber = '+' + cleanedNumber;
  }

  return cleanedNumber;
};
