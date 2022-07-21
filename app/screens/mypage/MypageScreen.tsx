import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import {
  useToast,
  Avatar,
  Button,
  Divider,
  Flex,
  Modal,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import * as SecureStore from 'expo-secure-store';

import { useGetRequest, callAPI } from '../../config/api';
import { Layout } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';

const IMAGE_URL = [
  require('../../../assets/images/character1.png'),
  require('../../../assets/images/character2.png'),
  require('../../../assets/images/character3.png'),
];

type MypageScreenProp = StackScreenProps<RootStackParams, 'Mypage'>;
const MypageScreen: React.FC<MypageScreenProp> = ({ navigation }) => {
  const { data: userInfo } = useGetRequest('/me');
  const [showModal, setShowModal] = React.useState(false);
  const toast = useToast();
  async function logout() {
    await SecureStore.deleteItemAsync('token').then(() => {
      navigation.reset({ routes: [{ name: 'Init' }] });
    });
  }
  const signout = () => {
    callAPI('/user', 'DELETE', {})
      .then(() => {
        toast.show({
          status: 'success',
          title: '회원 탈퇴',
          description: '성공적으로 탈퇴했습니다.',
        });
        setShowModal(false);
        navigation.navigate('Init');
      })
      .catch((err) => {
        toast.show({
          status: 'error',
          title: '회원 탈퇴 실패',
          description: '진행 중 문제가 발생했습니다.',
        });
        console.error(err);
      });
  };
  if (userInfo === undefined) return <Spinner />;
  return (
    <Layout>
      <Flex direction="row" alignItems="center" mt={4}>
        {+userInfo.avatar === 1 && (
          <Avatar
            size="20"
            bg="white"
            padding={2}
            borderWidth="2"
            borderColor="primary.400"
            source={IMAGE_URL[0]}
          >
            avatar
          </Avatar>
        )}
        {+userInfo.avatar === 2 && (
          <Avatar
            size="20"
            bg="white"
            padding={2}
            borderWidth="2"
            borderColor="primary.400"
            source={IMAGE_URL[1]}
          >
            avatar
          </Avatar>
        )}
        {+userInfo.avatar === 3 && (
          <Avatar
            size="20"
            bg="white"
            padding={2}
            borderWidth="2"
            borderColor="primary.400"
            source={IMAGE_URL[2]}
          >
            avatar
          </Avatar>
        )}
        <VStack ml={4}>
          <Text fontSize="xl" fontWeight="bold">
            {userInfo.username}
          </Text>
          <Text fontSize="md" color="gray.500">
            {userInfo.userEmail}
          </Text>
        </VStack>
      </Flex>
      <Divider my={8} />
      <VStack space={6}>
        <Text fontSize="sm" fontWeight="bold">
          사용자 설정
        </Text>
        <Text
          fontSize="md"
          onPress={() => navigation.navigate('ChangeProfile')}
        >
          프로필 변경
        </Text>
      </VStack>
      <VStack mt={10} space={6}>
        <Text fontSize="sm" fontWeight="bold">
          기타
        </Text>
        <Flex direction="row" justifyContent="space-between">
          <Text fontSize="md">만든이</Text>
          <Text fontSize="md" color="secondary.400">
            히치하이커스
          </Text>
        </Flex>
        <Flex direction="row" justifyContent="space-between">
          <Text fontSize="md">버전</Text>
          <Text fontSize="md" color="secondary.400">
            ver 1.0.2
          </Text>
        </Flex>
        <Text fontSize="md" onPress={logout}>
          로그아웃
        </Text>
        <Text fontSize="md" onPress={() => setShowModal(true)}>
          탈퇴하기
        </Text>
      </VStack>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>탈퇴하기</Modal.Header>
          <Modal.Body>
            <Text fontSize="sm">
              {`계정을 삭제하시면 모든 활동 정보가 사라지며 다시 복구할 수 없습니다.\n\n서비스를 탈퇴하시겠어요?`}
            </Text>
            <Button variant="outline" size="md" mt={4} p={3} onPress={signout}>
              탈퇴하기
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Layout>
  );
};

export default MypageScreen;
