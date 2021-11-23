import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { WebView } from 'react-native-webview';
import EventSource, { EventSourceListener } from 'react-native-sse';
import * as SecureStore from 'expo-secure-store';
import {
  Box,
  Center,
  Flex,
  HStack,
  Image,
  Text,
  Progress,
  VStack,
  Heading,
  Button,
  Spinner,
  Avatar,
} from 'native-base';

import { Layout } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';
import { useGetRequest } from '../../config/api';
import {
  getColorBySign,
  getPercentByWinCondition,
  getRemainingDay,
} from '../../config/utils';
import { IMAGE_URL } from '../../config/consts';

const PERIOD_DOMAIN = ['today', 'total'] as const;
type Period = typeof PERIOD_DOMAIN[number];

const WEBVIEW_ENDPOINT = 'https://jumajuma.netlify.app';
const DASHBOARD_ENDPOINT = 'https://stock-battle.p-e.kr/api/room/dashboard';

type DashboardData = {
  profit: number;
  rank: number;
  userId: number;
  avatar: string;
  username: string;
  ticker: string;
  color: string;
};
type RunningRoomScreenProp = StackScreenProps<RootStackParams, 'RunningRoom'>;
const RunningRoomScreen: React.FC<RunningRoomScreenProp> = ({ route }) => {
  const { roomId } = route.params;
  const [data, setData] = React.useState<DashboardData[]>();
  const [period, setPeriod] = React.useState<Period>('today');
  const [token, setToken] = React.useState('');
  const meData = useGetRequest(`/me`).data;
  const userStockData = useGetRequest(`/user-stock/${roomId}`).data;
  const roomData = useGetRequest('/room').data;
  const playerData = useGetRequest(`/player/${roomId}`).data;
  const currentRoomInfo = roomData.find((v: any) => v.id === roomId);
  const myData = data?.find((v) => v.userId === meData.userId);

  if (!roomData || !playerData || !userStockData) {
    return (
      <Center flex={1}>
        <Spinner size="lg" />
      </Center>
    );
  }
  const remainingDay = getRemainingDay(
    currentRoomInfo.startDate,
    currentRoomInfo.endDate,
  );

  React.useEffect(() => {
    async function getSecureValue(key: string) {
      const value = await SecureStore.getItemAsync(key);
      setToken(value ?? '');
    }
    getSecureValue('token');
  }, []);
  React.useEffect(() => {
    if (token) {
      const eventSource = new EventSource(`${DASHBOARD_ENDPOINT}/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const listener: EventSourceListener = (event) => {
        if (event.type === 'message') {
          const res = JSON.parse(event.data ?? '');
          const filteredData = res[res.length - 1].data.sort(
            (a: { rank: number }, b: { rank: number }) => a.rank - b.rank,
          );
          setData(
            filteredData.map((v: DashboardData) => ({
              ...v,
              avatar: playerData.find((k: { id: number }) => k.id === v.userId)
                .avatar,
              username: playerData.find(
                (k: { id: number }) => k.id === v.userId,
              ).username,
              color: playerData.find((k: { id: number }) => k.id === v.userId)
                .color,
              ticker: userStockData.find(
                (k: { id: number }) => k.id === v.userId,
              ).ticker,
            })),
          );
        } else if (event.type === 'error') {
          console.error('Connection error:', event.message);
        } else if (event.type === 'exception') {
          console.error('Error:', event.message, event.error);
        }
      };
      eventSource.addEventListener('message', listener);
      eventSource.addEventListener('error', listener);

      return () => {
        eventSource.removeAllEventListeners();
        eventSource.close();
      };
    }
  }, [token]);

  return (
    <Layout>
      {data === undefined && (
        <Center flex={1}>
          <Spinner size="lg" />
        </Center>
      )}
      {data !== undefined && (
        <>
          <Box position="relative" pt={20}>
            <Flex
              position="absolute"
              left={`${72 * remainingDay.percent * 0.01}%`}
              align="center"
              justify="space-between"
            >
              <Center
                px={3}
                py={1}
                rounded="md"
                bgColor="black"
                _text={{ fontSize: 'xs', fontWeight: 'bold', color: 'white' }}
              >
                {`남은 시간 ${remainingDay.diffDay}일`}
                <Box
                  position="absolute"
                  w={3}
                  h={3}
                  bottom={-5}
                  rounded="sm"
                  bgColor="black"
                  style={{ transform: [{ rotate: '45deg' }] }}
                />
              </Center>
              <Image
                mt={2}
                size="40px"
                source={require('../main/images/horse.png')}
                alt="trophy"
              />
            </Flex>
            <Progress
              value={remainingDay.percent === 0 ? 15 : remainingDay.percent}
              h={1}
              bgColor="gray.100"
              _filledTrack={{ bgColor: 'primary.400', rounded: 'lg' }}
            />
          </Box>
          <VStack mt={6}>
            <Heading size="xl" color="black">
              {`현재 `}
              <Text fontSize="3xl" fontWeight="bold" color="secondary.300">
                {myData?.rank}
              </Text>
              위
            </Heading>
            <HStack space={2}>
              <Text fontSize="lg" color="black">
                {myData?.ticker}
              </Text>
              <Text
                fontSize="lg"
                fontWeight="bold"
                color={getColorBySign(Number(myData?.profit))}
              >
                {`${myData?.profit}${getPercentByWinCondition(
                  currentRoomInfo.winCondition,
                )}`}
              </Text>
            </HStack>
          </VStack>
          {/* Web view */}
          <Box h="350px" overflow="hidden">
            <WebView
              source={{ uri: `${WEBVIEW_ENDPOINT}/?roomid=${roomId}` }}
            />
          </Box>
          <HStack space={2}>
            {PERIOD_DOMAIN.map((v) => (
              <Button
                key={v}
                variant={period === v ? 'solid' : 'ghost'}
                flex={1}
                size="md"
                p={1}
                onPress={() => setPeriod(v)}
              >
                {v === 'today' ? '오늘 구간' : '전체 구간'}
              </Button>
            ))}
          </HStack>
          <VStack mt={8} space={4}>
            {data?.map((user, idx: number) => (
              <HStack key={user.userId} space={3} alignItems="center">
                <Heading fontSize="md" color={user.color}>
                  {idx + 1}
                </Heading>
                <Avatar
                  size="50px"
                  bg="gray.50"
                  padding={1}
                  source={
                    IMAGE_URL[
                      Number(user.avatar) > 0 ? Number(user.avatar) - 1 : 0
                    ]
                  }
                >
                  avatar
                </Avatar>
                <Heading flex={1} fontSize="md" color="black">
                  {user.username}
                </Heading>
                <Text flex={1} fontSize="md" textAlign="right" color="black">
                  {user.ticker}
                </Text>
                <Heading
                  flex={1}
                  fontSize="md"
                  textAlign="right"
                  color={getColorBySign(Number(user.profit))}
                >
                  {`${user.profit}${getPercentByWinCondition(
                    currentRoomInfo.winCondition,
                  )}`}
                </Heading>
              </HStack>
            ))}
          </VStack>
        </>
      )}
    </Layout>
  );
};

export default RunningRoomScreen;
