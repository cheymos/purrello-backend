import { Module } from '@nestjs/common';
import { CardColumnController } from './card-column.controller';
import { CardService } from './card.service';

@Module({
  controllers: [CardColumnController],
  providers: [CardService],
})
export class CardModule {}
