import React, { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  // You could add logic here to determine where to redirect
  // For example, check if user is logged in and redirect accordingly
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      {/* Redirect to welcome screen */}
      <Redirect href="/main/screens/welcome" />
    </View>
  );
}

