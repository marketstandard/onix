const centsToDollars = (cents: number | null) => (cents === null ? 0 : cents / 100);

export default centsToDollars;
