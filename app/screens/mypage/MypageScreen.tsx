import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import {
  Avatar,
  Button,
  Flex,
  Spacer,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import * as SecureStore from 'expo-secure-store';

import { useGetRequest } from '../../config/api';
import { Layout } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';

const IMAGE_URL = [
  require('../../../assets/images/character1.png'),
  require('../../../assets/images/character2.png'),
  require('../../../assets/images/character3.png'),
];

type MypageScreenProp = StackScreenProps<RootStackParams, 'Mypage'>;
const MypageScreen: React.FC<MypageScreenProp> = ({ navigation }) => {
  const userInfo = useGetRequest('/me').data;
  async function logout() {
    await SecureStore.deleteItemAsync('token').then(() => {
      navigation.reset({ routes: [{ name: 'Init' }] });
    });
  }
  if (userInfo === undefined) return <Spinner />;
  return (
    <Layout>
      <Flex direction="row" alignItems="center" mt={4}>
        <Avatar
          size="20"
          bg="white"
          padding={2}
          borderWidth="2"
          borderColor="primary.400"
          source={IMAGE_URL[Number(userInfo.avatar - 1) ?? 0]}
        >
          avatar
        </Avatar>
        <VStack ml={4}>
          <Text fontSize="2xl" fontWeight="bold">
            {userInfo.username}
          </Text>
          <Text fontSize="lg">{userInfo.userEmail}</Text>
        </VStack>
      </Flex>
      <VStack mt={10} space={4}>
        <Flex direction="row" justifyContent="space-between">
          <Text fontSize="lg" fontWeight="bold">
            만든이
          </Text>
          <Text fontSize="md" color="gray.500">
            히치하이커스
          </Text>
        </Flex>
        <Flex direction="row" justifyContent="space-between">
          <Text fontSize="lg" fontWeight="bold">
            버전
          </Text>
          <Text fontSize="md" color="gray.500">
            ver 0.1.0
          </Text>
        </Flex>
      </VStack>
      <Spacer />
      <Button mt={4} onPress={logout}>
        로그아웃
      </Button>
    </Layout>
  );
};

export default MypageScreen;
