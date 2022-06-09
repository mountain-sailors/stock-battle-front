import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigators/RootStackParams';
import * as SecureStore from 'expo-secure-store';
// import * as Google from 'expo-auth-session/providers/google';

import { useToast, Image, Flex, Text, Center, VStack, Icon } from 'native-base';
import { Button } from 'native-base';
import { Layout } from '../../components';
import { callAPI } from '../../config/api';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

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
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   expoClientId:
  //     '1079949565774-c8s64p5bl7o05q3piligb56l0qlusief.apps.googleusercontent.com',
  //   iosClientId:
  //     '1079949565774-9qss4o4n6qvvb0vekaupp5rk527qa26t.apps.googleusercontent.com',
  //   androidClientId:
  //     '1079949565774-87en2anno6fc2196ph5h1uumj76t4ud7.apps.googleusercontent.com',
  //   webClientId:
  //     '1079949565774-c8s64p5bl7o05q3piligb56l0qlusief.apps.googleusercontent.com',
  //   responseType: 'code',
  // });

  // React.useEffect(() => {
  //   if (response?.type === 'success') {
  //     const { authentication } = response;
  //     console.log(authentication);
  //   }
  // }, [response]);

  const toast = useToast();
  const handlePress = (thirdParty: string) => {
    let endPoint;
    if (thirdParty === 'google') endPoint = '/oauth/google';
    else if (thirdParty === 'kakao') endPoint = '/oauth/kakao';
    else endPoint = '/oauth/github';

    // post api 호출
    callAPI(endPoint, 'POST', {})
      .then((res) => res.json())
      .then(async (res) => {
        // 응답 body에 토큰이 있다면 로그인에 성공했다는 뜻이므로 secureStore에 토큰 집어넣고 메인 페이지 이동
        if (res.token) {
          await SecureStore.setItemAsync('token', res.token);
          await navigation.reset({ routes: [{ name: 'Main' }] });
        } else if (!res.token) {
          // 없다면 로그인에 실패했으므로 에러 메시지만 출력
          toast.show({
            status: 'error',
            title: '로그인 실패',
            description: '올바르지 않은 접근입니다.',
          });
        }
      });
  };
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
            variant="filledGreen"
            // onPress={() => navigation.navigate('GoogleLogin')}
            leftIcon={
              <Icon
                as={Entypo}
                name="user"
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
            variant="filled"
            onPress={() => navigation.navigate('KakaoLogin')}
            leftIcon={
              <Icon
                as={Entypo}
                name="message"
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
            onPress={() => handlePress('github')}
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
          {/* <Button variant="solid" onPress={() => navigation.navigate('Login')}>
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
          </Button> */}
        </VStack>
      </Flex>
    </Layout>
  );
};

export default InitScreen;
