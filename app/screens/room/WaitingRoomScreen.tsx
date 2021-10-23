import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Flex, VStack, Image, Text, Badge } from 'native-base';
import { Layout } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';

const DUMMY_DATA = [
  {
    userName: '봄감자',
    ticker: 'ARPPU',
    amount: 12,
  },
  {
    userName: '여름감자',
    ticker: '',
    amount: 0,
  },
  {
    userName: '가을감자',
    ticker: 'ARPPU',
    amount: 12,
  },
];

type WaitingRoomScreenProp = StackScreenProps<RootStackParams, 'CompleteRoom'>;
const WaitingRoomScreen: React.FC<WaitingRoomScreenProp> = () => {
  const startDate = '10월 3일 오후 10시 30분';
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
          <Image size="26px" source={require('./icon-light.png')} alt="light" />
          <Text ml={2} fontSize="md">
            <Text fontWeight="bold">{startDate}</Text>에 시작됩니다!
          </Text>
        </Flex>
        {DUMMY_DATA.map((v) => (
          <Flex
            direction="row"
            align="center"
            p="4"
            py={5}
            rounded="lg"
            bgColor="white"
            borderWidth={v.ticker !== '' ? 2 : undefined}
            borderColor={v.ticker !== '' ? '#54E58E' : undefined}
          >
            {v.ticker !== '' && (
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
                  {v.userName}
                </Text>
                {v.userName === '봄감자' && (
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
                {v.ticker !== ''
                  ? `${v.ticker} ${v.amount}주`
                  : '아직 등록한 주식이 없어요!'}
              </Text>
            </Box>
          </Flex>
        ))}
      </VStack>
    </Layout>
  );
};

export default WaitingRoomScreen;
