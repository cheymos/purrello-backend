import {
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ACCESS_DENIED,
  COLUMN_NOT_FOUND
} from '../../common/constants/error.constants';
import { ColumnDto } from './dtos/column.dto';
import { ColumnEntity } from './entities/column.entity';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(ColumnEntity)
    private readonly columnRepository: Repository<ColumnEntity>,
  ) {}

  async create(
    { title, pos }: ColumnDto,
    boardId: number,
  ): Promise<ColumnEntity> {
    // add a check to position
    const column = new ColumnEntity(title, pos, boardId);
    return this.columnRepository.save(column);
  }

  async getOne(id: number, userId: number): Promise<ColumnEntity> {
    const column = await this.findById(id);

    if (column.board?.isPrivate && column.board.ownerId !== userId)
      throw new ForbiddenException(ACCESS_DENIED);

    return column;
  }

  async update(
    id: number,
    { title, pos }: ColumnDto,
  ): Promise<ColumnEntity> {
    const column = await this.findById(id);

    delete column.board;
    Object.assign(column, { title, pos });

    await this.columnRepository.update(id, column);

    return column;
  }

  async deleteOne(id: number): Promise<void> {
    if (isNaN(id)) return;

    const column = await this.columnRepository.findOne(id);

    if (!column) return;

    await this.columnRepository.delete(id);
  }

  async findById(id: number): Promise<ColumnEntity> {
    if (isNaN(id)) throw new NotFoundException(COLUMN_NOT_FOUND);

    const column = await this.columnRepository.findOne(id);

    if (!column) throw new NotFoundException(COLUMN_NOT_FOUND);

    return column;
  }
}
