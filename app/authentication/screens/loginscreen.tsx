import React, { useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { Button, Input, Layout, Text, Icon } from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import { ikigaiColors } from '../../theme/ikigai-theme';
import { textStyles } from '../../theme/ikigai-typography';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const router = useRouter();

  const handleLogin = () => {
    // Here you would add authentication logic
    console.log('Login with:', email, password);
    // For now, just navigate to homescreen
    router.push('/main/screens/homescreen');
  };

  const navigateToSignup = () => {
    router.push('/authentication/screens/signupscreen');
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  
  const renderEyeIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Layout style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Log in to your Ikigai account</Text>
        </View>
        
        <View style={styles.form}>
          <Input
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <Input
            style={styles.input}
            placeholder="Password"
            value={password}
            secureTextEntry={secureTextEntry}
            onChangeText={setPassword}
            accessoryRight={renderEyeIcon}
          />
          
          <Button style={styles.button} onPress={handleLogin}>
            Sign In
          </Button>
          
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <Text style={styles.signupLink} onPress={navigateToSignup}>Sign Up</Text>
          </View>
        </View>
      </Layout>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: ikigaiColors.mono.background,
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    ...textStyles.h1,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    ...textStyles.bodyMedium,
    textAlign: 'center',
    color: ikigaiColors.mono.text,
  },
  form: {
    width: '100%',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    borderRadius: 8,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    ...textStyles.bodyMedium,
    color: ikigaiColors.mono.text,
  },
  signupLink: {
    ...textStyles.bodyMedium,
    color: ikigaiColors.mono.text,
    fontWeight: 'bold',
  },
});