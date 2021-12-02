import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import {
  Box,
  Flex,
  HStack,
  Image,
  Text,
  Heading,
  Spacer,
  FlatList,
  Avatar,
} from 'native-base';
import { Layout } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';
import { callAPI } from '../../config/api';
import { IMAGE_URL } from '../../config/consts';

type Result = {
  userId: number;
  isWin: number;
  rank: number;
  profit: number;
  ticker: string;
  amount: number;
};

type Player = {
  id: number;
  username: string;
  avatar: string;
  color: string;
};

type ResultRoomScreenProp = StackScreenProps<RootStackParams, 'ResultRoom'>;
const ResultRoomScreen: React.FC<ResultRoomScreenProp> = ({ route }) => {
  const { roomId } = route.params;
  const [resultData, setResultData] = React.useState<Result[]>([]);
  const [playerData, setPlayerData] = React.useState<Player[]>([]);
  const [myData, setMyData] = React.useState({
    userId: 0,
    userName: '',
    userEmail: '',
    point: 0,
    avatar: '',
  });

  React.useEffect(() => {
    callAPI(`/me`, 'GET', undefined)
      .then((res) => res.json())
      .then((res) => {
        // WHAT TO DO with res
        setMyData(res);
        console.log(`MyData:: ${myData}`);
        console.log('================================');
      })
      .catch((err) => {
        console.error('Error: ', err);
      });

    callAPI(`/game-history/room/${roomId}`, 'GET', undefined)
      .then((res) => res.json())
      .then((res) => {
        // WHAT TO DO with res
        setResultData(res);
        console.log(`resultData:: ${resultData}`);
        console.log(typeof resultData);
        console.log('================================');
      })
      .catch((err) => {
        console.error('Error: ', err);
      });

    callAPI(`/player/${roomId}`, 'GET', undefined)
      .then((res) => res.json())
      .then((res) => {
        // WHAT TO DO with res
        setPlayerData(res);
        console.log(`playerData:: ${playerData}`);
        console.log('================================');
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  }, []);

  return (
    <Layout>
      <Flex align="center" mt={2}>
        <Image
          size="65px"
          source={require('./images/icon-trophy.png')}
          alt="trophy"
        />
        <Heading size="md" mt={3}>
          축하합니다!
        </Heading>
      </Flex>
      <HStack mt={6} p={6} rounded="lg" bgColor="secondary.400">
        <Flex align="center">
          <Text fontSize="lg" fontWeight="bold" color="white">
            {resultData
              .sort((a, b) => a.rank - b.rank)
              .filter((el) => {
                if (el.userId === myData.userId) return el;
              })
              .map((item) => item.rank)}
          </Text>
          <Text fontSize="sm" color="gray.100">
            최종 순위
          </Text>
        </Flex>
        <Spacer />
        <Flex align="center">
          <Text fontSize="lg" fontWeight="bold" color="white">
            {resultData
              .sort((a, b) => a.rank - b.rank)
              .filter((el) => {
                if (el.userId === myData.userId) return el;
              })
              .map((item) => item.profit)}
            %
          </Text>
          <Text fontSize="sm" color="gray.100">
            최종 수익률
          </Text>
        </Flex>
        <Spacer />
        <Flex align="center">
          <Text fontSize="lg" fontWeight="bold" color="white">
            {resultData
              .sort((a, b) => a.rank - b.rank)
              .filter((el) => {
                if (el.userId === myData.userId) return el;
              })
              .map((item) => item.ticker)}
          </Text>
          <Text fontSize="sm" color="gray.100">
            종목
          </Text>
        </Flex>
      </HStack>
      <FlatList
        mt={6}
        data={resultData}
        renderItem={({
          item,
          index,
        }: {
          item: typeof resultData[number];
          index: number;
        }) => (
          <HStack alignItems="center" space={4} py={2}>
            <Box _text={{ fontSize: 'md', fontWeight: 'bold' }}>
              {index + 1}
            </Box>
            <Avatar
              bg="gray.100"
              rounded="lg"
              source={IMAGE_URL[index]}
              p={2}
            />
            <Box flex={1} _text={{ fontSize: 'md', fontWeight: 'bold' }}>
              {playerData
                .filter((pl) => {
                  if (pl.id === item.userId) return pl;
                })
                .map((pl) => pl.username)}
            </Box>
            <Box flex={1} _text={{ textAlign: 'right', fontSize: 'md' }}>
              {item.ticker}
            </Box>
            <Box
              flex={1}
              _text={{
                textAlign: 'right',
                fontSize: 'md',
                fontWeight: 'bold',
                color: Math.sign(item.profit) === 1 ? 'red.400' : 'blue.400',
              }}
            >
              {`${item.profit}%`}
            </Box>
          </HStack>
        )}
      ></FlatList>
    </Layout>
  );
};

export default ResultRoomScreen;
