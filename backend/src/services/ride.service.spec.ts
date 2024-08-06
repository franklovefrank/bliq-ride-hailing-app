import { Test, TestingModule } from '@nestjs/testing';
import { RideService } from './ride.service';
import { UberAdapter } from '../adapters/uber.adapter';
import { BoltAdapter } from '../adapters/bolt.adapter';
import { RideOffer } from '../models/response.model'; // Ensure this matches your RideOffer definition

describe('RideService', () => {
  let service: RideService;
  let uberAdapter: UberAdapter;
  let boltAdapter: BoltAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RideService,
        {
          provide: UberAdapter,
          useValue: {
            fetchOffers: jest.fn(),
          },
        },
        {
          provide: BoltAdapter,
          useValue: {
            fetchOffers: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RideService>(RideService);
    uberAdapter = module.get<UberAdapter>(UberAdapter);
    boltAdapter = module.get<BoltAdapter>(BoltAdapter);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fetchAllOffers', () => {
    it('should return combined and sorted ride offers', async () => {
      const mockUberOffers: RideOffer[] = [
        { provider: 'Uber', price: 20, duration: 15, carType: 'Economy' },
      ];
      const mockBoltOffers: RideOffer[] = [
        { provider: 'Bolt', price: 20, duration: 10, carType: 'Luxury' }, // Update mock data
      ];

      jest.spyOn(uberAdapter, 'fetchOffers').mockResolvedValue(mockUberOffers);
      jest.spyOn(boltAdapter, 'fetchOffers').mockResolvedValue(mockBoltOffers);

      const result = await service['fetchAllOffers']();
      expect(result).toEqual([
        { provider: 'Uber', price: 20, duration: 15, carType: 'Economy' },
        { provider: 'Bolt', price: 20, duration: 10, carType: 'Luxury' }, // Update expected result
      ]);
    });

    it('should throw an error if fetching offers fails', async () => {
      jest.spyOn(uberAdapter, 'fetchOffers').mockRejectedValue(new Error('Error fetching Uber offers'));
      jest.spyOn(boltAdapter, 'fetchOffers').mockRejectedValue(new Error('Error fetching Bolt offers'));

      await expect(service['fetchAllOffers']()).rejects.toThrow('Failed to fetch offers from providers');
    });
  });
});
