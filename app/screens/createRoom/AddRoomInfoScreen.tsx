import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { format, addDays } from 'date-fns';
import ko from 'date-fns/locale/ko';
import {
  Box,
  Button,
  Center,
  Flex,
  Text,
  VStack,
  Pressable,
  Image,
  Select,
  Spacer,
} from 'native-base';
import { Layout } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';
import { callAPI } from '../../config/api';

const WIN_TYPE = ['MAX_PROFIT_RATE', 'MAX_FLUCTUATION', 'MAX_PROFIT'];

const WIN_CONDITIONS = [
  {
    typeNumber: 0,
    typeString: WIN_TYPE[0],
    iconName: require('./images/icon-rate.png'),
    title: '주당 수익률',
    description:
      '기간 내 주식 한 주당 가장 많은 수익률을 내었을 때 우승합니다.',
  },
  {
    typeNumber: 1,
    typeString: WIN_TYPE[1],
    iconName: require('./images/icon-wave.png'),
    title: '변동폭',
    description: '제일 변동이 큰 사람이 우승합니다.',
  },
  {
    typeNumber: 2,
    typeString: WIN_TYPE[2],
    iconName: require('./images/icon-moneybag.png'),
    title: '최다 수익',
    description: '제일 수익을 많이 올린 사람이 우승합니다.',
  },
];

type RoomField = {
  title: string;
  winCondition: string;
  maxCapacity: number;
  startDate: string;
  endDate: string;
};
type AddRoomInfoScreenProp = StackScreenProps<RootStackParams, 'AddRoomInfo'>;
const AddRoomInfoScreen: React.FC<AddRoomInfoScreenProp> = ({
  navigation,
  route,
}) => {
  const { roomName } = route.params;
  const formattedDate = (date: Date) =>
    format(date, 'yyyy. MM. dd (EEE)', { locale: ko });
  const today = new Date();
  const [formField, setFormField] = React.useState<RoomField>({
    title: roomName,
    winCondition: 'MAX_PROFIT_RATE',
    maxCapacity: 2,
    startDate: format(today, 'yyyy-MM-dd'),
    endDate: format(addDays(today, 6), 'yyyy-MM-dd'),
  });
  const createRoom = () => {
    callAPI('/room', 'POST', formField)
      .then((res) => res.json())
      .then((res) => {
        navigation.navigate('CompleteRoom', { roomCode: res.invitationCode });
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  };
  return (
    <Layout>
      <VStack space="4">
        <Box>
          <Text fontSize="md" fontWeight="bold">
            우승 조건
          </Text>
          <Flex direction="row" justify="space-between" mt="4">
            {WIN_CONDITIONS.map((v) => (
              <Pressable
                key={v.title}
                onPress={() =>
                  setFormField({ ...formField, winCondition: v.typeString })
                }
                flex="1"
              >
                <Center>
                  <Image
                    size="30px"
                    opacity={formField.winCondition === v.typeString ? 1 : 0.3}
                    source={v.iconName}
                    alt={v.title}
                  />
                  <Text
                    color={
                      formField.winCondition === v.typeString
                        ? 'black'
                        : 'gray.400'
                    }
                    mt="1"
                    fontSize="sm"
                  >
                    {v.title}
                  </Text>
                </Center>
              </Pressable>
            ))}
          </Flex>
          <Text mt="4" textAlign="center" color="gray.500" fontSize="xs">
            {
              WIN_CONDITIONS[WIN_TYPE.indexOf(formField.winCondition)]
                .description
            }
          </Text>
        </Box>
        <Flex direction="row" justify="space-between" align="center">
          <Text fontSize="md" fontWeight="bold">
            최대 인원
          </Text>
          <Box rounded="lg" bgColor="gray.100">
            <Select
              variant="filled"
              minW="80px"
              selectedValue={formField.maxCapacity.toString()}
              onValueChange={(value) =>
                setFormField({
                  ...formField,
                  maxCapacity: Number(value) || 0,
                })
              }
            >
              {new Array(5).fill(null).map((_, i) => (
                <Select.Item
                  key={i}
                  label={`${i + 1}명`}
                  value={(i + 1).toString()}
                />
              ))}
            </Select>
          </Box>
        </Flex>
        <Box>
          <Flex direction="row" justify="space-between" align="center">
            <Text fontSize="md" fontWeight="bold">
              시작일
            </Text>
            <Box rounded="lg" bgColor="gray.100">
              <Select
                variant="filled"
                minW="160px"
                selectedValue={formField.startDate}
                onValueChange={(value) =>
                  setFormField({
                    ...formField,
                    startDate: value,
                    endDate: format(addDays(new Date(value), 6), 'yyyy-MM-dd'),
                  })
                }
              >
                {new Array(5).fill(null).map((_, i) => (
                  <Select.Item
                    key={i}
                    label={formattedDate(addDays(today, i))}
                    value={format(addDays(today, i), 'yyyy-MM-dd')}
                  />
                ))}
              </Select>
            </Box>
          </Flex>
          <Text mt="4" textAlign="center" color="gray.500" fontSize="xs">
            종목 가격은 시작일 기준 시가(당일 최초로 체결된 거래가격)입니다.
          </Text>
        </Box>
        <Flex direction="row" justify="space-between" align="center">
          <Text fontSize="md" fontWeight="bold">
            기간
          </Text>
          <Center p="3" bgColor="gray.100" rounded="lg">
            <Text px={2} fontSize="sm" color="gray.400">
              7일
            </Text>
          </Center>
        </Flex>
        <Flex direction="row" justify="space-between" align="center">
          <Center p="3" bgColor="gray.100" rounded="lg">
            <Text px={2} fontSize="sm" color="gray.400">
              {formattedDate(new Date(formField.startDate))}
            </Text>
          </Center>
          <Text>~</Text>
          <Center p="3" bgColor="gray.100" rounded="lg">
            <Text px={2} fontSize="sm" color="gray.400">
              {formattedDate(new Date(formField.endDate))}
            </Text>
          </Center>
        </Flex>
      </VStack>
      <Spacer />
      <Button variant="solid" onPress={() => createRoom()}>
        다음
      </Button>
    </Layout>
  );
};

export default AddRoomInfoScreen;
