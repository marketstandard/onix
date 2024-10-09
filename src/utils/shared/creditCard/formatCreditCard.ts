export const formatCreditCard = (input: string): string => {
  const inputValue = input.replace(/\s/g, '');
  return inputValue.replace(/(.{4})(?!$)/g, '$1 ');
};
