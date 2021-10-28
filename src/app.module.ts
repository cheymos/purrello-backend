import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './configs/orm.config';
import { AuthModule } from './modules/auth/auth.module';
import { BoardModule } from './modules/board/board.module';
import { CardModule } from './modules/card/card.module';
import { ColumnModule } from './modules/column/column.module';
import { CommentModule } from './modules/comment/comment.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    UserModule,
    AuthModule,
    BoardModule,
    ColumnModule,
    CardModule,
    CommentModule,
  ],
})
export class AppModule {}
