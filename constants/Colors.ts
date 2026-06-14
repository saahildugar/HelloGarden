/**
 * HelloGarden Design System — Color Tokens
 * All colors locked in Phase 2 architecture decisions.
 */

export const Colors = {
  // Brand palette
  sagePrimary: '#7C9A6E',    // Primary actions, buttons, selected states
  sageLight: '#A8C49A',      // Hover states, progress bars
  sageDark: '#5A7A52',       // Pressed states, active icons

  cream: '#FDF8F0',          // Primary background (light mode)
  creamDark: '#F5EFE3',      // Card backgrounds, input fills (light mode)
  creamDeep: '#EDE5D5',      // Dividers, borders (light mode)

  brown: '#8B6F47',          // Secondary accents, earthy elements
  brownLight: '#B89870',     // Subtle accents

  charcoal: '#2D2D2D',       // Primary text
  charcoalMid: '#555555',    // Secondary text
  charcoalLight: '#888888',  // Placeholder, muted text

  alertRed: '#D64545',       // Overdue tasks, critical alerts ONLY
  alertRedLight: '#FDEAEA',  // Alert backgrounds
  successGreen: '#4CAF50',   // Healthy status, completed tasks
  successLight: '#E8F5E9',   // Success backgrounds
  warningAmber: '#F59E0B',   // Due-soon tasks
  warningLight: '#FEF3C7',   // Warning backgrounds

  white: '#FFFFFF',
  black: '#000000',

  // Dark mode backgrounds
  darkBg: '#1A1A1A',
  darkCard: '#252525',
  darkBorder: '#333333',
  darkText: '#F0EBE1',
  darkTextMuted: '#9A9A9A',
} as const;

export const Theme = {
  light: {
    background: Colors.cream,
    card: Colors.creamDark,
    border: Colors.creamDeep,
    text: Colors.charcoal,
    textSecondary: Colors.charcoalMid,
    textMuted: Colors.charcoalLight,
    primary: Colors.sagePrimary,
    accent: Colors.brown,
    tabBar: Colors.white,
    tabBarBorder: Colors.creamDeep,
  },
  dark: {
    background: Colors.darkBg,
    card: Colors.darkCard,
    border: Colors.darkBorder,
    text: Colors.darkText,
    textSecondary: '#C0B8A8',
    textMuted: Colors.darkTextMuted,
    primary: Colors.sagePrimary,
    accent: Colors.brownLight,
    tabBar: Colors.darkCard,
    tabBarBorder: Colors.darkBorder,
  },
} as const;

export type ThemeColors = {
  background: string;
  card: string;
  border: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  primary: string;
  accent: string;
  tabBar: string;
  tabBarBorder: string;
};
