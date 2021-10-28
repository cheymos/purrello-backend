import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes
} from '@nestjs/common';
import { MainValidationPipe } from '../../common/pipes/main-validation.pipe';
import { AuthGuard } from '../auth/guards/auth.guard';
import { BoardGuard } from '../board/guards/board.guard';
import { User } from '../user/decorators/user.decorator';
import { ColumnService } from './column.service';
import { ColumnDto } from './dtos/column.dto';

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
  ) {
    const column = await this.columnService.create(data, boardId);

    return { id: column.id };
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getColumn(@Param('id') id: number, @User('id') userId: number) {
    return this.columnService.getOne(id, userId);
  }
}
