import React from 'react';
import { Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Layout } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';

type SampleScreenProp = StackScreenProps<RootStackParams>;
const SampleScreen: React.FC<SampleScreenProp> = ({ navigation }) => {
  return (
    <Layout>
      <Text>Sample screen!</Text>
      <Button
        title="뒤로가기"
        variant="outlined"
        onClick={() => {
          navigation.goBack();
        }}
      />
    </Layout>
  );
};

export default SampleScreen;
