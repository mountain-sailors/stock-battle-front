import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Heading, HStack, Pressable, VStack } from 'native-base';

import { Layout, SearchInput } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';
import { useGetRequest } from '../../config/api';

type Stock = {
  id: number;
  price: number;
  ticker: string;
};

type SearchStockScreenProp = StackScreenProps<RootStackParams, 'SearchStock'>;
const SearchStockScreen: React.FC<SearchStockScreenProp> = ({
  navigation,
  route,
}) => {
  const { roomId } = route.params;
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const handleChange = (event: any) => setSearchKeyword(event.nativeEvent.text);
  // const getColorBySign = (value: number) => {
  //   const sign = Math.sign(value);
  //   if (sign === 1) return 'red.400';
  //   if (sign === -1) return 'blue.400';
  //   return 'black';
  // };
  const stockList = useGetRequest('/stock').data;
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
        {stockList.map((v: Stock) => (
          <Pressable
            key={v.ticker}
            onPress={() =>
              // TODO: 주식 등록에 필요한 값 확인 후 object 형태로 params로 전달하기
              navigation.navigate('RegisterStock', {
                stockName: v.ticker,
                roomId,
              })
            }
          >
            <HStack space={2} alignItems="center">
              <Heading flex={1} fontSize="md" color="black">
                {v.ticker}
              </Heading>
              <Box>
                <Heading flex={1} fontSize="md" textAlign="right" color="black">
                  {`$${v.price}`}
                </Heading>
              </Box>
            </HStack>
          </Pressable>
        ))}
      </VStack>
    </Layout>
  );
};

export default SearchStockScreen;
