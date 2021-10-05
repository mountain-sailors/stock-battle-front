import React from 'react';
import { StatusBar, Text } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import Layout from '../components/Layout';

const HomeScreen: React.FC = () => {
  const [value, setValue] = React.useState('');
  return (
    <Layout>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar barStyle="dark-content" />
      <Button title="이것은 버튼" variant="outlined" onClick={() => {}} />
      <Input value={value} placeholder="내용을 입력해주세요" onChangeText={setValue} />
    </Layout>
  );
}

export default HomeScreen;
