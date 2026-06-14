/**
 * HelloGarden Design System — Typography Tokens
 * Clean, readable sans-serif. Large touch targets. WCAG AA contrast.
 */

export const FontFamily = {
  // Using system fonts until custom fonts are loaded
  // Target: DM Sans (loaded via expo-font in _layout.tsx)
  regular: 'DMSans_400Regular',
  medium: 'DMSans_500Medium',
  semiBold: 'DMSans_600SemiBold',
  bold: 'DMSans_700Bold',

  // Fallback system fonts
  systemRegular: 'System',
} as const;

export const FontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  '2xl': 28,
  '3xl': 34,
} as const;

export const LineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
} as const;

export const Typography = {
  // Screen headings
  heading1: { fontSize: FontSize['3xl'], fontFamily: FontFamily.bold, lineHeight: FontSize['3xl'] * 1.2 },
  heading2: { fontSize: FontSize['2xl'], fontFamily: FontFamily.bold, lineHeight: FontSize['2xl'] * 1.2 },
  heading3: { fontSize: FontSize.xl, fontFamily: FontFamily.semiBold, lineHeight: FontSize.xl * 1.3 },

  // Section headings
  title: { fontSize: FontSize.lg, fontFamily: FontFamily.semiBold, lineHeight: FontSize.lg * 1.3 },
  titleMedium: { fontSize: FontSize.md, fontFamily: FontFamily.medium, lineHeight: FontSize.md * 1.4 },

  // Body
  body: { fontSize: FontSize.base, fontFamily: FontFamily.regular, lineHeight: FontSize.base * 1.5 },
  bodyMedium: { fontSize: FontSize.base, fontFamily: FontFamily.medium, lineHeight: FontSize.base * 1.5 },

  // Small / Labels
  label: { fontSize: FontSize.sm, fontFamily: FontFamily.medium, lineHeight: FontSize.sm * 1.4 },
  caption: { fontSize: FontSize.xs, fontFamily: FontFamily.regular, lineHeight: FontSize.xs * 1.5 },

  // Buttons
  button: { fontSize: FontSize.base, fontFamily: FontFamily.semiBold, lineHeight: FontSize.base * 1.2 },
  buttonSm: { fontSize: FontSize.sm, fontFamily: FontFamily.semiBold, lineHeight: FontSize.sm * 1.2 },
} as const;
