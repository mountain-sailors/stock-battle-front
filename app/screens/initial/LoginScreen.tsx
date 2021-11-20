import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { useToast, Button, Input, Spacer, FormControl } from 'native-base';
import * as SecureStore from 'expo-secure-store';

import { callAPI } from '../../config/api';
import { Layout } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';

type UserInfo = {
  email: string;
  password: string;
};
type Error = Partial<UserInfo>;

type LoginScreenProp = StackScreenProps<RootStackParams>;
const LoginScreen: React.FC<LoginScreenProp> = ({ navigation }) => {
  const toast = useToast();
  const [userInfo, setUserInfo] = React.useState<UserInfo>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = React.useState<Error>({});

  const validate = () => {
    if (userInfo.email === '') {
      setErrors({
        ...errors,
        email: '이메일을 입력해주세요',
      });
      return false;
    } else {
      delete errors.email;
    }
    if (userInfo.password === '') {
      setErrors({
        ...errors,
        password: '비밀번호를 입력해주세요',
      });
      return false;
    } else {
      delete errors.password;
    }
    return true;
  };

  const handlePress = () => {
    // 유효한 값이 아닌 경우 에러. ex) 이메일, 비밀번호가 empty string일 때
    const isValidate = validate();
    if (isValidate === false) return;
    // post api 호출
    callAPI('/user/login', 'POST', {
      email: userInfo.email,
      password: userInfo.password,
    })
      .then((res) => res.json())
      .then(async (res) => {
        // 응답 body에 토큰이 있다면 로그인에 성공했다는 뜻이므로 secureStore에 토큰 집어넣고 메인 페이지 이동
        if (res.token) {
          await SecureStore.setItemAsync('token', res.token);
          navigation.replace('Main');
        } else if (!res.token) {
          // 없다면 로그인에 실패했으므로 에러 메시지만 출력
          toast.show({
            status: 'error',
            title: '로그인 실패',
            description: '이메일 또는 비밀번호가 올바르지 않습니다.',
          });
        }
      });
  };

  return (
    <Layout>
      <FormControl isRequired isInvalid={'email' in errors} mb="5" mt="32">
        <FormControl.Label
          mb="4"
          _text={{ fontSize: 'md', fontWeight: 'bold' }}
        >
          이메일
        </FormControl.Label>
        <Input
          value={userInfo.email}
          variant="filled"
          type="email"
          keyboardType="email-address"
          placeholder="이메일을 입력해주세요"
          onChangeText={(value: string) =>
            setUserInfo({ ...userInfo, email: value })
          }
        />
        {'email' in errors && (
          <FormControl.ErrorMessage
            _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}
          >
            {errors.email}
          </FormControl.ErrorMessage>
        )}
      </FormControl>
      <FormControl isRequired isInvalid={'password' in errors} mb="5">
        <FormControl.Label
          mb="4"
          _text={{ fontSize: 'md', fontWeight: 'bold' }}
        >
          비밀번호
        </FormControl.Label>
        <Input
          value={userInfo.password}
          variant="filled"
          type="password"
          placeholder="비밀번호를 8자 이상 입력해주세요"
          onChangeText={(value: string) =>
            setUserInfo({ ...userInfo, password: value })
          }
        />
        {'password' in errors && (
          <FormControl.ErrorMessage
            _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}
          >
            {errors.password}
          </FormControl.ErrorMessage>
        )}
      </FormControl>
      <Spacer />
      <Button
        variant={userInfo.email !== '' ? 'solid' : 'disabled'}
        isDisabled={userInfo.email !== '' ? false : true}
        onPress={handlePress}
      >
        로그인
      </Button>
    </Layout>
  );
};

export default LoginScreen;
