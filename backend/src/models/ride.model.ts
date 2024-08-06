export interface RideOffer {
    provider: string;
    price?: number;       // For providers with fixed prices
    lowPrice?: number;    // For providers with price ranges
    highPrice?: number;   // For providers with price ranges
    duration: number;     // Represented in minutes
    carType: string;
    fastest?: boolean;  // used in frontend rendering
  }
  