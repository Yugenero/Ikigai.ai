import React, { useEffect } from 'react';
import Svg, { Circle } from 'react-native-svg';
import Animated, { 
	useSharedValue, 
	useAnimatedProps, 
	withTiming, 
	withSequence,
	withDelay,
	Easing
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
// For a 4-circle Venn diagram animation
export default function IkigaiVennAnimation() {
	// Radius of each circle
	const radius = 50;
	// Circumference of the circle (2 * PI * r)
	const circumference = 2 * Math.PI * radius;
	
	// Create shared values for circle drawing animation
	const dashOffset1 = useSharedValue(circumference);
	const dashOffset2 = useSharedValue(circumference);
	const dashOffset3 = useSharedValue(circumference);
	const dashOffset4 = useSharedValue(circumference);
	const opacity = useSharedValue(0);
  
	const drawDuration = 1500;
    const pauseDuration = 3000; // Time to wait before reversing
    const undrawDuration = 1500;
    
    useEffect(() => {
		// Fade in all circles
		opacity.value = withTiming(1, { duration: 300 });
		
		// Draw animation + undraw animation sequence
		const drawDuration = 1000;
		const pauseDuration = 1500; // Time to wait before reversing
		const undrawDuration = 1000;
		
		// Circle 1 - Draw then undraw
		dashOffset1.value = withSequence(
		  // First draw the circle
		  withDelay(300, withTiming(0, { 
			duration: drawDuration, 
			easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
		  })),
		  // Then wait
		  withDelay(pauseDuration, withTiming(0, { duration: 1 })),
		  // Then undraw the circle
		  withTiming(circumference, { 
			duration: undrawDuration, 
			easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
		  })
		);
		
		dashOffset2.value = withSequence(
		  withDelay(600, withTiming(0, { 
			duration: drawDuration, 
			easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
		  })),
		  withDelay(pauseDuration - 300, withTiming(0, { duration: 1 })),
		  withTiming(circumference, { 
			duration: undrawDuration, 
			easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
		  })
		);
		
		dashOffset3.value = withSequence(
		  withDelay(900, withTiming(0, { 
			duration: drawDuration, 
			easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
		  })),
		  withDelay(pauseDuration - 600, withTiming(0, { duration: 1 })),
		  withTiming(circumference, { 
			duration: undrawDuration, 
			easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
		  })
		);

		dashOffset4.value = withSequence(
		  withDelay(1200, withTiming(0, { 
			duration: drawDuration, 
			easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
		  })),
		  withDelay(pauseDuration - 900, withTiming(0, { duration: 1 })),
		  withTiming(circumference, { 
			duration: undrawDuration, 
			easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
		  })
		);
		
		
	  }, []);
  
	// Create animated props for each circle
	const circle1Props = useAnimatedProps(() => {
	  return {
		opacity: opacity.value,
		strokeDashoffset: dashOffset1.value,
	  };
	});
	
	const circle2Props = useAnimatedProps(() => {
	  return {
		opacity: opacity.value,
		strokeDashoffset: dashOffset2.value,
	  };
	});
	
	const circle3Props = useAnimatedProps(() => {
	  return {
		opacity: opacity.value,
		strokeDashoffset: dashOffset3.value,
	  };
	});
	
	const circle4Props = useAnimatedProps(() => {
	  return {
		opacity: opacity.value,
		strokeDashoffset: dashOffset4.value,
	  };
	});
	
	// Center point of the diamond pattern
	const centerX = 100;
	const centerY = 100;
	
	// Distance from center for diamond layout
	const offset = 40; // Controls overlap amount
  
	return (
	  <Svg height="400" width="100%" viewBox="0 0 200 200">
		{/* Top - What you LOVE (Passion) */}
		<AnimatedCircle
		  cx={centerX}
		  cy={centerY - offset}
		  r={radius}
		  // stroke="#FF6B6B" 
		  stroke="#FFFFFF"
		  fill="transparent"
		  strokeWidth='0.5'
		  strokeDasharray={circumference}
		  animatedProps={circle1Props}
		/>
		
		{/* Right - What the world NEEDS (Mission) */}
		<AnimatedCircle
		  cx={centerX + offset}
		  cy={centerY}
		  r={radius}
		  // stroke="#6BB2FF"
		  stroke="#FFFFFF"
		  fill="transparent"
		  strokeWidth='0.5'
		  strokeDasharray={circumference}
		  animatedProps={circle2Props}
		/>
		
		{/* Bottom - What you can be PAID FOR (Profession) */}
		<AnimatedCircle
		  cx={centerX}
		  cy={centerY + offset}
		  r={radius}
		  // stroke="#FFCE6B"
		  stroke="#FFFFFF"
		  fill="transparent"
		  strokeWidth='0.5'
		  strokeDasharray={circumference}
		  animatedProps={circle3Props}
		/>
		
		{/* Left - What you are GOOD AT (Vocation) */}
		<AnimatedCircle
		  cx={centerX - offset}
		  cy={centerY}
		  r={radius}
		  // stroke="#6BFFB2"
		  fill="transparent"
		  stroke="#FFFFFF"
		  strokeWidth='0.5'
		  strokeDasharray={circumference}
		  animatedProps={circle4Props}
		/>
	  </Svg>
	);
  }