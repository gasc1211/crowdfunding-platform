export function formatAmountForDisplay(amount: number, currency: string): string {
  const numberFormat = new Intl.NumberFormat(['es-HN'], {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol"
  });

  return numberFormat.format(amount);
}

export function formatAmountForStripe(amount: number, currency: string): number {
  const numberFormat = new Intl.NumberFormat(['es-HN'], {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol"
  });

  const parts: Intl.NumberFormatPart[] = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency: boolean = true;

  parts.forEach((part: Intl.NumberFormatPart) => {
    if (part.type === "decimal") {
      zeroDecimalCurrency = false;
    }
  });

  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}