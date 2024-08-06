import { Injectable } from '@nestjs/common';
import { RideOffer } from '../models/ride.model';
import { normalizePrice } from '../utils/price.utils'

@Injectable()
export class BoltAdapter {
  async fetchOffers(): Promise<RideOffer[]> {
    const boltOffers = [
      {
        provider: 'Bolt',
        lowPrice: 12,
        highPrice: 18,
        duration: 12, 
        carType: 'economy',
      },
      {
        provider: 'Bolt',
        lowPrice: 22,
        highPrice: 30,
        duration: 22, 
        carType: 'luxury',
      },
      {
        provider: 'Bolt',
        lowPrice: 10,
        highPrice: 15,
        duration: 10, 
        carType: 'economy',
      },
      {
        provider: 'Bolt',
        lowPrice: 25,
        highPrice: 35,
        duration: 18, 
        carType: 'suv',
      },
      {
        provider: 'Bolt',
        lowPrice: 28,
        highPrice: 40,
        duration: 25, 
        carType: 'luxury',
      },
      {
        provider: 'Bolt',
        lowPrice: 15,
        highPrice: 22,
        duration: 14, 
        carType: 'economy',
      },
      {
        provider: 'Bolt',
        lowPrice: 18,
        highPrice: 24,
        duration: 16, 
        carType: 'economy',
      },
      {
        provider: 'Bolt',
        lowPrice: 35,
        highPrice: 50,
        duration: 30, 
        carType: 'luxury',
      },
      {
        provider: 'Bolt',
        lowPrice: 20,
        highPrice: 28,
        duration: 20, 
        carType: 'economy',
      },
      {
        provider: 'Bolt',
        lowPrice: 45,
        highPrice: 60,
        duration: 35, 
        carType: 'suv',
      },
    ];

    return boltOffers.map(offer => ({
      ...offer,
      price: normalizePrice(offer.lowPrice, offer.highPrice),
    }));
  }
}
