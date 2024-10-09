export const validateCVC = (cvc: string): string => {
  const cleanCVC: string = cvc.replace(/\D/g, '');

  if (cleanCVC.length === 0 || isNaN(Number(cleanCVC))) {
    throw new Error('Empty or contains non numeric characters.');
  }

  if (cleanCVC.length === 3 || cleanCVC.length === 4) return cleanCVC;

  throw new Error('CVC invalid length');
};
