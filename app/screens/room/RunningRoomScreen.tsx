import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { WebView } from 'react-native-webview';
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
} from 'native-base';

import { Layout } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';

const PERIOD_DOMAIN = ['today', 'total'] as const;
type Period = typeof PERIOD_DOMAIN[number];

const WEBVIEW_URI = 'https://jumajuma.netlify.app/';

type RunningRoomScreenProp = StackScreenProps<RootStackParams, 'CompleteRoom'>;
const RunningRoomScreen: React.FC<RunningRoomScreenProp> = () => {
  const [period, setPeriod] = React.useState<Period>('today');
  return (
    <Layout>
      <Box position="relative" pt={20}>
        <Flex position="absolute" align="center" justify="space-between">
          <Center
            px={3}
            py={1}
            rounded="md"
            bgColor="black"
            _text={{ fontSize: 'xs', fontWeight: 'bold', color: 'white' }}
          >
            남은 시간 1일
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
            source={require('../main/horse.png')}
            alt="trophy"
          />
        </Flex>
        <Progress
          value={45}
          h={1}
          bgColor="gray.100"
          _filledTrack={{ bgColor: 'primary.400', rounded: 'lg' }}
        />
      </Box>
      <VStack mt={6}>
        <Heading size="xl" fontWeight="bold" color="black">
          {`ARPPU\n$34,030`}
        </Heading>
        <Text fontSize="sm" fontWeight="bold" color="red.400">
          +500 (0.6%)
        </Text>
      </VStack>
      {/* Web view */}
      <Box h="300px" my={4} overflow="hidden">
        <WebView source={{ uri: WEBVIEW_URI }} />
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
        <HStack space={2} alignItems="center">
          <Heading fontSize="md" color="red.400">
            1
          </Heading>
          <Box w="12" h="12" rounded="lg" bgColor="gray.100" />
          <Heading flex={1} fontSize="md" color="black">
            아무개
          </Heading>
          <Text flex={1} fontSize="md" textAlign="right" color="black">
            ARPPU
          </Text>
          <Heading flex={1} fontSize="md" textAlign="right" color="red.400">
            +3.7%
          </Heading>
        </HStack>
        <HStack space={2} alignItems="center">
          <Heading fontSize="md" color="primary.400">
            2
          </Heading>
          <Box w="12" h="12" rounded="lg" bgColor="gray.100" />
          <Heading flex={1} fontSize="md" color="black">
            아무개
          </Heading>
          <Text flex={1} fontSize="md" textAlign="right" color="black">
            ARPPU
          </Text>
          <Heading flex={1} fontSize="md" textAlign="right" color="red.400">
            +3.7%
          </Heading>
        </HStack>
      </VStack>
    </Layout>
  );
};

export default RunningRoomScreen;
