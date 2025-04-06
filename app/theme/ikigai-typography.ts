import { StyleSheet } from 'react-native';
import { appFontSizes, appFontWeights } from './ikigai-theme';
import { ikigaiFonts } from './fonts';

// Create text styles that can be used throughout the app
export const textStyles = StyleSheet.create({
  // Headings
  h1: {
    fontSize: appFontSizes.jumbo,
    fontWeight: '700',
    fontFamily: ikigaiFonts.inter.bold,
    lineHeight: appFontSizes.jumbo * 1.2,
  },
  h2: {
    fontSize: appFontSizes.xxxlarge,
    fontWeight: '700',
    fontFamily: ikigaiFonts.inter.bold,
    lineHeight: appFontSizes.xxxlarge * 1.2,
  },
  h3: {
    fontSize: appFontSizes.xxlarge,
    fontWeight: '700',
    fontFamily: ikigaiFonts.inter.bold,
    lineHeight: appFontSizes.xxlarge * 1.2,
  },
  h4: {
    fontSize: appFontSizes.xlarge,
    fontWeight: '600',
    fontFamily: ikigaiFonts.inter.semiBold,
    lineHeight: appFontSizes.xlarge * 1.2,
  },

  // Body text
  bodyLarge: {
    fontSize: appFontSizes.large,
    fontWeight: '400',
    fontFamily: ikigaiFonts.inter.regular,
    lineHeight: appFontSizes.large * 1.5,
  },
  bodyMedium: {
    fontSize: appFontSizes.medium,
    fontWeight: '400',
    fontFamily: ikigaiFonts.inter.regular,
    lineHeight: appFontSizes.medium * 1.5,
  },
  bodySmall: {
    fontSize: appFontSizes.small,
    fontWeight: '400',
    fontFamily: ikigaiFonts.inter.regular,
    lineHeight: appFontSizes.small * 1.5,
  },
  
  // Special text styles
  caption: {
    fontSize: appFontSizes.tiny,
    fontWeight: '400',
    fontFamily: ikigaiFonts.inter.regular,
    lineHeight: appFontSizes.tiny * 1.5,
  },
  button: {
    fontSize: appFontSizes.medium,
    fontWeight: '600',
    fontFamily: ikigaiFonts.inter.semiBold,
    lineHeight: appFontSizes.medium * 1.5,
    textTransform: 'uppercase',
  },
  label: {
    fontSize: appFontSizes.small,
    fontWeight: '500',
    fontFamily: ikigaiFonts.inter.medium,
    lineHeight: appFontSizes.small * 1.5,
  },
});

// Note: Font loading is handled in the fonts.ts file

// If you want to use custom fonts, you'll need to load them
// For example, with Expo:
// 
// import * as Font from 'expo-font';
// 
// export const loadFonts = async () => {
//   await Font.loadAsync({
//     'CustomFont-Regular': require('../../assets/fonts/CustomFont-Regular.ttf'),
//     'CustomFont-Medium': require('../../assets/fonts/CustomFont-Medium.ttf'),
//     'CustomFont-Bold': require('../../assets/fonts/CustomFont-Bold.ttf'),
//   });
// };