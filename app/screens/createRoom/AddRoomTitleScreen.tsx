import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Button, Input, Spacer, Text, useToast } from 'native-base';
import { Layout } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';

type AddRoomTitleScreenProp = StackScreenProps<RootStackParams>;
const AddRoomTitleScreen: React.FC<AddRoomTitleScreenProp> = ({
  navigation,
}) => {
  const toast = useToast();
  const [value, setValue] = React.useState('');
  const handleChange = (text: any) => setValue(text);
  return (
    <Layout>
      <Box mt="32">
        <Text fontSize="2xl" fontWeight="bold">
          {`3일 동안\n친구들과 함께\n내가 산 주식을 응원해 보세요!`}
        </Text>
        <Input
          mt="5"
          variant="filled"
          value={value}
          placeholder="방 제목을 입력해주세요"
          onChangeText={handleChange}
        />
        <Text fontSize="xs" color="gray.500" mt="2">
          예시) 다음주 회식 내기 주식으로 정하자!, 주식으로 고기 사먹자
        </Text>
      </Box>
      <Spacer />
      <Button
        variant="solid"
        onPress={() => {
          if (value === '') {
            toast.show({
              status: 'error',
              title: '방 제목',
              description: '방 제목을 입력해주세요.',
            });
          } else {
            navigation.navigate('AddRoomInfo', { roomName: value });
          }
        }}
      >
        다음
      </Button>
    </Layout>
  );
};

export default AddRoomTitleScreen;
