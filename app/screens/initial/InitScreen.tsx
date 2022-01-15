import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigators/RootStackParams';

import { Image, Flex, Text, Center, VStack } from 'native-base';
import { Button } from 'native-base';
import { Layout } from '../../components';
// import { useGetRequest } from '../../config/api';

type InitScreenProp = StackScreenProps<RootStackParams, 'Init'>;
const InitScreen: React.FC<InitScreenProp> = ({ navigation }) => {
  // XXX: 기능 제대로 구현 안됨. 나중에 해결 필요.
  // const { data } = useGetRequest('/me');
  // 현재 인증 토큰이 앱 안에 들어있으면 메인 페이지로 리다이렉트하기.
  // React.useEffect(() => {
  //   if (data && data?.userId !== undefined) {
  //     navigation.reset({ routes: [{ name: 'Main' }] });
  //   }
  // }, []);
  return (
    <Layout>
      <Flex mt="48" direction="column" justify="center">
        <Flex justify="center" align="center">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            mb="8"
            textAlign="center"
          >{`주마주마로\n내가 산 주식을 응원하세요`}</Text>
        </Flex>
        <Center mb={8}>
          <Image
            width={250}
            height={100}
            source={require('../../../assets/images/character4.png')}
            alt="character"
          />
        </Center>
        <VStack space={2}>
          <Button variant="solid" onPress={() => navigation.navigate('Login')}>
            로그인
          </Button>
          <Button
            variant="outline"
            onPress={() => navigation.navigate('Agreement')}
          >
            회원가입
          </Button>
          <Button
            variant="ghost"
            onPress={() => navigation.navigate('FindPassword')}
          >
            비밀번호 찾기
          </Button>
        </VStack>
      </Flex>
    </Layout>
  );
};

export default InitScreen;
