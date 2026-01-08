


export const COLORS = {
  AURORA_MINT: '#19F5D2',
  AURORA_PINK: '#FF2E88',
  SOLAR_GOLD: '#FFC83D',
  HOT_MAGENTA: '#E100FF',
  NEON_SKY_BLUE: '#28C7FA',
};

export const THEMES: Record<string, AccentTheme> = {
  mint: {
    name: 'Aurora Mint',
    primary: COLORS.AURORA_MINT,
    secondary: COLORS.NEON_SKY_BLUE,
    highlight: COLORS.SOLAR_GOLD,
    bg: '#E0F5F0' // Slightly deeper than previous #F0FFFA
  },
  pink: {
    name: 'Aurora Pink',
    primary: COLORS.AURORA_PINK,
    secondary: COLORS.AURORA_MINT,
    highlight: COLORS.SOLAR_GOLD,
    bg: '#F5E6ED' // Slightly deeper than previous #FFF5F9
  },
  gold: {
    name: 'Solar Gold',
    primary: COLORS.SOLAR_GOLD,
    secondary: COLORS.AURORA_PINK,
    highlight: COLORS.AURORA_MINT,
    bg: '#F5F2E0' // Slightly deeper than previous #FFFEF0
  },
  magenta: {
    name: 'Hot Magenta',
    primary: COLORS.HOT_MAGENTA,
    secondary: COLORS.NEON_SKY_BLUE,
    highlight: COLORS.AURORA_MINT,
    bg: '#EEE0F5' // Slightly deeper than previous #FCF5FF
  },
  blue: {
    name: 'Neon Sky Blue',
    primary: COLORS.NEON_SKY_BLUE,
    secondary: COLORS.AURORA_MINT,
    highlight: COLORS.SOLAR_GOLD,
    bg: '#E0EEF5' // Slightly deeper than previous #F0F9FF
  }
};
