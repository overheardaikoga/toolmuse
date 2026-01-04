import { Theme, ThemeKey, BlogTextState } from './types';

export const THEMES: Record<ThemeKey, Theme> = {
  aurora: {
    name: 'Aurora',
    primary: '#00FFA3',
    secondary: '#00D9FF',
    pageBg: 'linear-gradient(135deg, #0F051A 0%, #1A0B2E 50%, #16213E 100%)',
    frameBg: 'linear-gradient(135deg, rgba(15, 5, 26, 0.9), rgba(26, 11, 46, 0.8))',
  },
  cyber: {
    name: 'Cyber',
    primary: '#FF006E',
    secondary: '#8338EC',
    pageBg: 'linear-gradient(135deg, #0A0014 0%, #1C0033 50%, #2D004D 100%)',
    frameBg: 'linear-gradient(135deg, rgba(10, 0, 20, 0.9), rgba(28, 0, 51, 0.8))',
  },
  neon: {
    name: 'Neon',
    primary: '#FFBE0B',
    secondary: '#FB5607',
    pageBg: 'linear-gradient(135deg, #1A0F0A 0%, #2E1A0F 50%, #3D2314 100%)',
    frameBg: 'linear-gradient(135deg, rgba(26, 15, 10, 0.9), rgba(46, 26, 15, 0.8))',
  },
  sunset: {
    name: 'Sunset',
    primary: '#FF006E',
    secondary: '#FFBE0B',
    pageBg: 'linear-gradient(135deg, #1A0A0F 0%, #331122 50%, #4D1A33 100%)',
    frameBg: 'linear-gradient(135deg, rgba(26, 10, 15, 0.9), rgba(51, 17, 34, 0.8))',
  },
  ocean: {
    name: 'Ocean',
    primary: '#00D9FF',
    secondary: '#3A86FF',
    pageBg: 'linear-gradient(135deg, #0A1628 0%, #0F2540 50%, #1A3A5C 100%)',
    frameBg: 'linear-gradient(135deg, rgba(10, 22, 40, 0.9), rgba(15, 37, 64, 0.8))',
  },
};

export const INITIAL_TEXTS: BlogTextState = {
  headline: 'Welcome to the Future',
  subline: 'Exploring the digital frontier',
  authorName: 'Alex Quantum',
  authorDesc: 'Digital Architect & Creative Technologist',
  intro: 'Dive into a collection of cutting-edge projects that blend art, technology, and innovation in ways you\'ve never seen before.',
  cta: 'Explore Projects',
};

export const PLACEHOLDER_AVATAR = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Cdefs%3E%3ClinearGradient id="grad" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%2300FFA3;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%2300D9FF;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="200" height="200" fill="url(%23grad)"/%3E%3Ccircle cx="100" cy="80" r="30" fill="white" opacity="0.9"/%3E%3Cellipse cx="100" cy="150" rx="50" ry="60" fill="white" opacity="0.9"/%3E%3C/svg%3E';