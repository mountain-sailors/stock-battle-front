/* eslint-disable @typescript-eslint/dot-notation */
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import {
  useToast,
  Avatar,
  Button,
  Input,
  Flex,
  Box,
  Text,
  Spacer,
  FormControl,
  VStack,
} from 'native-base';

import { callAPI } from '../../config/api';
import { Layout } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';

const IMAGE_URL = [
  require('./images/avatar_1.png'),
  require('./images/avatar_2.png'),
  require('./images/avatar_3.png'),
  require('./images/avatar_4.png'),
];

type FormData = {
  email: string;
  password: string;
  nickname: string;
  avatarId: number;
};
type Error = Partial<FormData>;

type SignupScreenProp = StackScreenProps<RootStackParams>;
const SignupScreen: React.FC<SignupScreenProp> = ({ navigation }) => {
  const toast = useToast();
  const [formData, setFormData] = React.useState<FormData>({
    email: '',
    password: '',
    nickname: '',
    avatarId: 1,
  });
  const [errors, setErrors] = React.useState<Error>({});

  const validate = () => {
    if (formData.email === '') {
      setErrors({
        ...errors,
        email: '이메일을 작성해주세요',
      });
      return false;
    } else {
      delete errors.email;
    }
    if (formData.password === '') {
      setErrors({
        ...errors,
        password: '비밀번호를 입력해주세요',
      });
      return false;
    } else {
      delete errors.password;
    }
    if (formData.password.length < 8) {
      setErrors({
        ...errors,
        password: '비밀번호를 8자 이상 입력해주세요',
      });
      return false;
    } else {
      delete errors.password;
    }
    if (formData.nickname === '') {
      setErrors({
        ...errors,
        nickname: '닉네임을 작성해주세요',
      });
      return false;
    } else {
      delete errors.nickname;
    }
    return true;
  };

  const registerUser = () => {
    callAPI('/user', 'POST', {
      email: formData.email,
      password: formData.password,
      username: formData.nickname,
      avatar: formData.avatarId.toString(),
    })
      .then()
      .then(() => {
        toast.show({
          status: 'success',
          title: '회원가입 성공',
          description: '회원가입이 성공적으로 완료되었습니다.',
        });
        navigation.navigate('Login');
      })
      .catch((err) => {
        console.error(err);
        toast.show({
          status: 'error',
          title: '로그인 실패',
          description: '이메일 또는 비밀번호가 올바르지 않습니다.',
        });
      });
  };

  const handlePress = () => {
    const isValidate = validate();
    if (isValidate === false) return;
    callAPI('/user/validation', 'POST', {
      email: formData.email,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.isEmailExist) {
          toast.show({
            status: 'error',
            title: '이메일 중복',
            description: '이미 존재하는 이메일 주소입니다.',
          });
          return false;
        }
        registerUser();
      })
      .catch((err) => {
        console.error(err);
        toast.show({
          status: 'error',
          title: '로그인 실패',
          description: '가입 중 문제가 발생했습니다.',
        });
      });
  };

  return (
    <Layout>
      <VStack space={5}>
        <FormControl isRequired isInvalid={'email' in errors}>
          <FormControl.Label
            mb="4"
            _text={{ fontSize: 'md', fontWeight: 'bold' }}
          >
            이메일
          </FormControl.Label>
          <Input
            value={formData.email}
            variant="filled"
            type="email"
            keyboardType="email-address"
            placeholder="이메일을 입력해주세요"
            onChangeText={(value: string) =>
              setFormData({ ...formData, email: value })
            }
          />
          {'email' in errors && (
            <FormControl.ErrorMessage
              _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}
            >
              {errors['email']}
            </FormControl.ErrorMessage>
          )}
        </FormControl>
        <FormControl isRequired isInvalid={'password' in errors}>
          <FormControl.Label
            mb="4"
            _text={{ fontSize: 'md', fontWeight: 'bold' }}
          >
            비밀번호
          </FormControl.Label>
          <Input
            value={formData.password}
            variant="filled"
            type="password"
            placeholder="비밀번호를 8자 이상 입력해주세요"
            onChangeText={(value: string) =>
              setFormData({ ...formData, password: value })
            }
          />
          {'password' in errors && (
            <FormControl.ErrorMessage
              _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}
            >
              {errors['password']}
            </FormControl.ErrorMessage>
          )}
        </FormControl>
        <FormControl isRequired isInvalid={'nickname' in errors}>
          <FormControl.Label
            mb="4"
            _text={{ fontSize: 'md', fontWeight: 'bold' }}
          >
            닉네임
          </FormControl.Label>
          <Input
            value={formData.nickname}
            variant="filled"
            placeholder="닉네임을 10자 이내로 입력해주세요"
            maxLength={10}
            onChangeText={(value: string) =>
              setFormData({ ...formData, nickname: value })
            }
          />
          {'nickname' in errors && (
            <FormControl.ErrorMessage
              _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}
            >
              {errors['nickname']}
            </FormControl.ErrorMessage>
          )}
        </FormControl>
        <Box>
          <Text fontSize="md" fontWeight="bold" mb="4">
            아바타
          </Text>
          <Flex direction="row" justify="space-around" alignItems="center">
            {IMAGE_URL.map((v, i) => (
              <Avatar
                key={v}
                size={formData.avatarId === i + 1 ? '66px' : '58px'}
                padding={2}
                margin={formData.avatarId === i + 1 ? undefined : '4px'}
                bg="white"
                borderWidth={formData.avatarId === i + 1 ? '4px' : undefined}
                borderColor="primary.400"
                source={v}
                onTouchStart={() =>
                  setFormData({ ...formData, avatarId: i + 1 })
                }
              >
                {v}
              </Avatar>
            ))}
          </Flex>
        </Box>
      </VStack>
      <Spacer />
      <Box>
        <Button variant="solid" onPress={handlePress}>
          회원가입
        </Button>
      </Box>
    </Layout>
  );
};

export default SignupScreen;
