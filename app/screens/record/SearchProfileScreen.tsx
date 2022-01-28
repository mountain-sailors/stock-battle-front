import React, { useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Heading, Pressable, VStack } from 'native-base';

import { Layout, SearchInput } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';

import { useGetRequest } from '../../config/api';

type SearchProfileScreenProp = StackScreenProps<
  RootStackParams,
  'SearchProfile'
>;
const SearchProfileScreen: React.FC<SearchProfileScreenProp> = ({
  navigation,
}) => {
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const handleChange = (event: any) => setSearchKeyword(event.nativeEvent.text);
  const userList = useGetRequest(`/user/search?username=${searchKeyword}`).data;

  useEffect(() => {}, [userList, searchKeyword]);

  return (
    <Layout>
      <SearchInput
        placeholder="닉네임을 검색해주세요"
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        handleChange={handleChange}
      />
      <VStack mt={4} space={4}>
        {userList &&
          userList
            .filter((v: { username: string }) =>
              v.username.toLowerCase().includes(searchKeyword.toLowerCase()),
            )
            .map((v) => (
              <Pressable
                key={v.username}
                onPress={() =>
                  navigation.navigate('Record', {
                    user: v,
                  })
                }
              >
                <Heading flex={1} fontSize="md" color="black">
                  {v.username}
                </Heading>
              </Pressable>
            ))}
      </VStack>
    </Layout>
  );
};

export default SearchProfileScreen;
