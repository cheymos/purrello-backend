import { IsNumber, IsString, Max, Min } from 'class-validator';

export class ColumnDto {
  @IsString()
  title: string;

  @IsNumber()
  @Min(0)
  @Max(32767)
  pos: number;
}
