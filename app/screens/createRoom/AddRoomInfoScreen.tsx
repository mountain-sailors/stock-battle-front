import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { format, addDays } from 'date-fns';
import ko from 'date-fns/locale/ko';
import {
  Box,
  Center,
  Flex,
  Text,
  VStack,
  Pressable,
  Image,
  Select,
  Spacer,
} from 'native-base';
import { Button, Layout } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';

const WIN_CONDITIONS = [
  {
    typeNumber: 0,
    iconName: require('./icon-rate.png'),
    title: '주당 수익률',
    description:
      '기간 내 주식 한 주당 가장 많은 수익률을 내었을 때 우승합니다.',
  },
  {
    typeNumber: 1,
    iconName: require('./icon-wave.png'),
    title: '변동률',
    description: '제일 변동이 큰 사람이 우승합니다.',
  },
  {
    typeNumber: 2,
    iconName: require('./icon-moneybag.png'),
    title: '최다 수익',
    description: '제일 수익률이 큰 사람이 우승합니다.',
  },
];

type RoomField = {
  roomName: string;
  winCondition: number;
  maxCapacity: number;
  startDate: string;
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
    roomName,
    winCondition: 0,
    maxCapacity: 2,
    startDate: format(today, 'yyyy-MM-dd'),
  });
  return (
    <Layout>
      <VStack space="4">
        <Box>
          <Text fontSize="xl" fontWeight="bold">
            우승 조건
          </Text>
          <Flex direction="row" justify="space-between" mt="4">
            {WIN_CONDITIONS.map((v) => (
              <Pressable
                key={v.title}
                onPress={() =>
                  setFormField({ ...formField, winCondition: v.typeNumber })
                }
                flex="1"
              >
                <Center>
                  <Image
                    size="30px"
                    opacity={formField.winCondition === v.typeNumber ? 1 : 0.3}
                    source={v.iconName}
                    alt={v.title}
                  />
                  <Text
                    color={
                      formField.winCondition === v.typeNumber
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
            {WIN_CONDITIONS[formField.winCondition].description}
          </Text>
        </Box>
        <Flex direction="row" justify="space-between" align="center">
          <Text fontSize="md" fontWeight="bold">
            최대 인원
          </Text>
          <Select
            minWidth="80px"
            h="35px"
            borderWidth="0"
            borderRadius="lg"
            fontSize="sm"
            textAlign="center"
            selectedValue={formField.maxCapacity.toString()}
            onValueChange={(value) =>
              setFormField({
                ...formField,
                maxCapacity: Number(value) || 0,
              })
            }
            variant="filled"
          >
            {new Array(5).fill(null).map((_, i) => (
              <Select.Item
                key={i}
                label={`${i + 1}명`}
                value={(i + 1).toString()}
              />
            ))}
          </Select>
        </Flex>
        <Box>
          <Flex direction="row" justify="space-between" align="center">
            <Text fontSize="md" fontWeight="bold">
              시작일
            </Text>
            <Select
              minWidth="160"
              h="35px"
              borderWidth="0"
              borderRadius="lg"
              fontSize="sm"
              textAlign="center"
              selectedValue={formField.startDate}
              onValueChange={(value) =>
                setFormField({
                  ...formField,
                  startDate: value,
                })
              }
              variant="filled"
            >
              {new Array(5).fill(null).map((_, i) => (
                <Select.Item
                  key={i}
                  label={formattedDate(addDays(today, i))}
                  value={format(addDays(today, i), 'yyyy-MM-dd')}
                />
              ))}
            </Select>
          </Flex>
          <Text mt="4" textAlign="center" color="gray.500" fontSize="xs">
            종목 가격은 시작일 기준 시가(당일 최초로 체결된 거래가격)입니다.
          </Text>
        </Box>
        <Flex direction="row" justify="space-between" align="center">
          <Text fontSize="md" fontWeight="bold">
            기간
          </Text>
          <Center h="35px" paddingX="4" bgColor="gray.100" borderRadius="lg">
            <Text fontSize="sm" color="gray.400">
              7일
            </Text>
          </Center>
        </Flex>
        <Flex direction="row" justify="space-between" align="center">
          <Center h="35px" paddingX="4" bgColor="gray.100" borderRadius="lg">
            <Text fontSize="sm" color="gray.400">
              {formattedDate(new Date(formField.startDate))}
            </Text>
          </Center>
          <Text>~</Text>
          <Center h="35px" paddingX="4" bgColor="gray.100" borderRadius="lg">
            <Text fontSize="sm" color="gray.400">
              {formattedDate(addDays(new Date(formField.startDate), 6))}
            </Text>
          </Center>
        </Flex>
      </VStack>
      <Spacer />
      <Button
        title="다음"
        variant="filled"
        onClick={() => {
          navigation.navigate('CompleteRoom', { roomCode: '123456' });
        }}
      />
    </Layout>
  );
};

export default AddRoomInfoScreen;
