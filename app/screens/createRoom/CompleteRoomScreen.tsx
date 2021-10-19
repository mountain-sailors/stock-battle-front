import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import {
  Center,
  Flex,
  Text,
  VStack,
  Image,
  Spacer,
} from "native-base"
import { Button, Layout } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';
export const imgPartypopper = require("./img-partypopper.png");

type CompleteRoomScreenProp = StackScreenProps<RootStackParams, 'CompleteRoom'>;
const CompleteRoomScreen: React.FC<CompleteRoomScreenProp> = ({ navigation, route }) => {
  const { roomCode } = route.params;
  return (
    <Layout>
      <Flex align="center" mt="20">
        <Image
          size="80px"
          source={imgPartypopper}
          alt="party popper icon"
        />
        <Text mt={4} textAlign="center" fontSize="md">
          {`방 생성이 완료되었습니다!\n초대 코드를 공유해 친구들과 시작해보세요.`}
        </Text>
        <Center w="full" mt={4} py="3" bgColor="gray.100" borderRadius="lg">
          <Text fontSize="md" color="black">
            {roomCode}
          </Text>
        </Center>
      </Flex>
      <Spacer />
      <VStack space="2">
        <Button
          title="초대코드 복사"
          variant="outlined"
          onClick={() => {navigation.navigate('Main')}}
        />
        <Button
          title="메인으로 이동"
          variant="filled"
          onClick={() => {navigation.navigate('Main')}}
        />
      </VStack>
    </Layout>
  );
}

export default CompleteRoomScreen;
