import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes
} from '@nestjs/common';
import { MainValidationPipe } from '../../common/pipes/main-validation.pipe';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CardGuard } from '../card/guards/card.guard';
import { User } from '../user/decorators/user.decorator';
import { CommentService } from './comment.service';
import { CommentDto } from './dtos/comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Controller('cards/:cardId/comments')
export class CommentCardController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(AuthGuard, CardGuard)
  @UsePipes(MainValidationPipe)
  async createComment(
    @Param('cardId') cardId: number,
    @Body() data: CommentDto,
    @User('id') userId: number,
  ): Promise<CommentResponse> {
    const column = await this.commentService.create(data, cardId, userId);

    return { id: column.id };
  }

  @Get(':id')
  @UseGuards(AuthGuard, CardGuard)
  getComment(
    @Param('id') id: number,
    @User('id') userId: number,
  ): Promise<CommentEntity> {
    return this.commentService.getOne(id, userId);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard, CardGuard)
  @UsePipes(MainValidationPipe)
  async updateComment(
    @Param('id') id: number,
    @Body() data: CommentDto,
  ): Promise<void> {
    await this.commentService.update(id, data);
  }
}

export interface CommentResponse {
  id: number;
}
