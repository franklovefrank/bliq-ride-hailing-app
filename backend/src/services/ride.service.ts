import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RideOffer } from '../models/response.model';
import { UberAdapter } from 'src/adapters/uber.adapter';
import { BoltAdapter } from 'src/adapters/bolt.adapter';

@Injectable()
export class RideService {
  constructor(
    private readonly uberAdapter: UberAdapter,
    private readonly boltAdapter: BoltAdapter,
  ) {}

  private async fetchAllOffers(): Promise<RideOffer[]> {
    try {
      const [uberOffers, boltOffers] = await Promise.all([
        this.uberAdapter.fetchOffers(),
        this.boltAdapter.fetchOffers(),
      ]);
  
      const combinedOffers = [...uberOffers, ...boltOffers];
      combinedOffers.sort((a, b) => a.price - b.price);
  
      return combinedOffers;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch offers from providers');
    }
  }
  
  async getBestOffersAll(): Promise<RideOffer[]> {
    try {
      return await this.fetchAllOffers();
    } catch (error) {
      throw new InternalServerErrorException('Failed to get the best offers');
    }
  }

  async getBestOfferByProvider(provider: string): Promise<RideOffer[]> {
    try {
      const allOffers = await this.fetchAllOffers();
      return allOffers.filter(offer => offer.provider === provider);
    } catch (error) {
      throw new InternalServerErrorException('Failed to get the best offer by provider');
    }
  }

  async getBestOfferByType(carType: string): Promise<RideOffer[]> {
    try {
      const allOffers = await this.fetchAllOffers();
      return allOffers.filter(offer => offer.carType === carType);
    } catch (error) {
      throw new InternalServerErrorException('Failed to get the best offer by type');
    }
  }

  async getBestOfferByProviderAndType(provider: string, carType: string): Promise<RideOffer[]> {
    try {
      const allOffers = await this.fetchAllOffers();
      return allOffers.filter(
        offer => offer.provider === provider && offer.carType === carType,
      );
    } catch (error) {
      throw new InternalServerErrorException('Failed to get the best offer by provider and type');
    }
  }
}
