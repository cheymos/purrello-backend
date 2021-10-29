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
import { MainValidationPipe } from '../../common/pipes/main-validation.pipe';
import { PaginateResponse } from '../../common/types/paginate-response.type';
import { AuthGuard } from '../auth/guards/auth.guard';
import { BoardGuard } from '../board/guards/board.guard';
import { User } from '../user/decorators/user.decorator';
import { ColumnService } from './column.service';
import { ColumnDto } from './dtos/column.dto';
import { ColumnEntity } from './entities/column.entity';

@Controller('boards/:boardId/columns')
export class ColumnBoardController {
  constructor(private readonly columnService: ColumnService) {}

  @Post()
  @UseGuards(AuthGuard, BoardGuard)
  @UsePipes(MainValidationPipe)
  async createColumn(
    @Param('boardId') boardId: number,
    @Body() data: ColumnDto,
  ): Promise<ColumnResponse> {
    const column = await this.columnService.create(data, boardId);

    return { id: column.id };
  }

  @Get()
  @UseGuards(AuthGuard, BoardGuard)
  getBoardColumnsWithCards(
    @Param('boardId') boardId: number,
    @User('id') userId: number,
  ): Promise<PaginateResponse<ColumnEntity>> {
    return this.columnService.getBoardColumnsWithCards(boardId, userId);
  }

  @Get(':id')
  @UseGuards(BoardGuard)
  getColumn(
    @Param('id') id: number,
    @User('id') userId: number,
  ): Promise<ColumnEntity> {
    return this.columnService.getOne(id, userId);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard, BoardGuard)
  async updateColumn(
    @Param('id') id: number,
    @Body() data: ColumnDto,
  ): Promise<void> {
    await this.columnService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard, BoardGuard)
  async deleteColumn(@Param('id') id: number) {
    await this.columnService.deleteOne(id);
  }
}

export interface ColumnResponse {
  id: number;
}
