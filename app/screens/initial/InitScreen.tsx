import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigators/RootStackParams';

import { Flex, Text } from 'native-base';
import { Button } from 'native-base';
import { Layout } from '../../components';

type InitScreenProp = StackScreenProps<RootStackParams, 'Init'>;
const InitScreen: React.FC<InitScreenProp> = ({ navigation }) => {
  return (
    <Layout>
      <Flex mt="32" direction="column" justify="center">
        <Flex justify="center" align="center">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            mb="10"
            textAlign="center"
          >{`주마주마로\n내가 산 주식을 응원하세요`}</Text>
        </Flex>
        <Button
          mb="2"
          variant="solid"
          onPress={() => navigation.navigate('Login')}
        >
          로그인
        </Button>
        <Button variant="outline" onPress={() => navigation.navigate('SignUp')}>
          회원가입
        </Button>
      </Flex>
    </Layout>
  );
};

export default InitScreen;
