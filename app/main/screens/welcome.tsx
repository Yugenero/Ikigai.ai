import React, { useState, useEffect, useRef } from 'react';
import { Text, Layout, Button } from '@ui-kitten/components';
import { StyleSheet, View, Animated, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import IkigaiVennAnimation from '../components/vennAnimation';
import { ikigaiStyles } from '../../theme/ikigai-styles';
import { textStyles } from '../../theme/ikigai-typography';
import { ikigaiColors } from '../../theme/ikigai-theme';

export default function WelcomeScreen() {
  const router = useRouter();
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Create separate animation values
  const explanationContainerAnim = useRef(new Animated.Value(0)).current;
  const actionsContainerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Timer to wait for Venn diagram animation
    const timer = setTimeout(() => {
      setAnimationComplete(true);
      
      // Sequence of animations
      const animationSequence = Animated.sequence([
        // First fade in the explanation
        Animated.timing(explanationContainerAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: Platform.OS !== 'web',
        }),
        
        // Hold for reading time
        Animated.delay(4000),
        
        // Fade out explanation
        Animated.timing(explanationContainerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: Platform.OS !== 'web',
        }),
        
        // Fade in title and buttons together
        Animated.timing(actionsContainerAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]);
      
      animationSequence.start();
      
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    router.push('/authentication/screens/signupscreen');
  };

  const handleLoginScreen = () => {
    router.push('/authentication/screens/loginscreen');
  };

  return (
    <Layout style={styles.container}> 
      {/* Venn Diagram Layer */}
      <View style={styles.animationContainer}>
        <IkigaiVennAnimation />
      </View>

      {/* Explanation Container */}
      <Animated.View style={[styles.centeredContent, { opacity: explanationContainerAnim }]}>    
        <Text style={styles.explanation}>
          Ikigai (生き甲斐) is the Japanese concept of finding purpose in life.
        </Text>
        
        <Text style={styles.explanation}>
          It's the intersection of what you love, what you're good at, 
          what the world needs, and what you can be paid for.
        </Text>
      </Animated.View>
      
      {/* Title and Buttons Container */}
      <Animated.View style={[styles.centeredContent, { opacity: actionsContainerAnim }]}>
        <Text style={styles.title}>Find Your Purpose</Text>
        
        <View style={styles.buttonGroup}>
          <Button 
            style={styles.button} 
            onPress={handleGetStarted}
            appearance='outline'>
            Get Started
          </Button>

          <Button 
            style={styles.button} 
            onPress={handleLoginScreen}
            appearance='outline'
            status='basic'>
            Sign In
          </Button>
        </View>
      </Animated.View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ikigaiColors.mono.background,
  },
  animationContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  centeredContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    zIndex: 2,
  },
  title: {
    ...textStyles.h2,
    color: ikigaiColors.mono.text,
    marginBottom: 40,
    textAlign: 'center',
  },
  explanation: {
    ...textStyles.bodyMedium,
    color: ikigaiColors.mono.text,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
  },
  buttonGroup: {
    width: '100%',
    maxWidth: 300,
    gap: 16,
  },
  button: {
    borderRadius: 8,
    marginVertical: 8,
  }
});