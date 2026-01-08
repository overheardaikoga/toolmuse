export type ModalType = 'none' | 'text' | 'action';

export interface ServiceData {
  headline: string;
  subline: string;
  description: string;
  ctaText: string;
  image: string;
  layoutMode: 'centered-card' | 'full-canvas';
}
