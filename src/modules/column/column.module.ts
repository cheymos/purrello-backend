import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { BoardModule } from '../board/board.module';
import { ColumnBoardController } from './column-board.controller';
import { ColumnService } from './column.service';
import { ColumnEntity } from './entities/column.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnEntity]), AuthModule, BoardModule],
  controllers: [ColumnBoardController],
  providers: [ColumnService],
})
export class ColumnModule {}
