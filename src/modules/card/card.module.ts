import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { BoardModule } from '../board/board.module';
import { ColumnModule } from '../column/column.module';
import { CardColumnController } from './card-column.controller';
import { CardService } from './card.service';
import { CardEntity } from './entities/card.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CardEntity]),
    AuthModule,
    ColumnModule,
    BoardModule,
  ],
  controllers: [CardColumnController],
  providers: [CardService],
  exports: [CardService],
})
export class CardModule {}
