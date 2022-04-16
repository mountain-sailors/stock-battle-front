import React from 'react';
import { Box, Flex, Text, Image, Spacer, Progress } from 'native-base';
import moment from 'moment';
import 'moment/locale/ko';

import { getColorBySign } from '../../config/utils';

type RunningRoomInfoProp = {
  room: any;
};

const RunningRoomInfo: React.FC<RunningRoomInfoProp> = ({ room }) => {
  const dateDiff = moment(room.endDate).fromNow();
  let profitType = '수익률';
  if (room.winCondition === 1) profitType = '변동폭';
  else if (room.winCondition === 2) profitType = '총 수익';
  return (
    <Box
      w="100%"
      bg="#fff"
      rounded="lg"
      p="4"
      borderWidth="2"
      borderColor="primary.400"
    >
      <Box>
        <Box ml="40%" w="63px" h="24px" bg="#000" rounded="3">
          <Flex h="100%" direction="column" align="center" justify="center">
            <Text fontSize="xs" fontWeight="bold" color="#fff">
              현재 {room.rank}위
            </Text>
          </Flex>
        </Box>
        <Box
          ml="48%"
          style={{
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderLeftWidth: 5,
            borderRightWidth: 5,
            borderBottomWidth: 6,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: '#000',
            transform: [{ rotate: '180deg' }],
          }}
        ></Box>
        <Image
          ml="45%"
          width="28px"
          height="26px"
          source={require('./images/img-running.png')}
          alt="running image"
        />
        <Flex direction="column" justify="flex-end" align="flex-end">
          <Box w="100%" mt="1">
            <Progress
              h={1}
              value={55}
              bgColor="gray.100"
              _filledTrack={{ bgColor: 'primary.400', rounded: 'lg' }}
            />
          </Box>
        </Flex>
      </Box>
      <Spacer />
      <Flex direction="row" justify="space-between" mt={4}>
        <Box w="50%">
          <Text fontSize="xl" fontWeight="bold">
            {room.title}
          </Text>
          <Text fontSize="sm" color="#828282">
            {dateDiff} 종료
          </Text>
        </Box>
        <Spacer />
        <Box w="50%">
          <Flex direction="column" justify="flex-end" align="flex-end">
            <Text fontSize="sm">{profitType}</Text>
            <Text
              fontSize="xl"
              color={getColorBySign(room.profit)}
              fontWeight="bold"
            >
              {room.profit > 0 ? '+' : ''}
              {room.profit.toFixed(3)}
              {room.winCondition === 0 ? '%' : '₩'}
            </Text>
          </Flex>
        </Box>
      </Flex>
      <Spacer />
    </Box>
  );
};

export default RunningRoomInfo;
