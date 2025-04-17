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
  
  // Create separate animation values for each text element
  const titleFadeAnim = useRef(new Animated.Value(0)).current;
  const sentence1FadeAnim = useRef(new Animated.Value(0)).current;
  const sentence2FadeAnim = useRef(new Animated.Value(0)).current;
  const buttonsFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Timer to wait for Venn diagram animation completion
    const timer = setTimeout(() => {
      setAnimationComplete(true);
      
      // Sequence of animations
      const animationSequence = Animated.sequence([
        // First fade in the title
        Animated.timing(titleFadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: Platform.OS !== 'web',
        }),
        
        Animated.timing(sentence1FadeAnim, {
          toValue: 1,
          duration: 800,
          delay: 300,
          useNativeDriver: Platform.OS !== 'web',
        }),
        
        Animated.timing(sentence2FadeAnim, {
          toValue: 1,
          duration: 800,
          delay: 300,
          useNativeDriver: Platform.OS !== 'web',
        }),
        
        Animated.timing(buttonsFadeAnim, {
          toValue: 1,
          duration: 800,
          delay: 400,
          useNativeDriver: Platform.OS !== 'web',
        })
      ]);
      
      animationSequence.start();
      
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    router.push('/authentication/signupscreen');
  };

  const handleLoginScreen = () => {
    router.push('/authentication/loginscreen');
  };

  return (
    <Layout style={styles.container}> 
      <View style={styles.animationContainer}>
        <IkigaiVennAnimation />
      </View>

      <View style={styles.contentWrapper}>
        {/* Title fades in first */}
        <Animated.View style={{ opacity: titleFadeAnim }}>
          <Text style={styles.title}>Find Your Purpose</Text>
        </Animated.View>
        
        {/* First sentence fades in second */}
        <Animated.View style={{ opacity: sentence1FadeAnim }}>
          <Text style={styles.explanation}>
            Ikigai (生き甲斐) is the Japanese concept of finding purpose in life.
          </Text>
        </Animated.View>
        
        {/* Second sentence fades in third */}
        <Animated.View style={{ opacity: sentence2FadeAnim }}>
          <Text style={styles.explanation}>
            It's the intersection of what you love, what you're good at, 
            what the world needs, and what you can be paid for.
          </Text>
        </Animated.View>
      </View>
      
      {/* Buttons fade in last */}
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
          onPress={handleLoginScreen}
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
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40, 
    zIndex: 2,
    marginTop: -40,
  },
  title: {
    ...textStyles.h1,
    color: ikigaiColors.mono.text,
    marginBottom: 32, 
    textAlign: 'center',
  },
  explanation: {
    ...textStyles.bodyMedium, 
    color: ikigaiColors.mono.text,
    textAlign: 'center',
    marginBottom: 16, 
    lineHeight: 22, 
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    paddingHorizontal: 40, 
    zIndex: 3,
    gap: 16,
  },
  button: {
    borderRadius: 8,
    marginVertical: 8,
  }
});