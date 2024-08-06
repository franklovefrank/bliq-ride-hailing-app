import { Injectable } from '@nestjs/common';
import { RideOffer } from '../models/ride.model';
import { UberAdapter } from 'src/adapters/uber.adapter';
import { BoltAdapter } from 'src/adapters/bolt.adapter';

@Injectable()
export class RideService {
  constructor(
    private readonly uberAdapter: UberAdapter,
    private readonly boltAdapter: BoltAdapter,
  ) {}

  private async fetchAllOffers(): Promise<RideOffer[]> {
    const [uberOffers, boltOffers] = await Promise.all([
      this.uberAdapter.fetchOffers(),
      this.boltAdapter.fetchOffers(),
    ]);
  
    const combinedOffers = [...uberOffers, ...boltOffers];
      combinedOffers.sort((a, b) => a.price - b.price);
  
    return combinedOffers;
  }
  
  async getBestOffersAll(): Promise<RideOffer[]> {
    return this.fetchAllOffers();
  }

  async getBestOfferByProvider(provider: string): Promise<RideOffer[]> {
    const allOffers = await this.fetchAllOffers();
    return allOffers.filter(offer => offer.provider === provider);
  }

  async getBestOfferByType(carType: string): Promise<RideOffer[]> {
    const allOffers = await this.fetchAllOffers();
    return allOffers.filter(offer => offer.carType === carType);
  }

  async getBestOfferByProviderAndType(provider: string, carType: string): Promise<RideOffer[]> {
    const allOffers = await this.fetchAllOffers();
    return allOffers.filter(
      offer => offer.provider === provider && offer.carType === carType,
    );
  }
}
