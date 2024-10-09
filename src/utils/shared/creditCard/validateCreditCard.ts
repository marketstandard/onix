export const validateCreditCard = (cardNumber: string): string => {
  // sanitize the card
  const cleanCardNumber: string = cardNumber.replace(/[ -]/g, '');

  if (cleanCardNumber.length === 0 || isNaN(Number(cleanCardNumber))) {
    throw new Error('Empty or Non Digit characters');
  }

  if (cleanCardNumber.length < 13 || cleanCardNumber.length > 19) {
    throw new Error('Invalid length');
  }

  const digits: number[] = cleanCardNumber.split('').reverse().map(Number);

  // luhn algorithm
  let sum: number = 0;
  for (let i: number = 0; i < digits.length; i++) {
    let digit: number = digits[i];
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }
  const isValid = sum % 10 === 0;

  if (!isValid) throw new Error('Fails Luhn Algorithm');

  return cleanCardNumber;
};
