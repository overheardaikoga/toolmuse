import type { ThemeMap, PortfolioData } from './types';

export const DEFAULT_DATA: PortfolioData = {
  headline: "My Portfolio",
  subline: "Creative Work & Projects",
  about: "I craft visual stories that blend design and emotion into memorable experiences.",
  cta: "Contact Me"
};

export const THEMES: ThemeMap = {
  aurora: {
    name: 'Aurora Glow',
    bg: "linear-gradient(180deg, #0F051A 0%, #191121 100%)",
    color: "#9B4DFF",
    glow: "0 0 40px rgba(155, 77, 255, 0.4)",
    ctaGradient: "linear-gradient(90deg, #8A2BE2, #00FFFF)",
    ctaColor: "#fff",
    ctaShadow: "0 0 20px rgba(138,43,226,0.5), 0 0 30px rgba(0,255,255,0.4)"
  },
  cyber: {
    name: 'Cyber Mist',
    bg: "radial-gradient(ellipse 80% 80% at 50% -20%, #1a0e2b, #0d1117)",
    color: "#40E0D0",
    glow: "0 0 40px rgba(64, 224, 208, 0.4)",
    ctaGradient: "linear-gradient(90deg, #00FFFF, #40E0D0)",
    ctaColor: "#000",
    ctaShadow: "0 0 20px rgba(64,224,208,0.5)"
  },
  deep: {
    name: 'Deep Space',
    bg: "radial-gradient(ellipse 80% 80% at 50% -20%, #1C102A, #0A0014)",
    color: "#A855F7",
    glow: "0 0 40px rgba(168, 85, 247, 0.3)",
    ctaGradient: "linear-gradient(90deg, #4B0082, #EE82EE)",
    ctaColor: "#fff",
    ctaShadow: "0 0 20px rgba(238,130,238,0.4)"
  },
  pulse: {
    name: 'Golden Pulse',
    bg: "linear-gradient(180deg, #1F120E 0%, #291813 100%)",
    color: "#FFC78A",
    glow: "0 0 40px rgba(255, 199, 138, 0.3)",
    ctaGradient: "linear-gradient(90deg, #FFAE4A, #FF8A8A)",
    ctaColor: "#2b1a14",
    ctaShadow: "0 0 18px rgba(255,174,74,0.4)"
  },
  dream: {
    name: 'Magenta Dream',
    bg: "linear-gradient(180deg, #2A182E 0%, #3B1D2C 100%)",
    color: "#F472B6",
    glow: "0 0 40px rgba(244, 114, 182, 0.3)",
    ctaGradient: "linear-gradient(90deg, #FF69B4, #FFA500)",
    ctaColor: "#000",
    ctaShadow: "0 0 20px rgba(255,165,0,0.6)"
  }
};