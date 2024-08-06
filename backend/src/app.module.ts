import { Module } from '@nestjs/common';
import { UberAdapter } from './adapters/uber.adapter';
import { BoltAdapter } from './adapters/bolt.adapter';

@Module({
  providers: [UberAdapter, BoltAdapter],
  controllers: [],
})
export class AppModule {}


