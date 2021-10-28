import { IsNumber, IsString, Max, Min } from 'class-validator';

export class ColumnDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  @Min(0)
  @Max(32767)
  readonly pos: number;
}
