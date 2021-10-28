import { Controller, UseGuards } from '@nestjs/common';
import { ColumnGuard } from '../column/guards/column.guard';

@Controller('boards/:boardId/columns/:columnId/cards')
@UseGuards(ColumnGuard)
export class CardColumnController {

}
