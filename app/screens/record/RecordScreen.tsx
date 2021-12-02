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
  HStack,
  Heading,
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

  const gameHistory = useGetRequest(`/game-history/${meData.userId}`).data;

  console.log(gameHistory);
  const rankList =
    gameHistory && gameHistory !== []
      ? gameHistory.map((game: any) => game.rank)
      : [];

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
              <Flex
                direction="row"
                justify="space-between"
                align="center"
                w="100%"
              >
                <Box w="30%">
                  <ZStack alignItems="center" justifyContent="center" mr={5}>
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
                  <Text color="white">
                    승률
                    <Text color="primary.400">&nbsp;{winRate && winRate}%</Text>
                  </Text>
                  <Text fontSize="2xl" color="white" fontWeight="bold">
                    {meData.username}
                  </Text>
                  <Text color="gray.500">{meData.userEmail}</Text>
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
          <Heading size="sm">히스토리</Heading>
          {gameHistory &&
            gameHistory.length !== 0 &&
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
                  <HStack space={2} alignItems="center">
                    <Box px={3} py={0.5} bg="secondary.400" rounded="3">
                      <Flex direction="column" align="center" justify="center">
                        <Text fontSize="xs" fontWeight="bold" color="#fff">
                          {game.rank}위
                        </Text>
                      </Flex>
                    </Box>
                    <Box>
                      <Heading size="md" color="black">
                        {game.title}
                      </Heading>
                    </Box>
                  </HStack>
                  <Text fontSize="sm" color="gray.500">
                    {game.startDate.slice(0, 10)} ~ {game.endDate.slice(0, 10)}
                  </Text>
                  <Spacer />
                  <Flex direction="row" justify="space-between" mt={5}>
                    <VStack w="30%" space={2}>
                      <Text fontSize="md" color="gray.500">
                        수익률
                      </Text>
                      <Text fontSize="md" color="gray.500">
                        참여종목
                      </Text>
                      <Text fontSize="md" color="gray.500">
                        참여인원
                      </Text>
                    </VStack>
                    <Spacer />
                    <VStack w="70%" space={2} alignItems="flex-end">
                      <Text fontSize="md">{game.profit}</Text>
                      <Text fontSize="md">{game.ticker}</Text>
                      <Text fontSize="md" textAlign="right">
                        {game.players.map((player: any) => {
                          if (
                            game.players.indexOf(player) ===
                            game.players.length - 1
                          )
                            return `${player}`;
                          return `${player}, `;
                        })}
                      </Text>
                    </VStack>
                  </Flex>
                </Box>
              );
            })}
        </VStack>
      </Box>
    </Layout>
  );
};

export default RecordScreen;
