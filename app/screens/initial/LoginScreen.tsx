import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Input, Box, Text, Spacer } from 'native-base';
import { Layout } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';

type LoginScreenProp = StackScreenProps<RootStackParams>;
const LoginScreen: React.FC<LoginScreenProp> = ({ navigation }) => {
  const [userInfo, setUserInfo] = React.useState({
    userId: '',
    userPw: '',
  });

  const handleId = (event: any) =>
    setUserInfo({ ...userInfo, userId: event.target.value });

  const handlePw = (event: any) =>
    setUserInfo({ ...userInfo, userPw: event.target.value });

  return (
    <Layout>
      <Box mb="5" mt="32">
        <Text fontSize="xs" fontWeight="bold" mb="4">
          아이디
        </Text>
        <Input
          value={userInfo.userId}
          variant="filled"
          placeholder="이메일을 입력해주세요"
          onChange={handleId}
        />
      </Box>
      <Box mb="5">
        <Text fontSize="xs" fontWeight="bold" mb="4">
          비밀번호
        </Text>
        <Input
          value={userInfo.userPw}
          variant="filled"
          placeholder="비밀번호를 입력해주세요"
          onChange={handlePw}
          type="password"
        />
      </Box>
      <Spacer />
      <Button
        variant={userInfo.userId !== '' ? 'solid' : 'disabled'}
        isDisabled={userInfo.userId !== '' ? false : true}
        onPress={() => navigation.navigate('Main')}
      >
        로그인
      </Button>
    </Layout>
  );
};

export default LoginScreen;
