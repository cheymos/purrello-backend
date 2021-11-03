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
import { BoardGuard } from '../board/guards/board.guard';
import { User } from '../user/decorators/user.decorator';
import { ColumnService } from './column.service';
import { ColumnDto } from './dtos/column.dto';
import { ColumnEntity } from './entities/column.entity';

export class ColumnResponse {
  @ApiProperty()
  id: number;
}

@ApiTags('Columns')
@Controller('boards/:boardId/columns')
export class ColumnBoardController {
  constructor(private readonly columnService: ColumnService) {}

  @ApiOperation({ summary: 'Create column' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    type: ColumnResponse,
    description: 'Successfully created',
  })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Board not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  // ----------------------------------
  @Post()
  @UseGuards(AuthGuard, BoardGuard)
  @UsePipes(MainValidationPipe)
  async createColumn(
    @Param('boardId') boardId: number,
    @Body() data: ColumnDto,
    @User('id') userId: number,
  ): Promise<ColumnResponse> {
    const column = await this.columnService.create(data, boardId, userId);

    return { id: column.id };
  }

  @ApiOperation({ summary: 'Get board columns with cards' })
  @ApiExtraModels(ColumnEntity)
  @ApiResponse(getPaginateResponseOptions(ColumnEntity))
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Board/column not found' })
  // ----------------------------------
  @Get()
  @UseGuards(BoardGuard)
  getBoardColumnsWithCards(
    @Param('boardId') boardId: number,
    @User('id') userId: number,
  ): Promise<PaginateResponse<ColumnEntity>> {
    return this.columnService.getBoardColumnsWithCards(boardId, userId);
  }

  @ApiOperation({ summary: 'Get column by id' })
  @ApiResponse({
    status: 200,
    type: ColumnEntity,
    description: 'Successful operation',
  })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Board/column not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  // ----------------------------------
  @Get(':id')
  @UseGuards(BoardGuard)
  getColumn(
    @Param('id') id: number,
    @User('id') userId: number,
  ): Promise<ColumnEntity> {
    return this.columnService.getOne(id, userId);
  }

  @ApiOperation({ summary: 'Update column by id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'Successfully updated' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Board/column not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  // ----------------------------------
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard, BoardGuard)
  async updateColumn(
    @Param('id') id: number,
    @Body() data: ColumnDto,
    @User('id') userId: number,
  ): Promise<void> {
    await this.columnService.update(id, data, userId);
  }

  @ApiOperation({ summary: 'Delete column by id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'Successfully deleted' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  // ----------------------------------
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard, BoardGuard)
  async deleteColumn(
    @Param('id') id: number,
    @User('id') userId: number,
  ): Promise<void> {
    await this.columnService.deleteOne(id, userId);
  }
}
