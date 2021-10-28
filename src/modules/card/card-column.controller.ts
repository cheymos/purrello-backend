import {
  Body,
  Controller, Param,
  Post,
  UseGuards,
  UsePipes
} from '@nestjs/common';
import { MainValidationPipe } from '../../common/pipes/main-validation.pipe';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ColumnGuard } from '../column/guards/column.guard';
import { CardService } from './card.service';
import { CardDto } from './dtos/card.dto';

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
}

export interface CardResponse {
  id: number;
}
