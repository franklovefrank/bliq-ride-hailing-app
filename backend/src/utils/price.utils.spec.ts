import { normalizePrice } from './price.utils'; 

describe('normalizePrice', () => {
  
  it('should return the average of lowPrice and highPrice when both are provided', () => {
    const lowPrice = 10;
    const highPrice = 20;
    const result = normalizePrice(lowPrice, highPrice);
    expect(result).toBe(15); // (10 + 20) / 2
  });

  it('should return lowPrice when only lowPrice is provided', () => {
    const lowPrice = 10;
    const result = normalizePrice(lowPrice);
    expect(result).toBe(10);
  });

  it('should return highPrice when only highPrice is provided', () => {
    const highPrice = 20;
    const result = normalizePrice(undefined, highPrice);
    expect(result).toBe(20);
  });

});