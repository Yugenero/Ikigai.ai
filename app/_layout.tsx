import React from 'react';
import { Stack } from "expo-router";
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ikigaiTheme } from './theme/ikigai-theme'; // import custom ikigai theme

// root layout/structure for the application + determines which screen to show
export default function RootLayout() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...ikigaiTheme }}>
        <Stack>
          {/** Main Routes */}
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="main/welcome" options={{ title: 'Welcome' }} />
          <Stack.Screen name="main/homescreen" options={{ title: 'Home' }} />

          {/** Authentication Routes */}
          <Stack.Screen name='authentication/login' options={{ title: 'Login' }} />

          {/** Dynamic Routes */}
        </Stack>
      </ApplicationProvider>
    </>
  );
}
