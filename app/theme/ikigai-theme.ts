import { light as lightTheme } from '@eva-design/eva';

// Custom colors + palettes for ikigai
export const ikigaiColors = {

  // Primary/Accent colors
  primary1: '#000000',
  primary2: '#FFFFFF',

  // Brand colors 
  brand: {
    primary: '#3366FF',
    secondary: '#2C3E50',
    accent: '#6A1B9A',
  },

  // Background colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F7F9FC',
    tertiary: '#EDF1F7',
  },

  // Text color
  text: {
    primary: '#222B45',
    secondary: '#8F9BB3',
    hint: '#C5CEE0',
    disabled: '#8F9BB3',
    inverse: '#FFFFFF',
  },
  
  // Ikigai monochrome palette
  mono: {
    background: "#000000", // Black - For a sophisticated, modern look
    surface: '#F7F9FC', // Light Gray - For cards/containers
    text: '#FFFFFF', // White text for white on black
  },

  // Ikigai soft-neutral palette
  neutral: {
    background: '#F5F2EB',    // Light Beige - Calming, warm base
    surface: '#FCFBF8',       // Off-White - For cards/containers
    text: '#8C6C44',          // Warm Brown - For text and icons
    accent: '#CE7B5F',        // Muted Terracotta - For accents and CTAs
    textLight: '#A99278',     // Lighter version of text color for secondary text
    textDark: '#5D4930',      // Darker version of text color for emphasis
    accentLight: '#E0A193',   // Lighter version of accent for hover states
    accentDark: '#B05A42',    // Darker version of accent for pressed states
    divider: '#E5DFD5',       // Subtle divider color
  }
};

// Typography
export const appFontSizes = {
  tiny: 10,
  small: 12,
  medium: 14,
  large: 16,
  xlarge: 18,
  xxlarge: 20,
  xxxlarge: 24,
  jumbo: 32,
};

// Font weights
export const appFontWeights = {
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

/* 
In UI Kitten terms - theme is a json or a JavaScript object, structured in a particular way
Create a custom theme by extending Eva's default light theme
*/
// Ikigai Themes
export const ikigaiNeutralTheme = {
  ...lightTheme,
  
  // Override Eva's colors with our custom colors
  'color-primary-100': ikigaiColors.neutral.accent + '20', // 20% opacity
  'color-primary-200': ikigaiColors.neutral.accent + '40', // 40% opacity
  'color-primary-300': ikigaiColors.neutral.accent + '60', // 60% opacity
  'color-primary-400': ikigaiColors.neutral.accent + '80', // 80% opacity
  'color-primary-500': ikigaiColors.neutral.accent,
  'color-primary-600': ikigaiColors.neutral.accentDark,
  'color-primary-700': ikigaiColors.neutral.accentDark,
  'color-primary-800': ikigaiColors.neutral.accentDark,
  'color-primary-900': ikigaiColors.neutral.accentDark,
  
  // Override Eva's text colors
  'text-basic-color': ikigaiColors.neutral.text,
  'text-hint-color': ikigaiColors.neutral.textLight,
  'text-disabled-color': ikigaiColors.neutral.textLight + '80',
  'text-primary-color': ikigaiColors.neutral.accent,
  
  // Override Eva's background colors
  'background-basic-color-1': ikigaiColors.neutral.background,
  'background-basic-color-2': ikigaiColors.neutral.surface,
  'background-basic-color-3': ikigaiColors.neutral.divider,
  'background-basic-color-4': ikigaiColors.neutral.surface + '80',
  
  // Border colors
  'border-basic-color-1': ikigaiColors.neutral.divider,
  'border-basic-color-2': ikigaiColors.neutral.divider,
  'border-basic-color-3': ikigaiColors.neutral.divider,
  'border-basic-color-4': ikigaiColors.neutral.divider,
  'border-basic-color-5': ikigaiColors.neutral.divider,
  
  // Additional customizations
  'color-basic-100': ikigaiColors.neutral.surface,
  'color-basic-200': ikigaiColors.neutral.background,
  'color-basic-300': ikigaiColors.neutral.divider,
  'color-basic-400': ikigaiColors.neutral.textLight + '40',
  'color-basic-500': ikigaiColors.neutral.textLight + '60',
  'color-basic-600': ikigaiColors.neutral.textLight,
  'color-basic-700': ikigaiColors.neutral.text,
  'color-basic-800': ikigaiColors.neutral.textDark,
  'color-basic-900': ikigaiColors.neutral.textDark,
  'color-basic-1000': ikigaiColors.neutral.textDark,
  'color-basic-1100': ikigaiColors.neutral.textDark,
};
// Create a dark theme if needed
export const ikigaiMonoTheme = {
  ...lightTheme,
  
  // Override Eva's colors with our custom colors
  'color-primary-100': ikigaiColors.mono.surface + '20', // 20% opacity
  'color-primary-200': ikigaiColors.mono.surface + '40', // 40% opacity
  'color-primary-300': ikigaiColors.mono.surface + '60', // 60% opacity
  'color-primary-400': ikigaiColors.mono.surface + '80', // 80% opacity
  'color-primary-500': ikigaiColors.mono.surface,
  'color-primary-600': ikigaiColors.mono.background,
  'color-primary-700': ikigaiColors.mono.background,
  'color-primary-800': ikigaiColors.mono.background,
  'color-primary-900': ikigaiColors.mono.background,
  
  // Override Eva's text colors
  'text-basic-color': ikigaiColors.mono.text,
  
  // Override Eva's background colors
  'background-basic-color-1': ikigaiColors.mono.background,
  
  // Additional customizations
  'color-basic-100': ikigaiColors.mono.surface,
  'color-basic-200': ikigaiColors.mono.background,
}; 
// export const pastelTheme
export const ikigaiPastelThem = {
  // 
}