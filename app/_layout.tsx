import React, { useEffect, useState } from 'react';
import { Stack } from "expo-router";
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { loadFonts } from './theme/fonts';
import { ikigaiMonoTheme, ikigaiColors } from './theme/ikigai-theme';
import { textStyles } from './theme/ikigai-typography';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

// root layout/structure for the application + determines which screen to show
export default function RootLayout() {
  const [appFontsLoaded, setAppFontsLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Use your existing loadFonts function from fonts.ts
        await loadFonts();
        setAppFontsLoaded(true);
      } catch (e) {
        console.warn('Error loading fonts:', e);
        // Still set to true to prevent app from being stuck
        setAppFontsLoaded(true);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (appFontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [appFontsLoaded]);

  if (!appFontsLoaded) {
    return null;
  }

  return (
    <> 
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{...ikigaiMonoTheme}}>
        <Stack>

          {/** Main */}
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="main/homescreen" options={{ title: 'Home' }} />
          <Stack.Screen name="main/welcome" options={{ 
            title: 'Ikigai.ai',
            headerTitleAlign: 'center',
            headerStyle : {
              backgroundColor: ikigaiColors.mono.background,
            },
            headerTitleStyle: { 
              fontWeight: '700', 
              fontSize: textStyles.h2.fontSize,
            },
            headerShadowVisible: false,
            headerTintColor: ikigaiColors.mono.text,
          }} />

          {/** Authentication */}
          <Stack.Screen name='main/profile' options={{ title: 'Profile'}}/>
          <Stack.Screen name='authentication/login' options={{ title: 'Login' }} />
        </Stack>
      </ApplicationProvider>
    </>
  );
}