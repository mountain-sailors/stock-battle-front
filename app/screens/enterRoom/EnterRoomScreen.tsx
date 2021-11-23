import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Layout } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';
import { Button, Text, Center, Flex, Box } from 'native-base';

type EnterRoomScreenProp = StackScreenProps<RootStackParams>;
const EnterRoomScreen: React.FC<EnterRoomScreenProp> = ({ navigation }) => {
  return (
    <>
      <Layout>
        <Center flex={1} w="100%">
          <Box w="100%">
            <Box pt="4">
              <Flex direction="column" w="100%" mb="4">
                <Text fontSize="md" fontWeight="bold">
                  방 등록 방식
                </Text>
                <Text fontSize="sm">
                  초대 코드가 있는 경우 ‘초대 코드 입력'을 눌러주세요
                </Text>
              </Flex>
              <Flex direction="column" w="100%" pt="2" mb="2">
                <Button
                  mb="2"
                  variant="outline"
                  onPress={() => {
                    navigation.navigate('AddRoomTitle');
                  }}
                >
                  새 방 만들기
                </Button>
                <Button
                  onPress={() => {
                    navigation.navigate('AddRoomCode');
                  }}
                >
                  초대코드 입력
                </Button>
              </Flex>
            </Box>
          </Box>
        </Center>
      </Layout>
    </>
  );
};

export default EnterRoomScreen;
