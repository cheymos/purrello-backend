import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString, Max,
  MaxLength,
  Min
} from 'class-validator';

export class ColumnDto {
  @ApiProperty({ maximum: 255 })
  @IsString()
  @MaxLength(255)
  readonly title: string;

  @ApiProperty({ minimum: 0, maximum: 32767 })
  @IsNumber()
  @Min(0)
  @Max(32767)
  readonly pos: number;
}
