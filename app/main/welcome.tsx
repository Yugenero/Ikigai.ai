import React, { useState, useEffect, useRef } from 'react';
import { Text, Layout, Button } from '@ui-kitten/components';
import { StyleSheet, View, Animated, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import IkigaiVennAnimation from '../components/vennAnimation';
import { ikigaiStyles } from '../theme/ikigai-styles';
import { textStyles } from '../theme/ikigai-typography';
import { ikigaiColors } from '../theme/ikigai-theme';

export default function WelcomeScreen() {
  const router = useRouter();
  const [animationComplete, setAnimationComplete] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const buttonsFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Timer to simulate waiting for Venn diagram animation completion
    const timer = setTimeout(() => {
      setAnimationComplete(true);
      
      // Fade in explanation text
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        // Only use native driver on platforms that support it
        useNativeDriver: Platform.OS !== 'web',
      }).start(() => {
        // After explanation appears, fade in buttons
        setTimeout(() => {
          Animated.timing(buttonsFadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: Platform.OS !== 'web',
          }).start();
        }, 500);
      });
    }, 6000); // Adjust this timing to match your Venn animation length

    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    // Fix the route to match the file structure we're creating
    router.push('/authentication/signup');
  };

  const handleSignIn = () => {
    router.push('/authentication/login');
  };

  return (
    <Layout style={styles.container}> 
      <View style={styles.animationContainer}>
        <IkigaiVennAnimation />
      </View>

      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Find Your Ikigai</Text>
        
        <Text style={styles.explanation}>
          Ikigai, 生き甲斐, is the Japanese concept of finding purpose in life - 
          the intersection of what you love, what you're good at, 
          what the world needs, and what you can be paid for.
        </Text>
      </Animated.View>
      
      <Animated.View style={[styles.buttonContainer, { opacity: buttonsFadeAnim }]}>
        <Button 
          style={styles.button} 
          onPress={handleGetStarted}
          appearance='filled'
        >
          Get Started
        </Button>
        
        <Button 
          style={styles.button} 
          onPress={handleSignIn}
          appearance='outline'
          status='basic'
        >
          Sign In
        </Button>
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
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    zIndex: 2,
  },
  title: {
    ...textStyles.h1,
    color: ikigaiColors.mono.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  explanation: {
    ...textStyles.bodyLarge,
    color: ikigaiColors.mono.text,
    textAlign: 'center',
    marginBottom: 48,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    paddingHorizontal: 32,
    zIndex: 3,
    gap: 16,
  },
  button: {
    borderRadius: 8,
    marginVertical: 8,
  }
});