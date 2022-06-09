import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { useToast } from 'native-base';
import * as SecureStore from 'expo-secure-store';

import { callAPI } from '../../config/api';
import { Layout } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';
import WebView from 'react-native-webview';
// import { KAKAO_CLIENT_ID } from '../../../env.json';

const KAKAO_CLIENT_ID = 'a3b7d31f1dc8b719b1d0ca006dce2487';
const REDIRECT_URI = 'https://zumazuma-login-callback.netlify.app/';

type KakaoLoginScreenProp = StackScreenProps<RootStackParams>;
const KakaoLoginScreen: React.FC<KakaoLoginScreenProp> = ({ navigation }) => {
  const toast = useToast();
  const LogInProgress = (data: any) => {
    const exp = 'code=';
    const condition = data.indexOf(exp);
    if (condition != -1) {
      const code = data.substring(condition + exp.length);
      console.log('access code :: ' + code);
      // post api 호출
      callAPI('/oauth/kakao', 'POST', { code })
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
    }
  };

  return (
    <Layout>
      <WebView
        originWhitelist={['*']}
        scalesPageToFit={false}
        style={{ marginTop: 30 }}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`,
        }}
        javaScriptEnabled={true}
        onMessage={(event) => {
          LogInProgress(event.nativeEvent.url);
        }}
      />
    </Layout>
  );
};

export default KakaoLoginScreen;
