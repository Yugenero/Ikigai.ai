import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Platform, Alert } from 'react-native';
import { Layout, Text, Button, Divider, Spinner } from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import { ikigaiColors } from '../../theme/ikigai-theme';
import { textStyles } from '../../theme/ikigai-typography';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useEffect } from 'react';
import { googleSignIn, appleSignIn } from '../services/authService';
import Constants from 'expo-constants';

// Important for Google Auth flow
WebBrowser.maybeCompleteAuthSession();

export default function SignupScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // Google Sign-In configuration with complete set of options
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: Constants.expoConfig?.extra?.googleWebClientId,
    iosClientId: Constants.expoConfig?.extra?.googleIosClientId,
    // We'll use idToken flow instead of accessToken for better compatibility
  });
  
  // Handle Google auth response
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      handleGoogleSuccess(id_token);
    } else if (response?.type === 'error') {
      Alert.alert(
        'Authentication Error',
        'There was a problem signing in with Google. Please try again.',
        [{ text: 'OK' }]
      );
      setIsLoading(false);
    }
  }, [response]);

  // Handle Google sign-in button press
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      if (!request) {
        Alert.alert(
          'Configuration Error', 
          'Google authentication is not properly configured.',
          [{ text: 'OK' }]
        );
        setIsLoading(false);
        return;
      }
      await promptAsync();
    } catch (error) {
      console.error('Error initiating Google sign-in:', error);
      Alert.alert(
        'Authentication Error',
        'Failed to start Google authentication',
        [{ text: 'OK' }]
      );
      setIsLoading(false);
    }
  };

  // Handle successful Google sign-in
  const handleGoogleSuccess = async (idToken: string) => {
    try {
      const user = await googleSignIn(idToken);
      if (user) {
        router.replace('/main/screens/homescreen');
      } else {
        throw new Error('User data not returned');
      }
    } catch (error) {
      console.error('Error during Google sign-in:', error);
      Alert.alert(
        'Authentication Error',
        'There was a problem completing your sign-in. Please try again.',
        [{ text: 'OK' }]
      );
    }
    setIsLoading(false);
  };
  
  // Handle Apple sign-in
  const handleAppleSignIn = async () => {
    try {
      setIsLoading(true);
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      
      await appleSignIn(credential);
      router.replace('/main/screens/homescreen');
    } catch (error: any) {
      console.error('Error during Apple sign-in:', error);
      if (error?.code !== 'ERR_REQUEST_CANCELED') {
        Alert.alert(
          'Authentication Error',
          'There was a problem signing in with Apple. Please try again.',
          [{ text: 'OK' }]
        );
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  // Navigate to login screen
  const navigateToLogin = () => {
    router.push('/authentication/screens/loginscreen');
  };

  // Navigate to email signup screen
  const navigateToEmailSignup = () => {
    // Implement this when you have an email signup screen
    console.log("email button pressed");
  };

  return (
    <Layout style={styles.container}>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <Spinner size="large" />
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to start your journey</Text>
        
        {/* Google Sign-in Button */}
        <Button
          style={styles.socialButton}
          appearance="outline"
          onPress={handleGoogleSignIn}
          disabled={isLoading}
          accessoryLeft={() => (
            <Image 
              source={require('../../../assets/images/google-icon.png')} 
              style={styles.socialIcon} 
            />
          )}
        >
          Continue with Google
        </Button>
        
        {/* Apple Sign-in Button - Only show on iOS */}
        {Platform.OS === 'ios' && (
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={8}
            style={styles.appleButton}
            onPress={handleAppleSignIn}
          />
        )}
        
        <View style={styles.dividerContainer}>
          <Divider style={styles.divider} />
          <Text style={styles.dividerText}>or</Text>
          <Divider style={styles.divider} />
        </View>
        
        {/* Standard Email Signup Button */}
        <Button 
          style={styles.emailButton} 
          onPress={navigateToEmailSignup}
          disabled={isLoading}>
          Sign up with Email
        </Button>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={navigateToLogin} disabled={isLoading}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ikigaiColors.mono.background,
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  title: {
    ...textStyles.h1,
    color: ikigaiColors.mono.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    ...textStyles.bodyMedium,
    color: ikigaiColors.mono.text,
    marginBottom: 32,
    textAlign: 'center',
  },
  socialButton: {
    marginBottom: 16,
    width: '100%',
    maxWidth: 320,
    borderColor: ikigaiColors.mono.text,
    borderRadius: 8,
  },
  socialIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  appleButton: {
    width: '100%',
    maxWidth: 320,
    height: 48, 
    marginBottom: 16,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    width: '100%',
    maxWidth: 320,
  },
  divider: {
    flex: 1,
    backgroundColor: ikigaiColors.mono.text + '40',
  },
  dividerText: {
    ...textStyles.bodyMedium,
    color: ikigaiColors.mono.text,
    marginHorizontal: 16,
  },
  emailButton: {
    width: '100%',
    maxWidth: 320,
    marginBottom: 24,
    borderRadius: 8,
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 32,
  },
  loginText: {
    ...textStyles.bodyMedium,
    color: ikigaiColors.mono.text,
  },
  loginLink: {
    ...textStyles.bodyMedium,
    color: ikigaiColors.mono.text,
    fontWeight: 'bold',
  },
});