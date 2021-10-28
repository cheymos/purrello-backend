import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BoardEntity } from '../../board/entities/board.entity';

@Entity('columns')
export class ColumnEntity {
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
}
