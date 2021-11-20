import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Flex, Text, VStack, Image, Spacer } from 'native-base';
import { Layout } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';
// import { Progress } from 'native-base';
import { useGetRequest } from '../../config/api';
import { TouchableHighlight } from 'react-native';
import WaitingRoomInfo from './WaitingRoomInfo';
import RunningRoomInfo from './RunningRoomInfo';
import ResultRoomInfo from './ResultRoomInfo';

// TODO : Loading 처리 == Skeleton
// TODO : UserInfo 상태 모델 ({NickName:string, Average:string? number?})
// TODO : 각각의 카드 정보 상태 모델

const gameStatusType = ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];

type MainSceenProp = StackScreenProps<RootStackParams, 'Main'>;
const MainScreen: React.FC<MainSceenProp> = ({ navigation }) => {
  const roomList = useGetRequest('/room').data;
  const userInfo = useGetRequest('/me').data;
  if (!roomList || !userInfo) return null;

  const rankList = roomList
    .filter((room: any) => room.gameStatus !== 0)
    .map((room: any) => room.rank);
  const average =
    rankList.reduce((acc: number, cur: number) => acc + cur, 0) /
    rankList.length;

  return (
    <Layout color="gray.100">
      <VStack mb="19px">
        <Box mx={-6} mt={-6} px={6} pb={6} bgColor="white">
          <Flex direction="column" justify="space-between" mt={10} mb={6}>
            <Flex direction="row">
              <Text fontSize="3xl" fontWeight="bold">
                {`${userInfo.username}님의\n배틀 현황입니다`}
              </Text>
              <Image
                mt="7"
                ml="2"
                size="40px"
                source={require('./images/horse.png')}
                alt="icon"
              />
            </Flex>
            <Text mt={2} fontSize="xl">
              평균 등수
              <Text fontSize="xl" fontWeight="bold" color="secondary.400">
                &nbsp; {average}위
              </Text>
            </Text>
          </Flex>
        </Box>
      </VStack>
      <Spacer />
      <Box pb="20px">
        <VStack space="3">
          {roomList.map((room: any, index: number) => {
            return {
              // 다른 페이지로 넘어갈 때 roomId 같이 넘겨줘야할듯?
              // 방이 취소 됐을 때 (CANCELLED) 처리 필요
              NOT_STARTED: (
                <TouchableHighlight
                  key={index}
                  onPress={() => navigation.navigate('WaitingRoom')}
                >
                  <WaitingRoomInfo key={index} room={room} />
                </TouchableHighlight>
              ),
              IN_PROGRESS: (
                <TouchableHighlight
                  key={index}
                  onPress={() => navigation.navigate('RunningRoom')}
                >
                  <RunningRoomInfo key={index} room={room} />
                </TouchableHighlight>
              ),
              COMPLETED: (
                <TouchableHighlight
                  key={index}
                  onPress={() => navigation.navigate('ResultRoom')}
                >
                  <ResultRoomInfo key={index} room={room} />
                </TouchableHighlight>
              ),
            }[gameStatusType[room.gameStatus]];
          })}
        </VStack>
      </Box>
    </Layout>
  );
};

export default MainScreen;
