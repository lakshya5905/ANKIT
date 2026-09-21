/**
 * Formats numeric price into Indian numbering format (Lakh / Crore)
 */
export function formatPrice(price: number): string {
  if (isNaN(price) || price <= 0) return 'Price on Request';

  if (price >= 10000000) {
    const cr = price / 10000000;
    return `₹${cr % 1 === 0 ? cr : cr.toFixed(2)} Cr`;
  }
  if (price >= 100000) {
    const lakh = price / 100000;
    return `₹${lakh % 1 === 0 ? lakh : lakh.toFixed(2)} Lakh`;
  }
  return `₹${price.toLocaleString('en-IN')}`;
}

/**
 * Converts Square Feet to Square Yards (Gaj)
 * 1 Gaj = 9 Sq. Ft.
 */
export function sqFtToGaj(sqFt: number): number {
  return Math.round((sqFt / 9) * 10) / 10;
}

export function formatArea(sqFt: number, includeGaj: boolean = true): string {
  if (!sqFt || sqFt <= 0) return 'N/A';
  const gaj = sqFtToGaj(sqFt);
  if (includeGaj) {
    return `${sqFt.toLocaleString('en-IN')} sq.ft (${gaj} Gaj)`;
  }
  return `${sqFt.toLocaleString('en-IN')} sq.ft`;
}

export function formatDate(isoString: string): string {
  try {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  } catch {
    return isoString;
  }
}
