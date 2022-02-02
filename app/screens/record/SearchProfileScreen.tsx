import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Heading, Pressable, VStack } from 'native-base';

import { Layout, SearchInput } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';

import { useGetRequest } from '../../config/api';
import { GetUserSearchRes, SearchUser } from '../../config/types';

type SearchProfileScreenProp = StackScreenProps<
  RootStackParams,
  'SearchProfile'
>;
const SearchProfileScreen: React.FC<SearchProfileScreenProp> = ({
  navigation,
  route,
}) => {
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const userList: GetUserSearchRes = useGetRequest(
    `/user/search?username=${searchKeyword}`,
  ).data;

  const handleChange = (event: any) => {
    setSearchKeyword(event.nativeEvent.text);
  };
  const handlePress = (user: SearchUser) => {
    navigation.goBack();
    route.params.handleUserChange(user);
  };
  return (
    <Layout>
      <SearchInput
        placeholder="닉네임을 검색해주세요"
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        handleChange={handleChange}
      />
      <VStack mt={4} space={4}>
        {searchKeyword == '' || typeof userList == 'undefined'
          ? null
          : userList.map((v) => (
              <Pressable key={v.username} onPress={() => handlePress(v)}>
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
