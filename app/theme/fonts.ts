import * as Font from 'expo-font';
import {
	Inter_100Thin,
	Inter_200ExtraLight,
	Inter_300Light,
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
	Inter_800ExtraBold,
	Inter_900Black,
} from '@expo-google-fonts/inter';

// Export a variable that will be updated when fonts are loaded
export let fontsLoaded = false;

// Helper function to update the font loaded state
export function setFontsLoaded(value) {
	fontsLoaded = value;
}

// Font family definitions
export const ikigaiFonts = {
	inter: {
		thin: 'Inter_100Thin',
		extraLight: 'Inter_200ExtraLight',
		light: 'Inter_300Light',
		regular: 'Inter_400Regular',
		medium: 'Inter_500Medium',
		semiBold: 'Inter_600SemiBold',
		bold: 'Inter_700Bold',
		extraBold: 'Inter_800ExtraBold',
		black: 'Inter_900Black',
	},
	quicksand: {
		light: 'Quicksand-Light',
		regular: 'Quicksand-Regular',
		medium: 'Quicksand-Medium',
		semibold: 'Quicksand-SemiBold',
		bold: 'Quicksand-Bold',
	},
	system: {
		regular: 'System',
		medium: 'System-Medium',
		bold: 'System-Bold',
	}
};

// Font loading configuration
export async function loadFonts() {
	return await Font.loadAsync({
	  // Inter fonts
	  [ikigaiFonts.inter.thin]: Inter_100Thin,
	  [ikigaiFonts.inter.extraLight]: Inter_200ExtraLight,
	  [ikigaiFonts.inter.light]: Inter_300Light,
	  [ikigaiFonts.inter.regular]: Inter_400Regular,
	  [ikigaiFonts.inter.medium]: Inter_500Medium,
	  [ikigaiFonts.inter.semiBold]: Inter_600SemiBold,
	  [ikigaiFonts.inter.bold]: Inter_700Bold,
	  [ikigaiFonts.inter.extraBold]: Inter_800ExtraBold,
	  [ikigaiFonts.inter.black]: Inter_900Black,
	});
}