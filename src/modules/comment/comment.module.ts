import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CardModule } from '../card/card.module';
import { CommentCardController } from './comment-card.controller';
import { CommentService } from './comment.service';
import { CommentEntity } from './entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity]), AuthModule, CardModule],
  controllers: [CommentCardController],
  providers: [CommentService],
})
export class CommentModule {}
