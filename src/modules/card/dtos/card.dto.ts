import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CardDto {
  @ApiProperty()
  @IsString()
  readonly content: string;

  @ApiProperty({ minimum: 0, maximum: 32767 })
  @IsNumber()
  @Min(0)
  @Max(32767)
  readonly pos: number;
}
