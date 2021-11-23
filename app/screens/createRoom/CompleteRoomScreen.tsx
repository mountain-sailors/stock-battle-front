import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Clipboard } from 'react-native';
import {
  Button,
  Center,
  Flex,
  Text,
  VStack,
  Image,
  Spacer,
  useToast,
} from 'native-base';
import { Layout } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';

type CompleteRoomScreenProp = StackScreenProps<RootStackParams, 'CompleteRoom'>;
const CompleteRoomScreen: React.FC<CompleteRoomScreenProp> = ({
  navigation,
  route,
}) => {
  const { roomCode } = route.params;
  const toast = useToast();

  const copyToClipBoard = async (code: string) => {
    Clipboard.setString(code);
    try {
      await Clipboard.getString();
      toast.show({
        status: 'success',
        title: '복사 성공',
        description: '초대코드가 복사되었습니다.',
      });
    } catch {
      toast.show({
        status: 'error',
        title: '에러',
        description: '초대코드 복사 중 문제가 발생했습니다.',
      });
    }
  };

  return (
    <Layout>
      <Flex align="center" mt="20">
        <Image
          size="80px"
          source={require('./images/img-partypopper.png')}
          alt="party popper icon"
        />
        <Text mt={4} textAlign="center" fontSize="md">
          {`방 생성이 완료되었습니다!\n초대 코드를 공유해 친구들과 시작해보세요.`}
        </Text>
        <Center w="full" mt={4} py="3" bgColor="gray.100" borderRadius="lg">
          <Text fontSize="md" color="black" px={3}>
            {roomCode}
          </Text>
        </Center>
      </Flex>
      <Spacer />
      <VStack space="2">
        <Button variant="outline" onPress={() => copyToClipBoard(roomCode)}>
          초대코드 복사
        </Button>
        <Button
          variant="solid"
          onPress={() => navigation.reset({ routes: [{ name: 'Main' }] })}
        >
          메인으로 이동
        </Button>
      </VStack>
    </Layout>
  );
};

export default CompleteRoomScreen;
