import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Heading, HStack, Pressable, VStack, Text, Spacer } from 'native-base';

import { Layout, SearchInput } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';
import { useGetRequest } from '../../config/api';
import { GetStockRes, Stock } from '../../config/types';

type SearchStockScreenProp = StackScreenProps<RootStackParams, 'SearchStock'>;
const SearchStockScreen: React.FC<SearchStockScreenProp> = ({
  navigation,
  route,
}) => {
  const { roomId } = route.params;
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const handleChange = (event: any) => {
    setSearchKeyword(event.nativeEvent.text);
  };
  const stockList: GetStockRes = useGetRequest('/stock').data;
  if (!stockList) return null;

  return (
    <Layout>
      <SearchInput
        placeholder="주식을 검색해주세요"
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        handleChange={handleChange}
      />
      <VStack mt={4} space={4}>
        {stockList
          .filter((v: { ticker: string }) =>
            v.ticker.toLowerCase().includes(searchKeyword.toLowerCase()),
          )
          .map((v: Stock) => (
            <Pressable
              key={v.ticker}
              onPress={() =>
                navigation.navigate('RegisterStock', {
                  ticker: v.ticker,
                  stockName: v.stockName,
                  roomId,
                })
              }
              mx={-4}
              px={4}
              _pressed={{ bgColor: 'gray.100' }}
            >
              <HStack space={2} alignItems="center" py={2}>
                <Heading fontSize="md" color="black">
                  {v.stockName}
                </Heading>
                <Text fontSize="sm" textAlign="right" color="gray.400">
                  {v.ticker}
                </Text>
                <Spacer />
                <Text fontSize="md" textAlign="right" color="gray.500">
                  {`$${v.price}`}
                </Text>
              </HStack>
            </Pressable>
          ))}
      </VStack>
    </Layout>
  );
};

export default SearchStockScreen;
