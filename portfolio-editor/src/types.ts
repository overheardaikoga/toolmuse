export type ThemeKey = 'aurora' | 'cyber' | 'deep' | 'pulse' | 'dream';

export interface ThemeData {
  name: string;
  bg: string;
  color: string;
  glow: string;
  ctaGradient: string;
  ctaColor: string;
  ctaShadow: string;
}

export interface PortfolioData {
  headline: string;
  subline: string;
  about: string;
  cta: string;
}

export type ImageSlots = Record<string, string>;

export type ModalType = 'text' | 'action' | 'accent' | 'clear' | null;

export interface ThemeMap {
  [key: string]: ThemeData;
}