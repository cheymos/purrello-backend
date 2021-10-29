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

  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ length: 255 })
  title: string;

  @Column('smallint')
  pos: number;

  @Column()
  boardId: number;

  @ManyToOne(() => BoardEntity, { onDelete: 'CASCADE' })
  board?: BoardEntity;

  @OneToMany(() => CardEntity, (cardEntity) => cardEntity.column)
  cards?: CardEntity[];
}
