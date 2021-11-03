import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ColumnEntity } from '../../column/entities/column.entity';

@Entity('cards')
export class CardEntity {
  constructor(content: string, pos: number, columnId: number) {
    this.content = content;
    this.pos = pos;
    this.columnId = columnId;
  }

  @ApiProperty()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ApiProperty()
  @Column('text')
  content: string;

  @ApiProperty()
  @Column('smallint')
  pos: number;

  @ApiProperty()
  @Column()
  columnId: number;

  @ManyToOne(() => ColumnEntity, { onDelete: 'CASCADE' })
  column?: ColumnEntity;

  @ApiProperty()
  @Column({ default: () => 'now()' })
  readonly lastUpdated: Date;
}
