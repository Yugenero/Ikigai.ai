import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Platform, Alert } from 'react-native';
import { Layout, Text, Button, Divider, Spinner } from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import { ikigaiColors } from '../../theme/ikigai-theme';
import { textStyles } from '../../theme/ikigai-typography';
import * as WebBrowser from 'expo-web-browser';
import { GoogleSignin, isSuccessResponse, isErrorWithCode, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { googleSignIn, appleSignIn } from '../services/authService';
import * as AppleAuthentication from 'expo-apple-authentication';
import { GoogleLogo } from '../components/googlesvg'
import { useEffect } from 'react';
import Constants from 'expo-constants';

// Important for Google Auth flow
WebBrowser.maybeCompleteAuthSession();

export default function SignupScreen() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Google Sign-In configuration with complete set of options
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Constants.expoConfig?.extra?.googleWebClientId,
      iosClientId: Constants.expoConfig?.extra?.googleIosClientId,
      profileImageSize: 120,
      // Force the account picker dialog to show every time
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try { 
      setIsSubmitting(true);
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        const { idToken, user } = response.data;
        if (idToken) { await googleSignIn(idToken) };
        router.replace('/main/screens/homescreen');
      } else {
        // TODO: Show error message to user on interface  
        console.log('Google Sign-In failed. Please try again.');
      } 
      setIsSubmitting(false);
      router.replace('/main/screens/homescreen');
    }

    // Handle errors
    catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.log('Sign-in is in progress');
          default:
            console.error('Google Sign-In error:', error);
        }
      } else {
        console.error('Google Sign-In error:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle Apple sign-in
  const handleAppleSignIn = async () => {
    try {
      setIsSubmitting(true);
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
      setIsSubmitting(false);
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
      
      {isSubmitting && (
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
          disabled={isSubmitting}
          accessoryLeft={GoogleLogo}
          onPress={() => {
            handleGoogleSignIn();
          }}
        >
          Continue with Google
        </Button>

        {/* <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={handleGoogleSignIn}
          disabled={isSubmitting}
        /> */}
        
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

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={navigateToLogin} disabled={isSubmitting}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
}

// Page Styles
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
    borderWidth: 0.5,
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