import { Module } from '@nestjs/common';
import { ColumnModule } from '../column/column.module';
import { CardColumnController } from './card-column.controller';
import { CardService } from './card.service';

@Module({
  imports: [ColumnModule],
  controllers: [CardColumnController],
  providers: [CardService],
})
export class CardModule {}
