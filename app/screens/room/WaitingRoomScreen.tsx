import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import {
  Button,
  Box,
  Flex,
  VStack,
  Image,
  Text,
  Badge,
  Spacer,
} from 'native-base';
import { Layout } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';
import { useGetRequest } from '../../config/api';

// const DUMMY_DATA = [
//   {
//     userName: '봄감자',
//     ticker: 'ARPPU',
//     amount: 12,
//   },
//   {
//     userName: '여름감자',
//     ticker: '',
//     amount: 0,
//   },
//   {
//     userName: '가을감자',
//     ticker: 'ARPPU',
//     amount: 12,
//   },
// ];
type UserStock = {
  id: number;
  username: string;
  ticker: string;
  amount: number;
};

type WaitingRoomScreenProp = StackScreenProps<RootStackParams, 'WaitingRoom'>;
const WaitingRoomScreen: React.FC<WaitingRoomScreenProp> = ({
  navigation,
  route,
}) => {
  const startDate = '10월 3일 오후 10시 30분';
  const { roomId, username } = route.params;
  const userStockList = useGetRequest(`/user-stock/${roomId}`).data;
  if (!userStockList || userStockList.message === 'Internal Server Error')
    return null;

  return (
    <Layout color="gray.50">
      <VStack space="2">
        <Flex
          direction="row"
          align="center"
          p={4}
          py={3}
          rounded="lg"
          bgColor="amber.100"
        >
          <Image
            size="26px"
            source={require('./images/icon-light.png')}
            alt="light"
          />
          <Text ml={2} fontSize="md">
            <Text fontWeight="bold">{startDate}</Text>에 시작됩니다!
          </Text>
        </Flex>
        {userStockList.map((v: UserStock) => (
          <Flex
            key={v.username}
            direction="row"
            align="center"
            p="4"
            py={5}
            rounded="lg"
            bgColor="white"
            borderWidth={v.ticker !== '' ? 2 : undefined}
            borderColor={v.ticker !== '' ? '#54E58E' : undefined}
          >
            {v.ticker !== null && (
              <Badge
                position="absolute"
                right={2}
                top={2}
                p="0"
                px="1"
                ml="1"
                rounded="sm"
                bgColor="#54E58E"
                _text={{
                  fontSize: 'xs',
                  fontWeight: 'black',
                  color: 'black',
                  fontStyle: 'italic',
                }}
              >
                ready!
              </Badge>
            )}
            <Box w="12" h="12" rounded="lg" bgColor="gray.100" />
            <Box ml="2">
              <Flex direction="row">
                <Text fontSize="md" fontWeight="bold" lineHeight="xs">
                  {v.username}
                </Text>
                {v.username === username && (
                  <Badge
                    p="0"
                    px="1"
                    ml="1"
                    rounded="sm"
                    bgColor="purple.500"
                    _text={{ fontSize: 'xs', color: 'white', lineHeight: 'xs' }}
                  >
                    me
                  </Badge>
                )}
              </Flex>
              <Text mt="1" fontSize="sm">
                {v.ticker !== null
                  ? `${v.ticker} ${v.amount}주`
                  : '아직 등록한 주식이 없어요!'}
              </Text>
            </Box>
          </Flex>
        ))}
      </VStack>
      <Spacer />
      <Button
        variant="solid"
        onPress={() =>
          navigation.navigate('RegisterStock', {
            stockName: '',
            roomId: roomId,
          })
        }
      >
        주식 등록하기
      </Button>
    </Layout>
  );
};

export default WaitingRoomScreen;
