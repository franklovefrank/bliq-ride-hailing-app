import { Injectable } from '@nestjs/common';
import { RideOffer } from '../models/ride.model';

@Injectable()
export class UberAdapter {
  async fetchOffers(): Promise<RideOffer[]> {
    return [
      {
        provider: 'Uber',
        price: 15,
        duration: 14, 
        carType: 'economy',
      },
      {
        provider: 'Uber',
        price: 25,
        duration: 22, 
        carType: 'economy',
      },
      {
        provider: 'Uber',
        price: 18,
        duration: 12, 
        carType: 'economy',
      },
      {
        provider: 'Uber',
        price: 35,
        duration: 18, 
        carType: 'suv',
      },
      {
        provider: 'Uber',
        price: 45,
        duration: 25, 
        carType: 'luxury',
      },
      {
        provider: 'Uber',
        price: 20,
        duration: 16, 
        carType: 'economy',
      },
      {
        provider: 'Uber',
        price: 30,
        duration: 20, 
        carType: 'economy',
      },
      {
        provider: 'Uber',
        price: 40,
        duration: 28, 
        carType: 'luxury',
      },
      {
        provider: 'Uber',
        price: 22,
        duration: 18, 
        carType: 'economy',
      },
      {
        provider: 'Uber',
        price: 55,
        duration: 35, 
        carType: 'suv',
      },
    ];
  }
}
