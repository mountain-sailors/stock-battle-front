import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { useToast } from 'native-base';
import * as SecureStore from 'expo-secure-store';

import { callAPI } from '../../config/api';
import { Layout } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';
import WebView from 'react-native-webview';
import { runFirst } from '../../config/consts';
import { NAVER_CLIENT_ID, REDIRECT_URI } from '../../../env.json';

type NaverLoginScreenProp = StackScreenProps<RootStackParams>;
const NaverLoginScreen: React.FC<NaverLoginScreenProp> = ({ navigation }) => {
  const toast = useToast();
  const LogInProgress = (data: any) => {
    const [codeParam, stateParam] = data.split('&');
    const exp = 'code=';
    const condition = codeParam.indexOf(exp);
    if (condition != -1 && stateParam) {
      const code = codeParam.substring(condition + exp.length);
      // post api 호출
      callAPI('/oauth/naver', 'POST', { code })
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
        source={{
          uri: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript={runFirst}
        javaScriptEnabled={true}
        onMessage={(event) => {
          LogInProgress(event.nativeEvent.url);
        }}
      />
    </Layout>
  );
};

export default NaverLoginScreen;
