import { IsBoolean, IsString, Length } from 'class-validator';

export class BoardDto {
  @IsString()
  @Length(1, 255)
  readonly title: string;

  @IsBoolean()
  readonly isPrivate: boolean;
}
