import { Test, TestingModule } from '@nestjs/testing';
import { RideController } from './ride.controller';
import { RideService } from '../services/ride.service';
import { InternalServerErrorException } from '@nestjs/common';
import { RideOffer } from '../models/ride.model';

describe('RideController', () => {
  let controller: RideController;
  let service: RideService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RideController],
      providers: [
        {
          provide: RideService,
          useValue: {
            getBestOfferByProviderAndType: jest.fn(),
            getBestOfferByProvider: jest.fn(),
            getBestOfferByType: jest.fn(),
            getBestOffersAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RideController>(RideController);
    service = module.get<RideService>(RideService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getBestRides', () => {
    it('should return best offers by provider and car type', async () => {
      const mockOffers: RideOffer[] = [
        { provider: 'Uber', price: 20, duration: 15, carType: 'Economy' },
      ];

      jest.spyOn(service, 'getBestOfferByProviderAndType').mockResolvedValue(mockOffers);

      const result = await controller.getBestRides('Uber', 'Economy');
      expect(result).toEqual(mockOffers);
      expect(service.getBestOfferByProviderAndType).toHaveBeenCalledWith('Uber', 'Economy');
    });

    it('should return best offers by provider', async () => {
      const mockOffers: RideOffer[] = [
        { provider: 'Uber', price: 20, duration: 15, carType: 'Economy' },
      ];

      jest.spyOn(service, 'getBestOfferByProvider').mockResolvedValue(mockOffers);

      const result = await controller.getBestRides('Uber');
      expect(result).toEqual(mockOffers);
      expect(service.getBestOfferByProvider).toHaveBeenCalledWith('Uber');
    });

    it('should return best offers by car type', async () => {
      const mockOffers: RideOffer[] = [
        { provider: 'Bolt', lowPrice: 15, highPrice: 25, duration: 10, carType: 'Luxury' },
      ];

      jest.spyOn(service, 'getBestOfferByType').mockResolvedValue(mockOffers);

      const result = await controller.getBestRides(undefined, 'Luxury');
      expect(result).toEqual(mockOffers);
      expect(service.getBestOfferByType).toHaveBeenCalledWith('Luxury');
    });

    it('should return all best offers', async () => {
      const mockOffers: RideOffer[] = [
        { provider: 'Uber', price: 20, duration: 15, carType: 'Economy' },
        { provider: 'Bolt', lowPrice: 15, highPrice: 25, duration: 10, carType: 'Luxury' },
      ];

      jest.spyOn(service, 'getBestOffersAll').mockResolvedValue(mockOffers);

      const result = await controller.getBestRides();
      expect(result).toEqual(mockOffers);
      expect(service.getBestOffersAll).toHaveBeenCalled();
    });

    it('should throw an InternalServerErrorException if service throws an error', async () => {
      jest.spyOn(service, 'getBestOfferByProvider').mockRejectedValue(new Error('Service Error'));

      await expect(controller.getBestRides('Uber')).rejects.toThrow(InternalServerErrorException);
    });
  });
});
