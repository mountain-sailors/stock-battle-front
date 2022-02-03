import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { format, parse } from 'date-fns';
import ko from 'date-fns/locale/ko';
import {
  Avatar,
  Button,
  Box,
  Flex,
  VStack,
  Image,
  Text,
  Badge,
  Spacer,
  useToast,
} from 'native-base';

import { Layout } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';
import { useGetRequest } from '../../config/api';
import { IMAGE_URL } from '../../config/consts';
import { Clipboard } from 'react-native';

type UserStock = {
  id: number;
  username: string;
  ticker: string;
  amount: number;
  stockName: string;
};
type Player = {
  avatar: string;
  color: string;
  id: number;
  username: string;
};

type WaitingRoomScreenProp = StackScreenProps<RootStackParams, 'WaitingRoom'>;
const WaitingRoomScreen: React.FC<WaitingRoomScreenProp> = ({
  navigation,
  route,
}) => {
  const { roomId, username } = route.params;
  const { data: userStockList } = useGetRequest(`/user-stock/${roomId}`);
  const currentRoomInfo = useGetRequest(`/room/${roomId}`).data;
  const playerData = useGetRequest(`/player/${roomId}`).data;
  const toast = useToast();
  if (
    !userStockList ||
    userStockList.message === 'Internal Server Error' ||
    !currentRoomInfo ||
    currentRoomInfo.message === 'Internal Server Error' ||
    !playerData ||
    playerData.message === 'Internal Server Error'
  )
    return null;
  const startDate = format(
    parse(currentRoomInfo.startDate.split('T')[0], 'yyyy-MM-dd', new Date()),
    'yyyy년 MM월 dd일 EEE요일',
    { locale: ko },
  );
  const getAvatarIdx = (player: Player[], targetId: number) => {
    const targetAvatar = player.find((k) => k.id === targetId)?.avatar;
    return targetAvatar === undefined ? 0 : Number(targetAvatar) - 1;
  };

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
          <Text ml={2} fontSize="sm">
            <Text fontSize="sm" fontWeight="bold">
              {startDate}
            </Text>
            에 시작됩니다!
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
            borderWidth={v.ticker !== null ? 2 : undefined}
            borderColor={v.ticker !== null ? 'primary.400' : undefined}
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
                bgColor="primary.400"
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
            <Avatar
              size="50px"
              bg="gray.50"
              padding={1}
              source={IMAGE_URL[getAvatarIdx(playerData, v.id)]}
            >
              avatar
            </Avatar>
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
                    bgColor="secondary.300"
                    _text={{ fontSize: 'xs', color: 'white', lineHeight: 'xs' }}
                  >
                    me
                  </Badge>
                )}
              </Flex>
              <Text mt="1" fontSize="sm">
                {v.ticker !== null
                  ? `${v.stockName}(${v.ticker}) ${v.amount}주`
                  : '아직 등록한 주식이 없어요!'}
              </Text>
            </Box>
          </Flex>
        ))}
      </VStack>
      <Spacer />
      <VStack space="2">
        <Button
          variant="outline"
          onPress={() => {
            Clipboard.setString(currentRoomInfo.invitationCode);
            toast.show({
              status: 'success',
              title: '초대 코드 복사',
              description: '클립보드에 복사되었습니다.',
            });
          }}
        >
          초대코드 공유하기
        </Button>
        <Button
          variant="solid"
          onPress={() =>
            navigation.navigate('RegisterStock', {
              stockName: '',
              ticker: '',
              roomId: roomId,
            })
          }
        >
          주식 등록하기
        </Button>
      </VStack>
    </Layout>
  );
};

export default WaitingRoomScreen;
