import { Injectable } from '@nestjs/common';
import { UberAdapter } from '../adapters/uber.adapter';
import { BoltAdapter } from '../adapters/bolt.adapter';
import { RideOffer } from '../models/ride.model';

@Injectable()
export class RideService {
  constructor(
    private readonly uberAdapter: UberAdapter,
    private readonly boltAdapter: BoltAdapter,
  ) {}

  async getBestOffers(): Promise<RideOffer[]> {
    const uberOffers = await this.uberAdapter.fetchOffers();
    const boltOffers = await this.boltAdapter.fetchOffers();

    const allOffers = [...uberOffers, ...boltOffers];
    return this.getBestOffersByProviderAndType(allOffers);
  }

  private getBestOffersByProviderAndType(offers: RideOffer[]): RideOffer[] {
    const bestOffers = new Map<string, RideOffer>();
  
    offers.forEach(offer => {
      const key = `${offer.provider}-${offer.carType}`;
  
      if (!bestOffers.has(key) || offer.price < bestOffers.get(key)!.price) {
        bestOffers.set(key, offer);
      }
    });
    return Array.from(bestOffers.values());
  }
  
  async getBestOfferByProvider(provider: string): Promise<RideOffer[]> {
    let offers: RideOffer[] = [];
    
    if (provider === 'uber') {
      offers = await this.uberAdapter.fetchOffers();
    } else if (provider === 'bolt') {
      offers = await this.boltAdapter.fetchOffers();
    }

    return this.getBestOffersByProviderAndType(offers);
  }

  async getBestOfferByType(carType: string): Promise<RideOffer[]> {
    const uberOffers = await this.uberAdapter.fetchOffers();
    const boltOffers = await this.boltAdapter.fetchOffers();

    const allOffers = [...uberOffers, ...boltOffers];
    const filteredOffers = allOffers.filter(offer => offer.carType === carType);
    return this.getBestOffersByProviderAndType(filteredOffers);
  }
}
