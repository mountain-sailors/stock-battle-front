import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import {
  useToast,
  Button,
  Input,
  Box,
  Spacer,
  FormControl,
  VStack,
} from 'native-base';

import { callAPI } from '../../config/api';
import { Layout } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';

type FormData = {
  email: string;
  verifyCode: string;
};

type ValidateEmailScreenProp = StackScreenProps<
  RootStackParams,
  'ValidateEmail'
>;
const ValidateEmailScreen: React.FC<ValidateEmailScreenProp> = ({
  navigation,
}) => {
  const toast = useToast();
  const [isVerify, setIsVerify] = React.useState(false);
  const [verifyCode, setVerifyCode] = React.useState<string | undefined>(
    undefined,
  );
  const [formData, setFormData] = React.useState<FormData>({
    email: '',
    verifyCode: '',
  });

  const checkVerifyCode = (code?: string) => {
    console.log('verifyCode', verifyCode);
    if (code === '') return;
    if (code === verifyCode) {
      toast.show({
        status: 'success',
        title: '이메일 인증 성공',
        description: '이메일 인증이 성공적으로 완료되었습니다.',
      });
      setIsVerify(true);
    } else {
      toast.show({
        status: 'error',
        title: '이메일 인증 실패',
        description: '인증번호가 일치하지 않습니다.',
      });
    }
  };

  const sendEmail = (value: string) => {
    const regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (value.match(regExp) === null) {
      toast.show({
        status: 'error',
        title: '이메일 형식',
        description:
          '형식에 맞지 않는 이메일 주소입니다. 예시) zumazuma@gmail.com',
      });
      return false;
    }
    callAPI('/user/validation', 'POST', {
      email: value,
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
        } else {
          toast.show({
            status: 'success',
            title: '인증번호 발송',
            description: '입력하신 이메일로 인증번호를 발송했습니다.',
          });
          setVerifyCode(res.code);
        }
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
        <FormControl isRequired>
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
          <Button
            variant={formData.email === '' ? 'ghost' : 'outline'}
            size="md"
            mt={2}
            disabled={formData.email === ''}
            onPress={() => sendEmail(formData.email)}
          >
            이메일로 인증번호 발송
          </Button>
        </FormControl>
        <FormControl isRequired>
          <FormControl.Label
            mb="4"
            _text={{ fontSize: 'md', fontWeight: 'bold' }}
          >
            인증번호
          </FormControl.Label>
          <Input
            flex={1}
            value={formData.verifyCode}
            variant="filled"
            keyboardType="number-pad"
            placeholder="인증번호를 입력해주세요"
            onChangeText={(value: string) =>
              setFormData({ ...formData, verifyCode: value })
            }
          />
          <Button
            variant={formData.verifyCode === '' ? 'ghost' : 'outline'}
            size="md"
            mt={2}
            disabled={formData.verifyCode === ''}
            onPress={() => checkVerifyCode(formData.verifyCode)}
          >
            인증번호 확인
          </Button>
        </FormControl>
      </VStack>
      <Spacer />
      <Box>
        <Button
          variant={isVerify ? 'solid' : 'disabled'}
          onPress={() =>
            navigation.navigate('SignUp', { email: formData.email })
          }
        >
          다음
        </Button>
      </Box>
    </Layout>
  );
};

export default ValidateEmailScreen;
