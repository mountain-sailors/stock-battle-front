import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Heading, Pressable, VStack } from 'native-base';

import { Layout, SearchInput } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';

const DUMMY_DATA = [
  {
    name: '감자돌이',
  },
  {
    name: '감자돌이2',
  },
  {
    name: '감자돌이3',
  },
];

type SearchProfileScreenProp = StackScreenProps<
  RootStackParams,
  'SearchProfile'
>;
const SearchProfileScreen: React.FC<SearchProfileScreenProp> = () => {
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const handleChange = (event: any) => setSearchKeyword(event.target.amount);

  return (
    <Layout>
      <SearchInput
        placeholder="닉네임을 검색해주세요"
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        handleChange={handleChange}
      />
      <VStack mt={4} space={4}>
        {DUMMY_DATA.map((v) => (
          <Pressable key={v.name}>
            <Heading flex={1} fontSize="md" color="black">
              {v.name}
            </Heading>
          </Pressable>
        ))}
      </VStack>
    </Layout>
  );
};

export default SearchProfileScreen;
