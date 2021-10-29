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
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { MainValidationPipe } from '../../common/pipes/main-validation.pipe';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ColumnGuard } from '../column/guards/column.guard';
import { User } from '../user/decorators/user.decorator';
import { CardService } from './card.service';
import { CardDto } from './dtos/card.dto';
import { CardEntity } from './entities/card.entity';

export class CardResponse {
  @ApiProperty()
  id: number;
}

@ApiTags('Cards')
@Controller('boards/:boardId/columns/:columnId/cards')
export class CardColumnController {
  constructor(private readonly cardService: CardService) {}

  @ApiOperation({ summary: 'Create a card' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    type: CardResponse,
    description: 'Successfully created',
  })
  @ApiResponse({ status: 404, description: 'Column not found' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  //-----------------------------------------
  @Post()
  @UseGuards(AuthGuard, ColumnGuard)
  @UsePipes(MainValidationPipe)
  async createCard(
    @Body() data: CardDto,
    @Param('columnId') columnId: number,
    @Param('boardId') boardId: number,
    @User('id') userId: number,
  ): Promise<CardResponse> {
    const card = await this.cardService.create(data, columnId, boardId, userId);

    return { id: card.id };
  }

  @ApiOperation({ summary: 'Get card by id' })
  @ApiResponse({
    status: 200,
    type: CardEntity,
    description: 'Successful operation',
  })
  @ApiResponse({
    status: 403,
    description: 'Access denied (if board is private and you are not owner)',
  })
  @ApiResponse({ status: 404, description: 'Card/column not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  //--------------------------------------------
  @Get(':id')
  @UseGuards(ColumnGuard)
  getCard(
    @Param('id') id: number,
    @User('id') userId: number,
  ): Promise<CardEntity> {
    return this.cardService.getOne(id, userId);
  }

  @ApiOperation({ summary: 'Update card by id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'Successfully updated' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Card/column not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  // -------------------------------------------
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard, ColumnGuard)
  @UsePipes(MainValidationPipe)
  async updateCard(
    @Param('id') id: number,
    @Body() data: CardDto,
    @User('id') userId: number,
  ): Promise<void> {
    await this.cardService.update(id, data, userId);
  }

  @ApiOperation({ summary: 'Delete card by id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'Successful operation' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  //--------------------------------------------
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard, ColumnGuard)
  async deleteCard(
    @Param('id') id: number,
    @User('id') userId: number,
  ): Promise<void> {
    await this.cardService.deleteOne(id, userId);
  }
}
