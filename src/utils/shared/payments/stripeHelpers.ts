const FLAT_FEE = 0.3;
const VARIABLE_SALE_FEE = 0.029;

export const stripeProfitAfterFees = (revenueInDollars: number) => {
  const profit = revenueInDollars - revenueInDollars * VARIABLE_SALE_FEE - FLAT_FEE;
  return profit;
};

export function formatAmountForDisplay(amount: number, currency: string): string {
  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  });
  return numberFormat.format(amount);
}

export function formatAmountForStripe(amount: number, currency: string): number {
  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency: boolean = true;
  for (let part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false;
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}
