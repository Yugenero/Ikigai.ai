import React, { useEffect } from 'react';
import Svg, { Circle } from 'react-native-svg';
import { Text, Layout } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedProps, 
  withTiming, 
  withSequence,
  withDelay,
  Easing
} from 'react-native-reanimated';

// Create animated SVG component
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export function VennAnimation() {
  // Create shared values for animations
  const strokeDashoffset = useSharedValue(283); // Circumference: 2 * π * r
  const opacity = useSharedValue(0);
  
  // Set up animations that will run when component mounts
  useEffect(() => {
    // First make circle visible
    opacity.value = withTiming(1, { duration: 500 });
    
    // Then draw the circle by animating the stroke
    strokeDashoffset.value = withDelay(
      300, 
      withTiming(0, { 
        duration: 1500, 
        easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
      })
    );
  }, []);

  // Create animated props for the circle
  const animatedCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: strokeDashoffset.value,
      opacity: opacity.value,
    };
  });

  return (
    <Svg height="240" width="240" viewBox="0 0 100 100">
      <AnimatedCircle
        cx="50"
        cy="50"
        r="45"
        stroke="white"
        strokeWidth="2"
        fill="transparent"
        strokeDasharray="283"
        animatedProps={animatedCircleProps}
      />
    </Svg>
  );
}

// For a 4-circle Venn diagram animation
export function IkigaiVennAnimation() {
	// Create shared values for each circle
	const circle1Offset = useSharedValue(188); // 2 * π * 30
	const circle2Offset = useSharedValue(188);
	const circle3Offset = useSharedValue(188);
	const circle4Offset = useSharedValue(188);
	const opacity = useSharedValue(0);
  
	useEffect(() => {
	  // Fade in all circles
	  opacity.value = withTiming(1, { duration: 300 });
	  
	  // Draw each circle in sequence
	  circle1Offset.value = withDelay(300, withTiming(0, { 
		duration: 1200, 
		easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
	  }));
	  
	  circle2Offset.value = withDelay(600, withTiming(0, { 
		duration: 1200, 
		easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
	  }));
	  
	  circle3Offset.value = withDelay(900, withTiming(0, { 
		duration: 1200, 
		easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
	  }));
	  
	  circle4Offset.value = withDelay(1200, withTiming(0, { 
		duration: 1200, 
		easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
	  }));
	}, []);
  
	// Create animated props for each circle
	const circle1Props = useAnimatedProps(() => ({
	  strokeDashoffset: circle1Offset.value,
	  opacity: opacity.value,
	}));
	
	const circle2Props = useAnimatedProps(() => ({
	  strokeDashoffset: circle2Offset.value,
	  opacity: opacity.value,
	}));
	
	const circle3Props = useAnimatedProps(() => ({
	  strokeDashoffset: circle3Offset.value,
	  opacity: opacity.value,
	}));
	
	const circle4Props = useAnimatedProps(() => ({
	  strokeDashoffset: circle4Offset.value,
	  opacity: opacity.value,
	}));
  
	// Adjust the radius for proper overlap
	const radius = 35;
	const strokeDasharray = 2 * Math.PI * radius;
	
	// Center point of the diamond pattern
	const centerX = 100;
	const centerY = 100;
	
	// Distance from center for diamond layout
	const offset = 30; // Smaller means more overlap
  
	return (
	  <Svg height="240" width="240" viewBox="0 0 200 200">
		{/* Top - What you LOVE (Passion) */}
		<AnimatedCircle
		  cx={centerX}
		  cy={centerY - offset}
		  r={radius}
		  stroke="#FF6B6B" 
		  strokeWidth="2"
		  fill="rgba(255, 107, 107, 0.2)" // Very light fill
		  strokeDasharray={strokeDasharray}
		  animatedProps={circle1Props}
		/>
		
		{/* Right - What the world NEEDS (Mission) */}
		<AnimatedCircle
		  cx={centerX + offset}
		  cy={centerY}
		  r={radius}
		  stroke="#6BB2FF"
		  strokeWidth="2"
		  fill="rgba(107, 178, 255, 0.2)" // Very light fill
		  strokeDasharray={strokeDasharray}
		  animatedProps={circle2Props}
		/>
		
		{/* Bottom - What you can be PAID FOR (Profession) */}
		<AnimatedCircle
		  cx={centerX}
		  cy={centerY + offset}
		  r={radius}
		  stroke="#FFCE6B"
		  strokeWidth="2"
		  fill="rgba(255, 206, 107, 0.2)" // Very light fill
		  strokeDasharray={strokeDasharray}
		  animatedProps={circle3Props}
		/>
		
		{/* Left - What you are GOOD AT (Vocation) */}
		<AnimatedCircle
		  cx={centerX - offset}
		  cy={centerY}
		  r={radius}
		  stroke="#6BFFB2"
		  strokeWidth="2"
		  fill="rgba(107, 255, 178, 0.2)" // Very light fill
		  strokeDasharray={strokeDasharray}
		  animatedProps={circle4Props}
		/>
	  </Svg>
	);
  }

export default function WelcomeScreen() {
  return (
    <Layout style={styles.container}> 
      <IkigaiVennAnimation /> 
      <Text style={styles.title} status='primary' category='h1'>
        Ikigai.ai
      </Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    marginTop: 24,
  }
});