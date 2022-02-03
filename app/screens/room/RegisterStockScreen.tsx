import React from 'react';
import { useSWRConfig } from 'swr';
import { StackScreenProps } from '@react-navigation/stack';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {
  Box,
  Button,
  Flex,
  Input,
  Pressable,
  Spacer,
  Text,
  VStack,
} from 'native-base';

import { Layout } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';
import { callAPI } from '../../config/api';

type RegisterStockScreenProp = StackScreenProps<
  RootStackParams,
  'RegisterStock'
>;
const RegisterStockScreen: React.FC<RegisterStockScreenProp> = ({
  route,
  navigation,
}) => {
  const { stockName, roomId, ticker } = route.params;
  const { mutate } = useSWRConfig();

  const [amount, setAmount] = React.useState('');
  const handleChange = (text: string) => setAmount(text);

  const registerStock = (
    id: number,
    stockTicker: string,
    name: string,
    stockAmount: number,
  ) => {
    callAPI(`/user-stock`, 'POST', {
      roomId: id,
      ticker: stockTicker,
      amount: stockAmount,
      stockName: name,
    })
      .then((res) => {
        if (res.status !== 200) throw new Error(res.status.toString());
        mutate(`/user-stock/${id}`);
        navigation.goBack();
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
            주식 종류
          </Text>
          <Pressable onPress={() => navigation.push('SearchStock', { roomId })}>
            <Flex
              mt={2}
              flexDirection="row"
              align="center"
              p="3"
              bgColor="gray.100"
              rounded="lg"
            >
              <AntDesignIcon name="search1" size={18} color="gray" />
              <Text
                px={2}
                fontSize="md"
                color={stockName ? 'black' : 'gray.400'}
              >
                {stockName ?? '주식을 검색해주세요'}
              </Text>
            </Flex>
          </Pressable>
        </Box>
        <Box>
          <Flex direction="row" justify="space-between" align="center">
            <Text fontSize="md" fontWeight="bold">
              주식 수
            </Text>
            <Spacer />
            <Box rounded="lg" bgColor="gray.100">
              <Input
                w={32}
                variant="filled"
                value={amount}
                placeholder="구매할 수량"
                onChangeText={handleChange}
                textAlign="right"
                keyboardType="number-pad"
              />
            </Box>
            <Text ml={2} fontSize="md">
              개
            </Text>
          </Flex>
          <Text mt="4" textAlign="center" color="gray.500" fontSize="xs">
            종목 가격은 시작일 기준 시가(당일 최초로 체결된 거래가격)입니다.
          </Text>
        </Box>
      </VStack>
      <Spacer />
      <Button
        variant="solid"
        onPress={() => {
          registerStock(roomId, ticker, stockName, +amount);
        }}
      >
        등록하기
      </Button>
    </Layout>
  );
};

export default RegisterStockScreen;
