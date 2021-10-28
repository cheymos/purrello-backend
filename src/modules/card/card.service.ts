import {
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ACCESS_DENIED,
  CARD_NOT_FOUND
} from '../../common/constants/error.constants';
import { CardDto } from './dtos/card.dto';
import { CardEntity } from './entities/card.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
  ) {}

  async create(
    { content, pos }: CardDto,
    columnId: number,
  ): Promise<CardEntity> {
    // add a check to position
    const card = new CardEntity(content, pos, columnId);
    return this.cardRepository.save(card);
  }

  async getOne(id: number, userId: number): Promise<CardEntity> {
    const card = await this.findById(id, true);

    const board = card?.column?.board;

    if (board?.isPrivate && board.ownerId !== userId)
      throw new ForbiddenException(ACCESS_DENIED);

    return card;
  }

  async findById(id: number, withColumn = false): Promise<CardEntity> {
    if (isNaN(id)) throw new NotFoundException(CARD_NOT_FOUND);

    let card: CardEntity | undefined;

    if (withColumn) {
      card = await this.cardRepository.findOne(id, {
        relations: ['column'],
      });
    } else {
      card = await this.cardRepository.findOne(id);
    }

    if (!card) throw new NotFoundException(CARD_NOT_FOUND);

    return card;
  }
}
