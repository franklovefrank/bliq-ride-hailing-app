export interface RideOffer {
    provider: string;
    price: number;       // For providers with fixed prices
    duration: number;     // Represented in minutes
    carType: string;
  }
  