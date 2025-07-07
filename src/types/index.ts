export type MessageType =
  | "good-morning"
  | "comfort"
  | "appreciation"
  | "apology"
  | "encouragement"
  | "romantic"
  | "good-evening"
  | "professional";

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
  | "formal";

export type Occasion =
  | "none"
  | "birthday" 
  | "anniversary" 
  | "valentine's day" 
  | "new year" 
  | "christmas" 
  | "mother's day" 
  | "father's day";

export type Enhancement = "include quote" | "make it poetic" | "add humor" | "make it heartfelt";

export interface MessageRequest {
  contentIdea: string;
  toneStyles: Tone[];
  occasion: Occasion;
  messageLength: "short" | "medium" | "long";
  language: "english" | "filipino" | "taglish";
  enhancements: Enhancement[];
}

export type ToneSettings = Omit<MessageRequest, "contentIdea"> & {
  messageType: MessageType;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  username: string;
  email: string;
  user_id: string;
  expires_in: number;
  created_at: string;
}

export interface AuthContextType {
  user: { username: string; email: string; } | null;
  token: string | null;
  signup: (data: {
    username: string,
    email: string,
    password: string,
  }) => Promise<void>;
  login: (data: { email: string; password: string; }) => Promise<void>;
  logout: () => void;
}