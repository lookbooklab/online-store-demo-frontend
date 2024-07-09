export const currencyFormat = (value: number) => {
  const currencyFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return currencyFormat.format(value);
};
