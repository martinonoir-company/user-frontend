/**
 * Price formatting utilities for dual-currency display.
 * All prices from the API are in minor units (kobo for NGN, cents for USD).
 *
 * The storefront always uses RETAIL prices.
 * Wholesale prices are only used in POS/Admin contexts.
 */

export function formatPrice(minorUnits: number | string, currency: string = 'NGN'): string {
  const amount = typeof minorUnits === 'string' ? parseInt(minorUnits, 10) : minorUnits;

  if (currency === 'USD') {
    return `$${(amount / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  // NGN — no decimals (convention in Nigeria)
  return `₦${(amount / 100).toLocaleString('en-NG', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function getVariantPrice(variant: { retailPriceNgn: string; retailPriceUsd: string }, currency: string = 'NGN'): string {
  if (currency === 'USD') {
    return formatPrice(variant.retailPriceUsd, 'USD');
  }
  return formatPrice(variant.retailPriceNgn, 'NGN');
}

export function getVariantPriceMinor(variant: { retailPriceNgn: string; retailPriceUsd: string }, currency: string = 'NGN'): number {
  if (currency === 'USD') {
    return parseInt(variant.retailPriceUsd, 10);
  }
  return parseInt(variant.retailPriceNgn, 10);
}

/**
 * Get the cheapest variant retail price for display on product cards.
 */
export function getStartingPrice(
  variants: Array<{ retailPriceNgn: string; retailPriceUsd: string }>,
  currency: string = 'NGN',
): string {
  if (variants.length === 0) return '—';

  const prices = variants.map((v) =>
    currency === 'USD' ? parseInt(v.retailPriceUsd, 10) : parseInt(v.retailPriceNgn, 10),
  );

  const min = Math.min(...prices);
  const prefix = variants.length > 1 ? 'From ' : '';
  return `${prefix}${formatPrice(min, currency)}`;
}
