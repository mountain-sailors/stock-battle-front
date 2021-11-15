import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Heading, HStack, Text, Pressable, VStack } from 'native-base';

import { Layout, SearchInput } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';

const DUMMY_DATA = [
  {
    name: 'ARPPU',
    value: 790.2,
    rate: 500,
    ratePer: 0.6,
  },
  {
    name: 'APPLE',
    value: 1300,
    rate: -500,
    ratePer: 0.6,
  },
  {
    name: 'ARPPU',
    value: 790.2,
    rate: 500,
    ratePer: 0.6,
  },
];

type SearchStockScreenProp = StackScreenProps<RootStackParams, 'SearchStock'>;
const SearchStockScreen: React.FC<SearchStockScreenProp> = ({ navigation }) => {
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const handleChange = (event: any) => setSearchKeyword(event.target.amount);
  const getColorBySign = (value: number) => {
    const sign = Math.sign(value);
    if (sign === 1) return 'red.400';
    if (sign === -1) return 'blue.400';
    return 'black';
  };
  return (
    <Layout>
      <SearchInput
        placeholder="주식을 검색해주세요"
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        handleChange={handleChange}
      />
      <VStack mt={4} space={4}>
        {DUMMY_DATA.map((v) => (
          <Pressable
            onPress={() =>
              // TODO: 주식 등록에 필요한 값 확인 후 object 형태로 params로 전달하기
              navigation.navigate('RegisterStock', { stockName: v.name })
            }
          >
            <HStack space={2} alignItems="center">
              <Heading flex={1} fontSize="md" color="black">
                {v.name}
              </Heading>
              <Box>
                <Heading flex={1} fontSize="md" textAlign="right" color="black">
                  {`$${v.value}`}
                </Heading>
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  textAlign="right"
                  color={getColorBySign(v.rate)}
                >
                  {Math.sign(v.rate) === 1 ? `+${v.rate}` : v.rate}
                  &nbsp;
                  {`(${v.ratePer}%)`}
                </Text>
              </Box>
            </HStack>
          </Pressable>
        ))}
      </VStack>
    </Layout>
  );
};

export default SearchStockScreen;
