import { StyleSheet } from 'react-native';
import { ikigaiColors } from './ikigai-theme';

// Common UI styles to be reused across the app
export const ikigaiStyles = StyleSheet.create({
  // Layout styles
  container: {
    flex: 1,
    flexDirection: 'column', // default
    backgroundColor: ikigaiColors.background.primary,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ikigaiColors.background.primary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  // Spacing
  padding: {
    padding: 16,
  },
  paddingHorizontal: {
    paddingHorizontal: 16,
  },
  paddingVertical: {
    paddingVertical: 16,
  },
  margin: {
    margin: 16,
  },
  marginHorizontal: {
    marginHorizontal: 16,
  },
  marginVertical: {
    marginVertical: 16,
  },
  
  // Card styles
  card: {
    borderRadius: 8,
    backgroundColor: ikigaiColors.background.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    margin: 8,
    padding: 16,
  },
  
  // Divider
  divider: {
    height: 1,
    backgroundColor: '#C5CEE030', // Light gray with 30% opacity
    marginVertical: 8,
  },
  
  // Shadow
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

// Screen-specific styles to be added here
export const screenScreenStyles = {
  // Home screen
  home: StyleSheet.create({
    header: {
      backgroundColor: ikigaiColors.brand.primary,
      paddingTop: 60,
      paddingBottom: 20,
      paddingHorizontal: 16,
    },
    headerTitle: {
      color: '#FFFFFF', // White text for headers
    },
  }),
  
  // Profile screen
  profile: StyleSheet.create({
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 16,
    },
  }),
  
  // Add more screen-specific styles as needed
}; 