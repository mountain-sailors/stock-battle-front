import React from 'react';
import { Box, Flex, Text, Image, Spacer, Progress } from 'native-base';
import moment from 'moment';
import 'moment/locale/ko';

type WaitingRoomInfoProp = {
  room: any;
};

const WaitingRoomInfo: React.FC<WaitingRoomInfoProp> = ({ room }) => {
  const dateDiff = moment(room.startDate).fromNow();
  return (
    <Box w="100%" bg="#fff" rounded="lg" p="4">
      <Box>
        <Box w="63px" h="24px" bg="#000" rounded="3">
          <Flex h="100%" direction="column" align="center" justify="center">
            <Text fontSize="xs" fontWeight="bold" color="#fff">
              준비중
            </Text>
          </Flex>
        </Box>
        <Box
          ml="3%"
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
        <Image ml="0%" size="27px" source={require('./horse.png')} alt="icon" />
        <Flex direction="column" justify="flex-end" align="flex-end">
          <Box w="100%" mt="1">
            <Progress
              h={1}
              value={0}
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
            {dateDiff} 시작
          </Text>
        </Box>
        <Spacer />
      </Flex>
      <Spacer />
    </Box>
  );
};

export default WaitingRoomInfo;
