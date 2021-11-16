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

const DUMMY_DATA = [
  {
    userName: '아무개',
    ticker: 'ARPPU',
    value: 12,
  },
  {
    userName: '아무개',
    ticker: 'QQQ',
    value: -12.5,
  },
  {
    userName: '아무개',
    ticker: 'ARPPU',
    value: 12,
  },
  {
    userName: '아무개',
    ticker: 'ARPPU',
    value: 12,
  },
];

type ResultRoomScreenProp = StackScreenProps<RootStackParams, 'CompleteRoom'>;
const ResultRoomScreen: React.FC<ResultRoomScreenProp> = () => {
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
            4.5%
          </Text>
          <Text fontSize="sm" color="gray.100">
            최종 수익률
          </Text>
        </Flex>
        <Spacer />
        <Flex align="center">
          <Text fontSize="lg" fontWeight="bold" color="white">
            ARPPU
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
            <Avatar bg="gray.100" rounded="lg" />
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
