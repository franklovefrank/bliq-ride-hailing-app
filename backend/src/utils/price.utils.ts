/**
 * Normalizes a price range into a single price value.
 * @param lowPrice - The lower bound of the price range.
 * @param highPrice - The upper bound of the price range.
 * @returns The average price if both lowPrice and highPrice are provided, otherwise returns the price itself.
 */
export function normalizePrice(lowPrice?: number, highPrice?: number): number | null {
    if (lowPrice !== undefined && highPrice !== undefined) {
      return (lowPrice + highPrice) / 2;
    }
    return lowPrice ?? highPrice ?? null;
  }
