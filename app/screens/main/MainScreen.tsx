import React from 'react';
import { TouchableHighlight } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Center, Flex, Text, VStack, Image, Spinner } from 'native-base';
import { Layout } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';
// import { Progress } from 'native-base';
import { useGetRequest } from '../../config/api';
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

  if (roomList === undefined || userInfo === undefined) {
    return (
      <Layout color="gray.100">
        <Center flex={1}>
          <Spinner size="lg" />
        </Center>
      </Layout>
    );
  }

  const rankList =
    roomList
      ?.filter((room: any) => room.gameStatus !== 0 && room.gameStatus !== 3)
      ?.map((room: any) => room.rank) ?? [];

  const average =
    rankList.length === 0
      ? 0
      : Math.round(
          rankList.reduce((acc: number, cur: number) => acc + cur, 0) /
            rankList.length,
        );

  return (
    <Layout color="gray.100">
      <VStack mb="19px">
        <Box mx={-6} mt={-6} px={6} pb={6} bgColor="white">
          <Flex direction="column" justify="space-between" mt={10} mb={6}>
            <Flex direction="row" alignItems="baseline">
              <Text fontSize="3xl" fontWeight="bold">
                {`${userInfo.username}님의\n배틀 현황입니다`}
              </Text>
              <Image
                mt="7"
                ml="2"
                size="50px"
                source={require('./images/img-start.png')}
                alt="start image"
              />
            </Flex>
            <Text mt={2} fontSize="lg">
              {rankList.length === 0 ? (
                <Text fontSize="lg" fontWeight="bold" color="secondary.400">
                  첫번째 게임을 시작해 보세요!
                </Text>
              ) : (
                <>
                  평균 등수
                  <Text fontSize="lg" fontWeight="bold" color="secondary.400">
                    &nbsp; {Number.isNaN(average) ? 0 : average}위
                  </Text>
                </>
              )}
            </Text>
          </Flex>
        </Box>
      </VStack>
      {roomList.length === 0 && (
        <Center flex={1}>
          <Image
            source={require('../../../assets/images/character4.png')}
            alt="character"
            width={250}
            height={100}
          />
          <Text mt={2} fontSize="md">
            하단 방 등록 탭을 눌러보세요!
          </Text>
        </Center>
      )}
      {roomList.length !== 0 && (
        <Box pb="20px">
          <VStack space="3">
            {roomList.map((room: any, index: number) => {
              return {
                // 다른 페이지로 넘어갈 때 roomId 같이 넘겨줘야할듯?
                // 방이 취소 됐을 때 (CANCELLED) 처리 필요
                NOT_STARTED: (
                  <TouchableHighlight
                    key={index}
                    onPress={() =>
                      navigation.navigate('WaitingRoom', {
                        roomId: room.id,
                        username: userInfo.username,
                      })
                    }
                  >
                    <WaitingRoomInfo key={index} room={room} />
                  </TouchableHighlight>
                ),
                IN_PROGRESS: (
                  <TouchableHighlight
                    key={index}
                    onPress={() =>
                      navigation.navigate('RunningRoom', { roomId: room.id })
                    }
                  >
                    <RunningRoomInfo key={index} room={room} />
                  </TouchableHighlight>
                ),
                COMPLETED: (
                  <TouchableHighlight
                    key={index}
                    onPress={() =>
                      navigation.navigate('ResultRoom', {
                        roomId: room.id,
                        winCondition: room.winCondition,
                      })
                    }
                  >
                    <ResultRoomInfo key={index} room={room} />
                  </TouchableHighlight>
                ),
              }[gameStatusType[room.gameStatus]];
            })}
          </VStack>
        </Box>
      )}
    </Layout>
  );
};

export default MainScreen;
