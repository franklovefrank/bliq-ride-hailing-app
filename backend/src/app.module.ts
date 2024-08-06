import { Module } from '@nestjs/common';
import { RideService } from './services/ride.service';
import { UberAdapter } from './adapters/uber.adapter';
import { BoltAdapter } from './adapters/bolt.adapter';
import { RideController } from './controllers/ride.controller';

@Module({
  providers: [RideService, UberAdapter, BoltAdapter],
  controllers: [RideController],
})
export class AppModule {}


