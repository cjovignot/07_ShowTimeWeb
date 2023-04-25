import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConcertService } from './concert.service';
import { ConcertController } from './concert.controller';
import { Concert, ConcertSchema } from './concert.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Concert.name, schema: ConcertSchema }]),
  ],
  controllers: [ConcertController],
  providers: [ConcertService],
  exports: [ConcertService],
})
export class ConcertModule {}
