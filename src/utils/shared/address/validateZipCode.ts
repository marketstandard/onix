export const validateZip = (zipCode: string): string => {
  // Remove non-digit characters
  const cleanZIP: string = zipCode.replace(/\D/g, '');

  // Check if the clean ZIP code is empty or contains non-digit characters
  if (cleanZIP.length === 0 || isNaN(Number(cleanZIP))) {
    throw new Error('ZIP contains non numeric characters');
  }

  // Check if the ZIP code length is valid (5 digits for most countries)
  if (cleanZIP.length === 5) return cleanZIP;

  throw new Error('ZIP is wrong length');
};
