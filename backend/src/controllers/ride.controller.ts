import { Controller, Get, Query } from '@nestjs/common';
import { RideService } from '../services/ride.service';
import { RideOffer } from '../models/ride.model';

@Controller('api')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Get('best-rides')
  async getBestRides(
    @Query('provider') provider?: string,
    @Query('carType') carType?: string,
  ): Promise<RideOffer[]> {
    console.log('Query parameters received:', { provider, carType });

    if (provider && carType) {
      console.log('Fetching offers by provider and car type');
      return this.rideService.getBestOfferByProviderAndType(provider, carType);
    }

    if (provider) {
      console.log('Fetching offers by provider');
      return this.rideService.getBestOfferByProvider(provider);
    }

    if (carType) {
      console.log('Fetching offers by car type');
      return this.rideService.getBestOfferByType(carType);
    }

    console.log('Fetching all offers');
    return this.rideService.getBestOffersAll();
  }
}
