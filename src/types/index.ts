export type Tone = 
  | "casual"
  | "sincere"
  | "romantic"
  | "poetic"
  | "playful"
  | "thoughtful"
  | "warm and gentle"
  | "witty"
  | "humble"
  | "professional";

export interface LetterInputProps {
  onSubmit: (text: string) => void;
}

export interface MagicalBasketProps {
  letterContent: string;
  onBasketTap: () => void;
}

export interface MagicalEnvelopeProps {
  letterContent: string;
}