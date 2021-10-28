import {
  Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
