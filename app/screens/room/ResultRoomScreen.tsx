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

const DUMMY_DATA = [
  {
    userName: 'admin',
    ticker: 'APPL',
    value: 12,
    avatar: IMAGE_URL[0],
  },
  {
    userName: '김주주',
    ticker: 'BYND',
    value: 5.5,
    avatar: IMAGE_URL[1],
  },
  {
    userName: '정감자',
    ticker: 'TSLA',
    value: -1.3,
    avatar: IMAGE_URL[2],
  },
];

type ResultRoomScreenProp = StackScreenProps<RootStackParams, 'CompleteRoom'>;
const ResultRoomScreen: React.FC<ResultRoomScreenProp> = ({ route }) => {
  const { roomId } = route.params;

  React.useEffect(() => {
    callAPI(`/game-history/room/${roomId}`, 'GET', undefined)
      .then((res) => res.json())
      .then((res) => {
        // WHAT TO DO with res
        console.log(res);
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  });

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
            1
          </Text>
          <Text fontSize="sm" color="gray.100">
            최종 순위
          </Text>
        </Flex>
        <Spacer />
        <Flex align="center">
          <Text fontSize="lg" fontWeight="bold" color="white">
            12%
          </Text>
          <Text fontSize="sm" color="gray.100">
            최종 수익률
          </Text>
        </Flex>
        <Spacer />
        <Flex align="center">
          <Text fontSize="lg" fontWeight="bold" color="white">
            APPL
          </Text>
          <Text fontSize="sm" color="gray.100">
            종목
          </Text>
        </Flex>
      </HStack>
      <FlatList
        mt={6}
        data={DUMMY_DATA}
        renderItem={({
          item,
          index,
        }: {
          item: typeof DUMMY_DATA[number];
          index: number;
        }) => (
          <HStack alignItems="center" space={4} py={2}>
            <Box _text={{ fontSize: 'md', fontWeight: 'bold' }}>
              {index + 1}
            </Box>
            <Avatar bg="gray.100" rounded="lg" source={item.avatar} p={2} />
            <Box flex={1} _text={{ fontSize: 'md', fontWeight: 'bold' }}>
              {item.userName}
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
                color: Math.sign(item.value) === 1 ? 'red.400' : 'blue.400',
              }}
            >
              {`${item.value}%`}
            </Box>
          </HStack>
        )}
      ></FlatList>
    </Layout>
  );
};

export default ResultRoomScreen;
