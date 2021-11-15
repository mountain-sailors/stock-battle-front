import React from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { Flex, Input, Icon, IconButton } from 'native-base';

type SearchInputProp = {
  placeholder: string;
  searchKeyword: string;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  handleChange: (event: any) => void;
};
const SearchInput: React.FC<SearchInputProp> = ({
  placeholder,
  searchKeyword,
  setSearchKeyword,
  handleChange,
}) => {
  return (
    <Flex
      mt={2}
      flexDirection="row"
      align="center"
      p={1}
      px={2}
      bgColor="gray.100"
      rounded="lg"
    >
      <Input
        variant="unstyled"
        fontSize="md"
        value={searchKeyword}
        onChange={handleChange}
        placeholder={placeholder}
        InputLeftElement={
          <Icon
            as={<AntDesignIcon name="search1" />}
            ml={2}
            size={5}
            color="gray.400"
          />
        }
        InputRightElement={
          searchKeyword !== '' ? (
            <IconButton
              variant="unstyled"
              size={6}
              color="black"
              _icon={{
                as: AntDesignIcon,
                name: 'close',
                size: 5,
              }}
              onPress={() => setSearchKeyword('')}
            />
          ) : undefined
        }
      />
    </Flex>
  );
};

export default SearchInput;
