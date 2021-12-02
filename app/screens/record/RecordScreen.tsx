import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { View } from 'react-native';
import {
  Box,
  Flex,
  Text,
  VStack,
  Image,
  Spacer,
  ZStack,
  Circle,
} from 'native-base';
import { Layout } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';
import { useGetRequest } from '../../config/api';
import { IMAGE_URL } from '../../config/consts';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

type RecordScreenProp = StackScreenProps<RootStackParams, 'Record'>;
const RecordScreen: React.FC<RecordScreenProp> = () => {
  const meData = useGetRequest(`/me`).data;
  if (meData === undefined) return null;

  const gameHistory = useGetRequest(
    `/game-history/${meData.userId.toString()}`,
  ).data;
  console.log(gameHistory);

  const rankList = gameHistory?.map((game: any) => game.rank) ?? [];
  const average =
    rankList.length === 0
      ? 0
      : Math.round(
          rankList.reduce((acc: number, cur: number) => acc + cur, 0) /
            rankList.length,
        );

  const winCount =
    rankList.length === 0
      ? 0
      : rankList.filter((item: any) => {
          if (item === 1) return item;
        });

  const winCountLen = winCount === 0 ? 0 : winCount.length;

  let winRate = 0;

  if (rankList.length === 0 || winCountLen === 0) winRate = 0;
  else winRate = Math.round((winCountLen / rankList.length) * 100);

  return (
    <Layout>
      <VStack m={0} mt={5}>
        <Box mx={-6} mt={-6} px={4} pb={5} bgColor="white">
          <Box w="100%" bg="#1A1B22" rounded="lg" p="8">
            <Flex
              direction="column"
              justify="space-between"
              mt={1}
              mb={1}
              w="100%"
            >
              <Flex direction="row" justify="space-between" w="100%">
                <Box w="30%">
                  <ZStack
                    alignItems="center"
                    justifyContent="center"
                    mr={5}
                    mt={8}
                  >
                    <View
                      style={{
                        width: 75,
                        height: 75,
                        overflow: 'hidden',
                        borderRadius: 37.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: [{ rotate: '270deg' }],
                      }}
                    >
                      <AnimatedCircularProgress
                        size={75}
                        width={5}
                        fill={Math.ceil((winRate / 10) * 10)}
                        tintColor="#54E68E"
                        backgroundColor="#3d5875"
                      />
                    </View>
                    <Circle size="60px" bg="#1A1B22"></Circle>
                    <Circle size="55px" bg="#fff"></Circle>
                    <Box>
                      <Image
                        source={IMAGE_URL[meData.avatar - 1]}
                        size={10}
                        alt="avatar"
                      />
                    </Box>
                  </ZStack>
                </Box>
                <Flex direction="column" w="70%">
                  <Flex direction="row">
                    <Text color="white">승률</Text>
                    <Text color="#54E68E">&nbsp;{winRate && winRate}%</Text>
                  </Flex>
                  <Text fontSize="2xl" color="white" fontWeight="bold">
                    {meData.username}
                  </Text>
                  <Text color="#828282">{meData.userEmail}</Text>
                </Flex>
              </Flex>
              <Flex direction="row" justify="space-between" mt={5}>
                <Box w="33.3%">
                  <Flex direction="column" justify="center" align="center">
                    <Text fontSize="2xl" color="white" fontWeight="bold">
                      {gameHistory && gameHistory.length}
                    </Text>
                    <Text fontSize="sm" color="white">
                      참여 게임수
                    </Text>
                  </Flex>
                </Box>
                <Box w="33.3%">
                  <Flex direction="column" justify="center" align="center">
                    <Text fontSize="2xl" color="white" fontWeight="bold">
                      {average && average}
                    </Text>
                    <Text fontSize="sm" color="white">
                      평균 등수
                    </Text>
                  </Flex>
                </Box>
                <Box w="33.3%">
                  <Flex direction="column" justify="center" align="center">
                    <Text fontSize="2xl" color="white" fontWeight="bold">
                      {winCountLen && winCountLen}
                    </Text>
                    <Text fontSize="sm" color="white">
                      1등 횟수
                    </Text>
                  </Flex>
                </Box>
              </Flex>
              <Spacer />
            </Flex>
          </Box>
        </Box>
      </VStack>

      <Box pb={3} pt={3}>
        <VStack space="3">
          <Text fontSize="xl" fontWeight="bold">
            히스토리
          </Text>
          {gameHistory &&
            gameHistory.map((game: any) => {
              return (
                <Box
                  key={game.title}
                  w="100%"
                  bg="#fff"
                  pt="4"
                  pb="1"
                  borderTopWidth={1}
                  borderTopColor="#E0E0E0"
                >
                  <Flex direction="row" w="100%" h="24px" align="flex-end">
                    <Box mr={2} w="40px" bg="#7B61FF" rounded="3">
                      <Flex
                        h="100%"
                        direction="column"
                        align="center"
                        justify="center"
                      >
                        <Text fontSize="xs" fontWeight="bold" color="#fff">
                          {game.rank}위
                        </Text>
                      </Flex>
                    </Box>
                    <Text
                      mr={2}
                      fontSize="xl"
                      fontWeight="bold"
                      color="black"
                      alignSelf="flex-start"
                      mt="-2px"
                    >
                      {game.title}
                    </Text>
                    <Text fontSize="xs" color="#828282">
                      {game.startDate.slice(0, 10)} ~{' '}
                      {game.endDate.slice(0, 10)}
                    </Text>
                  </Flex>
                  <Spacer />
                  <Flex direction="row" justify="space-between" mt={5}>
                    <Box w="30%">
                      <Text fontSize="md" color="#828282">
                        수익률
                      </Text>
                      <Text fontSize="md" color="#828282">
                        참여종목
                      </Text>
                      <Text fontSize="md" color="#828282">
                        참여인원
                      </Text>
                    </Box>
                    <Spacer />
                    <Box w="70%">
                      <Flex
                        direction="column"
                        justify="flex-end"
                        align="flex-end"
                      >
                        <Text fontSize="md">{game.profit}</Text>
                        <Text fontSize="md">{game.ticker}</Text>
                        <Text fontSize="md">
                          {game.players.map((player: any) => {
                            if (
                              game.players.indexOf(player) ===
                              game.players.length - 1
                            )
                              return `${player}`;
                            return `${player}, `;
                          })}
                        </Text>
                      </Flex>
                    </Box>
                  </Flex>
                  <Spacer />
                </Box>
              );
            })}
        </VStack>
      </Box>
    </Layout>
  );
};

export default RecordScreen;
