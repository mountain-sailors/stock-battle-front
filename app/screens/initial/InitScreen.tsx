import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigators/RootStackParams';

import { Image, Flex, Text, Center, VStack, Icon } from 'native-base';
import { Button } from 'native-base';
import { Layout } from '../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
          <Button
            variant="solid"
            bgColor="#2DB400"
            onPress={() => navigation.navigate('NaverLogin')}
            leftIcon={
              <Icon
                as={Entypo}
                name="link"
                color="coolGray.800"
                _dark={{
                  color: 'warmGray.50',
                }}
                size="sm"
              />
            }
          >
            Naver 로그인
          </Button>
          <Button
            variant="solid"
            bgColor="#FFEA00"
            _text={{ color: 'black' }}
            onPress={() => navigation.navigate('KakaoLogin')}
            leftIcon={
              <Icon
                as={MaterialCommunityIcons}
                name="chat"
                color="coolGray.800"
                _dark={{
                  color: 'warmGray.50',
                }}
                size="sm"
              />
            }
          >
            Kakao 로그인
          </Button>
          <Button
            variant="solid"
            onPress={() => navigation.navigate('GithubLogin')}
            leftIcon={
              <Icon
                as={AntDesign}
                name="github"
                color="coolGray.100"
                _dark={{
                  color: 'warmGray.50',
                }}
                size="sm"
              />
            }
          >
            Github 로그인
          </Button>
        </VStack>
      </Flex>
    </Layout>
  );
};

export default InitScreen;
