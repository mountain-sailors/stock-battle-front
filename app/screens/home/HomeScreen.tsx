import React from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import { StatusBar, Text } from 'react-native';
import { RootStackParams } from '../../navigators/RootStackParams';
import { MainBottomParams } from '../../navigators/MainBottomParams';
import { Button, Input, Layout } from '../../components';

type HomeScreenProp = CompositeScreenProps<
  BottomTabScreenProps<MainBottomParams, 'Home'>,
  StackScreenProps<RootStackParams>
>;
const HomeScreen: React.FC<HomeScreenProp> = ({ navigation }) => {
  const [value, setValue] = React.useState('');
  return (
    <Layout>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar barStyle="dark-content" />
      <Button
        title="Sample 바로가기"
        variant="outlined"
        onClick={() => {
          navigation.navigate('Sample');
        }}
      />
      <Input
        value={value}
        placeholder="내용을 입력해주세요"
        onChangeText={setValue}
      />
    </Layout>
  );
};

export default HomeScreen;
