import React  from 'react';
import { Text, Layout } from '@ui-kitten/components';
import { ikigaiStyles } from '../theme/ikigai-styles';
import { StyleSheet } from 'react-native';
import IkigaiVennAnimation from '../components/vennAnimation';

export default function WelcomeScreen() {
  return (
    <Layout style={ikigaiStyles.centeredContainer}> 
      <IkigaiVennAnimation /> 
	    {/**<IkigaiWelcomeFadeIn />**/}
    </Layout>
  );
}