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
import { AuthGuard } from '../auth/guards/auth.guard';
import { BoardGuard } from '../board/guards/board.guard';
import { User } from '../user/decorators/user.decorator';
import { ColumnService } from './column.service';
import { ColumnDto } from './dtos/column.dto';
import { ColumnEntity } from './entities/column.entity';

@Controller('boards/:boardId/columns')
@UseGuards(BoardGuard)
export class ColumnBoardController {
  constructor(private readonly columnService: ColumnService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(MainValidationPipe)
  async createColumn(
    @Param('boardId') boardId: number,
    @Body() data: ColumnDto,
  ): Promise<ColumnResponse> {
    const column = await this.columnService.create(data, boardId);

    return { id: column.id };
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getColumn(
    @Param('id') id: number,
    @User('id') userId: number,
  ): Promise<ColumnEntity> {
    return this.columnService.getOne(id, userId);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  async updateColumn(
    @Param('id') id: number,
    @Body() data: ColumnDto,
  ): Promise<void> {
    await this.columnService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  async deleteColumn(@Param('id') id: number) {
    await this.columnService.deleteOne(id);
  }
}

export interface ColumnResponse {
  id: number;
}
