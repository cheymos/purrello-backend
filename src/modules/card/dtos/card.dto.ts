import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CardDto {
  @IsString()
  readonly content: string;

  @IsNumber()
  @Min(0)
  @Max(32767)
  readonly pos: number;
}
