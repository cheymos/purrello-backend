import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  UsePipes
} from '@nestjs/common';
import { MainValidationPipe } from '../../common/pipes/main-validation.pipe';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CardGuard } from '../card/guards/card.guard';
import { User } from '../user/decorators/user.decorator';
import { CommentService } from './comment.service';
import { CommentDto } from './dtos/comment.dto';

@Controller('cards/:cardId/comments')
export class CommentCardController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(AuthGuard, CardGuard)
  @UsePipes(MainValidationPipe)
  async createComment(
    @Param('cardId') cardId: number,
    @Body() data: CommentDto,
    @User('id') userId: number
  ): Promise<CommentResponse> {
    const column = await this.commentService.create(data, cardId, userId);

    return { id: column.id };
  }
}

export interface CommentResponse {
  id: number;
}
