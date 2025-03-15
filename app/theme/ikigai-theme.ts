import { light as lightTheme } from '@eva-design/eva';
import { dark } from '@eva-design/eva';

// Custom colors + palettes for ikigai

export const ikigaiColors = {
  black: '#000000',
  white: '#FFFFFF',

  // Add your brand colors
  brand: {
    primary: '#3366FF',
   
  },
  // Background colors
  background: {
    primary: '#FFFFFF',
    
  },
  // Text colors
  text: {
    primary: '#222B45',
  },
};

// Define your typography
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

export const appFontWeights = {
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

// Create the custom theme by extending Eva's light theme
export const ikigaiTheme = {
  ...lightTheme,
  
  // Override Eva's colors with our custom colors
  'color-primary-100': ikigaiColors.brand.primary + '20', // 20% opacity
  'color-primary-200': ikigaiColors.brand.primary + '40', // 40% opacity
  'color-primary-300': ikigaiColors.brand.primary + '60', // 60% opacity
  'color-primary-400': ikigaiColors.brand.primary + '80', // 80% opacity
  'color-primary-500': ikigaiColors.brand.primary,
  'color-primary-600': ikigaiColors.brand.primary,
  'color-primary-700': ikigaiColors.brand.primary,
  'color-primary-800': ikigaiColors.brand.primary,
  'color-primary-900': ikigaiColors.brand.primary,
  
  // Override Eva's text colors
  'text-basic-color': ikigaiColors.text.primary,
  
  // Override Eva's background colors
  'background-basic-color-1': ikigaiColors.background.primary,
  
  // You can add more overrides as needed
};

// Create a dark theme if needed
export const customDarkTheme = {
}; 