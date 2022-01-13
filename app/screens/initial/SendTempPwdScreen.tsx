import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigators/RootStackParams';

import { Spacer, Text } from 'native-base';
import { Button } from 'native-base';

import { Layout } from '../../components';

type SendTempPwdScreenProp = StackScreenProps<RootStackParams, 'SendTempPwd'>;
const SendTempPwdScreen: React.FC<SendTempPwdScreenProp> = ({
  navigation,
  route,
}) => {
  const { email } = route.params;
  return (
    <Layout>
      <Text textAlign="center" fontSize="md" mt={24}>
        임시 비밀번호가&nbsp;
        <Text
          textAlign="center"
          fontSize="md"
          fontWeight="bold"
          color="secondary.400"
        >
          {email}
        </Text>
        &nbsp;로 발송 완료 되었습니다.
      </Text>
      <Spacer />
      <Button
        mb="2"
        variant="solid"
        onPress={() => navigation.navigate('Login')}
      >
        로그인
      </Button>
      <Button variant="outline" onPress={() => navigation.navigate('Init')}>
        처음으로
      </Button>
    </Layout>
  );
};

export default SendTempPwdScreen;
