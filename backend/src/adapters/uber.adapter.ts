import { Injectable } from '@nestjs/common';
import { RideOffer } from '../models/response.model';

@Injectable()
export class UberAdapter {
  async fetchOffers(): Promise<RideOffer[]> {
    return [
      {
        provider: 'Uber',
        price: 15,
        duration: 14, 
        carType: 'Economy',
      },
      {
        provider: 'Uber',
        price: 25,
        duration: 22, 
        carType: 'Economy',
      },
      {
        provider: 'Uber',
        price: 18,
        duration: 12, 
        carType: 'Economy',
      },
      {
        provider: 'Uber',
        price: 35,
        duration: 18, 
        carType: 'SUV',
      },
      {
        provider: 'Uber',
        price: 45,
        duration: 25, 
        carType: 'Luxury',
      },
      {
        provider: 'Uber',
        price: 20,
        duration: 16, 
        carType: 'Economy',
      },
      {
        provider: 'Uber',
        price: 30,
        duration: 20, 
        carType: 'Economy',
      },
      {
        provider: 'Uber',
        price: 40,
        duration: 28, 
        carType: 'Luxury',
      },
      {
        provider: 'Uber',
        price: 22,
        duration: 18, 
        carType: 'Economy',
      },
      {
        provider: 'Uber',
        price: 55,
        duration: 35, 
        carType: 'SUV',
      },
    ];
  }
}
