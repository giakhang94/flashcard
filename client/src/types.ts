export type Level = "N1" | "N2" | "N3" | "N4" | "N5";
export type Difficulty = "easy" | "medium" | "hard";

export interface Card {
  id: string;
  hiragana: string;
  katakana: string;
  romaji: string;
  meaning: string;
  difficulty: Difficulty;
  level: Level;
  kanji: string;
  lesson: number;
  example: string;
  hint?: string;
}
