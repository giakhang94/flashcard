import { Difficulty, Level } from '@prisma/client';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class EditCardDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  hiragana: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  katakana: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  romaji: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @IsOptional()
  lesson: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  level: Level;

  @IsOptional()
  difficulty: Difficulty;

  @IsOptional()
  @IsString()
  kanji: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  meaning: string;

  @IsOptional()
  @IsString()
  example: string;
}
