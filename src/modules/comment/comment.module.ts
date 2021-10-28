import { Module } from '@nestjs/common';
import { CommentCardController } from './comment-card.controller';
import { CommentService } from './comment.service';

@Module({
  controllers: [CommentCardController],
  providers: [CommentService],
})
export class CommentModule {}
