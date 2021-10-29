import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { MainValidationPipe } from '../../common/pipes/main-validation.pipe';
import { PaginateResponse } from '../../common/types/paginate-response.type';
import { getPaginateResponseOptions } from '../../utils/get-paginate-response-options.util';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CardGuard } from '../card/guards/card.guard';
import { User } from '../user/decorators/user.decorator';
import { CommentService } from './comment.service';
import { CommentDto } from './dtos/comment.dto';
import { CommentEntity } from './entities/comment.entity';

export class CommentResponse {
  @ApiProperty()
  id: number;
}

@ApiTags('Comments')
@Controller('cards/:cardId/comments')
export class CommentCardController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: 'Add comment to the card' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    type: CommentResponse,
    description: 'Added successfully',
  })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Card not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  // -----------------------------
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

  @ApiOperation({ summary: 'Get comments on the cards' })
  @ApiExtraModels(CommentEntity)
  @ApiResponse(getPaginateResponseOptions(CommentEntity))
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Card not found' })
  // ----------------------------
  @Get()
  @UseGuards(CardGuard)
  getAllCardComments(
    @Param('cardId') cardId: number,
    @User('id') userId: number,
  ): Promise<PaginateResponse<CommentEntity>> {
    return this.commentService.getAllCardComments(cardId, userId);
  }

  @ApiOperation({ summary: 'Get card comment' })
  @ApiResponse({
    status: 200,
    type: CommentEntity,
    description: 'Successful operation',
  })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Card/comment not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  // ----------------------------
  @Get(':id')
  @UseGuards(CardGuard)
  getComment(
    @Param('id') id: number,
    @User('id') userId: number,
  ): Promise<CommentEntity> {
    return this.commentService.getOne(id, userId);
  }

  @ApiOperation({ summary: 'Update card comment' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 204,
    description: 'Successfully updated',
  })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Card/comment not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  // --------------------------------
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard, CardGuard)
  @UsePipes(MainValidationPipe)
  async updateComment(
    @Param('id') id: number,
    @Body() data: CommentDto,
    @User('id') userId: number,
  ): Promise<void> {
    await this.commentService.update(id, data, userId);
  }

  @ApiOperation({ summary: 'Delete card comment' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 204,
    description: 'Successfully deleted',
  })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  // --------------------------------
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard, CardGuard)
  async deleteComment(
    @Param('id') id: number,
    @User('id') userId: number,
  ): Promise<void> {
    await this.commentService.deleteOne(id, userId);
  }
}
