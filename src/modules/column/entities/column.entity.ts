import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { BoardEntity } from '../../board/entities/board.entity';
import { CardEntity } from '../../card/entities/card.entity';

@Entity('columns')
export class ColumnEntity {
  constructor(title: string, pos: number, boardId: number) {
    this.title = title;
    this.pos = pos;
    this.boardId = boardId;
  }

  @ApiProperty()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ApiProperty()
  @Column({ length: 255 })
  title: string;

  @ApiProperty()
  @Column('smallint')
  pos: number;

  @ApiProperty()
  @Column()
  boardId: number;

  @ManyToOne(() => BoardEntity, { onDelete: 'CASCADE' })
  board?: BoardEntity;

  @ApiPropertyOptional({ type: [CardEntity] })
  @OneToMany(() => CardEntity, (cardEntity) => cardEntity.column)
  cards?: CardEntity[];
}
