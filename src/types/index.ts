export type MessageType =
  | "";

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

export interface MessageRequest {
  contentIdea: string;
  toneStyles: Tone;
  messageLength: "short" | "medium" | "long";
  language: "english" | "filipino" | "taglish";
  enhancements: string[];
}

export interface ToneSettings {
  messageType: string;
  toneStyles: string[];
  messageLength: string;
  language: string;
  enhancements: string[];
}