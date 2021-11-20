import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigators/RootStackParams';

import { Flex, Text } from 'native-base';
import { Button } from 'native-base';
import { Layout } from '../../components';
import { useGetRequest } from '../../config/api';

type InitScreenProp = StackScreenProps<RootStackParams, 'Init'>;
const InitScreen: React.FC<InitScreenProp> = ({ navigation }) => {
  const { data } = useGetRequest('/me');
  // 현재 인증 토큰이 앱 안에 들어있으면 메인 페이지로 리다이렉트하기.
  React.useEffect(() => {
    if (data) navigation.replace('Main');
  }, [data]);
  return (
    <Layout>
      <Flex mt="48" direction="column" justify="center">
        <Flex justify="center" align="center">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            mb="10"
            textAlign="center"
          >{`주마주마로\n내가 산 주식을 응원하세요`}</Text>
        </Flex>
        <Button
          mb="2"
          variant="solid"
          onPress={() => navigation.navigate('Login')}
        >
          로그인
        </Button>
        <Button variant="outline" onPress={() => navigation.navigate('SignUp')}>
          회원가입
        </Button>
      </Flex>
    </Layout>
  );
};

export default InitScreen;
