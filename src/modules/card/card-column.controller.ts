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
import { ColumnGuard } from '../column/guards/column.guard';
import { User } from '../user/decorators/user.decorator';
import { CardService } from './card.service';
import { CardDto } from './dtos/card.dto';
import { CardEntity } from './entities/card.entity';

@Controller('boards/:boardId/columns/:columnId/cards')
export class CardColumnController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @UseGuards(AuthGuard, ColumnGuard)
  @UsePipes(MainValidationPipe)
  async createCard(
    @Body() data: CardDto,
    @Param('columnId') columnId: number,
  ): Promise<CardResponse> {
    const card = await this.cardService.create(data, columnId);

    return { id: card.id };
  }

  @Get(':id')
  @UseGuards(AuthGuard, ColumnGuard)
  getColumn(
    @Param('id') id: number,
    @User('id') userId: number,
  ): Promise<CardEntity> {
    return this.cardService.getOne(id, userId);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard, ColumnGuard)
  async updateColumn(
    @Param('id') id: number,
    @Body() data: CardDto,
  ): Promise<void> {
    await this.cardService.update(id, data);
  }
}

export interface CardResponse {
  id: number;
}
