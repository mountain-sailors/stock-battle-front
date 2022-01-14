import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigators/RootStackParams';

import { useToast, Spacer, Input, Text } from 'native-base';
import { Button } from 'native-base';

import { callAPI } from '../../config/api';
import { Layout } from '../../components';

type FindPasswordScreenProp = StackScreenProps<RootStackParams, 'FindPassword'>;
const FindPasswordScreen: React.FC<FindPasswordScreenProp> = ({
  navigation,
}) => {
  const toast = useToast();
  const [value, setValue] = React.useState('');

  const handlePress = () => {
    callAPI('/user/forgot-password', 'POST', {
      email: value,
    })
      .then((res) => res.json())
      .then(async (res) => {
        if (res.isEmailExist) {
          navigation.navigate('SendTempPwd', { email: value });
        } else {
          toast.show({
            status: 'error',
            title: '유저 정보 없음',
            description: '가입되지 않은 이메일입니다.',
          });
        }
      });
  };

  return (
    <Layout>
      <Text textAlign="center" fontSize="md" mt={24}>
        {`아래에 등록한 이메일을 입력하시면\n임시 비밀번호를 발송해드립니다.`}
      </Text>
      <Input
        value={value}
        variant="filled"
        type="email"
        keyboardType="email-address"
        placeholder="이메일을 입력해주세요"
        onChangeText={(v) => setValue(v)}
        mt={6}
      />
      <Spacer />
      <Button
        variant={value === '' ? 'disabled' : 'solid'}
        disabled={value === ''}
        onPress={handlePress}
      >
        임시 비밀번호 발송
      </Button>
    </Layout>
  );
};

export default FindPasswordScreen;
