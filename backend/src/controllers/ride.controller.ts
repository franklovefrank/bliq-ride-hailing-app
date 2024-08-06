import { Controller, Get, Query, InternalServerErrorException } from '@nestjs/common';
import { RideService } from '../services/ride.service';
import { RideOffer } from '../models/response.model';

@Controller('api')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Get('best-rides')
  async getBestRides(
    @Query('provider') provider?: string,
    @Query('carType') carType?: string,
  ): Promise<RideOffer[]> {
    try {
      if (provider && carType) {
        return await this.rideService.getBestOfferByProviderAndType(provider, carType);
      }

      if (provider) {
        return await this.rideService.getBestOfferByProvider(provider);
      }

      if (carType) {
        return await this.rideService.getBestOfferByType(carType);
      }

      return await this.rideService.getBestOffersAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to get best rides');
    }
  }
}
