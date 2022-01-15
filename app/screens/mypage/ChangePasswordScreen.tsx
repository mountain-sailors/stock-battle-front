import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigators/RootStackParams';

import { useToast, Spacer, Input, Text } from 'native-base';
import { Button } from 'native-base';

import { callAPI } from '../../config/api';
import { Layout } from '../../components';

type ChangePasswordScreenProp = StackScreenProps<
  RootStackParams,
  'FindPassword'
>;
const ChangePasswordScreen: React.FC<ChangePasswordScreenProp> = ({
  navigation,
}) => {
  const toast = useToast();
  const [value, setValue] = React.useState('');

  const handlePress = () => {
    callAPI('/user/password', 'PUT', {
      password: value,
    })
      .then(() => {
        toast.show({
          status: 'success',
          title: '비밀번호 변경 성공',
          description: '성공적으로 비밀번호가 변경되었습니다.',
        });
        navigation.goBack();
      })
      .catch((err) => {
        toast.show({
          status: 'error',
          title: '비밀번호 변경 실패',
          description: '변경 중 문제가 발생했습니다.',
        });
        console.error(err);
      });
  };

  return (
    <Layout>
      <Text textAlign="left" fontSize="md" mt={24}>
        변경을 원하는 새 비밀번호를 입력해주세요.
      </Text>
      <Input
        value={value}
        variant="filled"
        type="password"
        placeholder="새 비밀번호를 8자 이상 입력해주세요"
        onChangeText={(v) => setValue(v)}
        mt={6}
      />
      <Spacer />
      <Button
        variant={value.length < 8 ? 'disabled' : 'solid'}
        disabled={value.length < 8}
        onPress={handlePress}
      >
        비밀번호 변경
      </Button>
    </Layout>
  );
};

export default ChangePasswordScreen;
