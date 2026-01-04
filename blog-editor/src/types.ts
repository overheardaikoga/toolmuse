export type ThemeKey = 'aurora' | 'cyber' | 'neon' | 'sunset' | 'ocean';

export interface Theme {
  name: string;
  primary: string;
  secondary: string;
  pageBg: string;
  frameBg: string;
}

export interface BlogTextState {
  headline: string;
  subline: string;
  authorName: string;
  authorDesc: string;
  intro: string;
  cta: string;
}

export type SlotKey = 'post1' | 'post2' | 'post3';

export interface BlogImageState {
  avatar: string;
  post1: string | null;
  post2: string | null;
  post3: string | null;
}