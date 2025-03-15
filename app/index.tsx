import React from 'react';
import { View } from "react-native";
import { Button, Layout, Text, Card } from '@ui-kitten/components';

export default function Index() {
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <Card style={{ margin: 8 }}>
        <Text category='h1'>UI Kitten Example</Text>
        <Text category='s1' style={{ marginVertical: 16 }}>
          UI Kitten is successfully installed and working!
        </Text>
        <Button>BUTTON</Button>
      </Card>
    </Layout>
  );
}
