import { Difficulty, Level } from '@prisma/client';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  hiragana: string;

  @IsString()
  @IsNotEmpty()
  katakana: string;

  @IsString()
  @IsNotEmpty()
  romaji: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  lesson: number;

  @IsString()
  @IsNotEmpty()
  level: Level;

  @IsOptional()
  difficulty: Difficulty;

  @IsOptional()
  @IsString()
  kanji: string;

  @IsNotEmpty()
  @IsString()
  meaning: string;

  @IsOptional()
  @IsString()
  example: string;
}
