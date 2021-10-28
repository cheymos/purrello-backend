import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ColumnEntity } from '../../column/entities/column.entity';

@Entity('cards')
export class CardEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column('text')
  content: string;

  @Column('smallint')
  pos: number;

  @Column()
  columnId: number;

  @ManyToOne(() => ColumnEntity, { onDelete: 'CASCADE' })
  column?: ColumnEntity;

  @Column({ default: () => 'now()' })
  readonly lastUpdated: Date;
}
