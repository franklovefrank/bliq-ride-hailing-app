export interface BoltOffer {
    provider: string;
    lowPrice: number;    // For providers with price ranges
    highPrice: number;   // For providers with price ranges
    duration: number;     // Represented in minutes
    carType: string;
  }
  