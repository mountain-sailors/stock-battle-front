import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { WebView } from 'react-native-webview';
import EventSource, { EventSourceListener } from 'react-native-sse';
import * as SecureStore from 'expo-secure-store';
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Text,
  Progress,
  VStack,
  Heading,
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

const WEBVIEW_ENDPOINT = 'https://jumajuma.netlify.app';
const DASHBOARD_ENDPOINT = 'https://zumazuma.o-r.kr/api/room/dashboard';

const TRACK_DOMAIN = ['now', 'total'] as const;
type Track = typeof TRACK_DOMAIN[number];

type DashboardData = {
  profit: number;
  rank: number;
  userId: number;
  avatar: string;
  username: string;
  ticker: string;
  stockName: string;
  color: string;
};
type RunningRoomScreenProp = StackScreenProps<RootStackParams, 'RunningRoom'>;
const RunningRoomScreen: React.FC<RunningRoomScreenProp> = ({ route }) => {
  const { roomId } = route.params;
  const [data, setData] = React.useState<DashboardData[]>();
  const [token, setToken] = React.useState('');
  const [track, setTrack] = React.useState<Track>('now');
  const meData = useGetRequest(`/me`).data;
  const userStockData = useGetRequest(`/user-stock/${roomId}`).data;
  const roomData = useGetRequest('/room').data;
  const playerData = useGetRequest(`/player/${roomId}`).data;
  const currentRoomInfo = roomData.find((v: any) => v.id === roomId);
  const myData = data?.find((v) => v.userId === meData.userId);
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
              stockName: userStockData.find(
                (k: { id: number }) => k.id === v.userId,
              ).stockName,
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
  }, [token, playerData, userStockData]);

  if (!roomData || !playerData || !userStockData || !meData) {
    return (
      <Center flex={1}>
        <Spinner size="lg" />
      </Center>
    );
  }

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
                source={require('../main/images/img-running.png')}
                alt="running image"
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
              현재&nbsp;
              <Text fontSize="3xl" fontWeight="bold" color={myData?.color}>
                {myData?.rank}
              </Text>
              위
            </Heading>
            <HStack space={2}>
              <Text fontSize="lg" color="black">
                {`${myData?.stockName} (${myData?.ticker})`}
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
          {/* Web view. show screen by track */}
          <Box
            h="350px"
            overflow="hidden"
            display={track === 'now' ? 'flex' : 'none'}
          >
            <WebView
              source={{
                uri: `${WEBVIEW_ENDPOINT}/?roomid=${roomId}&count=10&token=${token}`,
              }}
            />
          </Box>
          <Box
            h="350px"
            overflow="hidden"
            display={track === 'total' ? 'flex' : 'none'}
          >
            <WebView
              source={{
                uri: `${WEBVIEW_ENDPOINT}/?roomid=${roomId}&token=${token}`,
              }}
            />
          </Box>
          <HStack space={2}>
            {TRACK_DOMAIN.map((v) => (
              <Button
                key={v}
                variant={track === v ? 'solid' : 'outline'}
                flex={1}
                size="md"
                p={1}
                onPress={() => setTrack(v)}
              >
                {v === 'now' ? '현재 트랙' : '전체 트랙'}
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
                <Box flex={1} _text={{ textAlign: 'right', fontSize: 'md' }}>
                  {user.stockName}
                  <Text fontSize="sm" textAlign="right" color="gray.400">
                    {user.ticker}
                  </Text>
                </Box>
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
