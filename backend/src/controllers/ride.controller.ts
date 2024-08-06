import { Controller, Get, Query } from '@nestjs/common';
import { RideService } from '../services/ride.service';
import { RideOffer } from '../models/ride.model';

@Controller('api')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Get('best-rides')
  async getBestRides(): Promise<RideOffer[]> {
    return this.rideService.getBestOffers();
  }

  @Get('best-rides-by-provider')
  async getBestRidesByProvider(@Query('provider') provider: string): Promise<RideOffer[]> {
    if (!provider) {
      throw new Error('Provider query parameter is required');
    }
    return this.rideService.getBestOfferByProvider(provider);
  }

  @Get('best-rides-by-type')
  async getBestRidesByType(@Query('carType') carType: string): Promise<RideOffer[]> {
    if (!carType) {
      throw new Error('CarType query parameter is required');
    }
    return this.rideService.getBestOfferByType(carType);
  }
}
