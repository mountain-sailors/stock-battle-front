import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Input, Spacer, Text } from "native-base"
import { Button, Layout } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';

type AddRoomTitleScreenProp = StackScreenProps<RootStackParams>;
const AddRoomTitleScreen: React.FC<AddRoomTitleScreenProp> = ({ navigation }) => {
  const [value, setValue] = React.useState('');
  const handleChange = (event: any) => setValue(event.target.value)
  return (
    <Layout>
      <Box mt="32">
        <Text fontSize="xl" fontWeight="bold">
          {`7일 동안\n친구들과 함께\n내가 산 주식을 응원해 보세요!`}
        </Text>
        <Input
          mt="5"
          p="3"
          size="lg"
          variant="filled"
          borderRadius="lg"
          bgColor="gray.100"
          value={value}
          placeholder="방 제목을 입력해주세요"
          onChange={handleChange}
        />
        <Text fontSize="xs" color="gray.500" mt="2">예시) 다음주 회식 내기 주식으로 정하자!, 주식으로 고기 사먹자</Text>
      </Box>
      <Spacer />
      <Button
        title="다음"
        variant="filled"
        onClick={() => {navigation.navigate('AddRoomInfo', { roomName: value })}}
      />
    </Layout>
  );
}

export default AddRoomTitleScreen;
