import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Button, Input, Text, useToast } from 'native-base';
import { Layout } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';
import { callAPI } from '../../config/api';

type AddRoomCodeScreenProp = StackScreenProps<RootStackParams>;
const AddRoomCodeScreen: React.FC<AddRoomCodeScreenProp> = ({ navigation }) => {
  const toast = useToast();
  const [value, setValue] = React.useState('');
  const handleChange = (text: any) => setValue(text);

  const enterRoomCode = (code: any) => {
    callAPI('/room', 'POST', code)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        navigation.navigate('Main');
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  };

  return (
    <Layout>
      <Box mt="32" mb="10">
        <Text fontSize="md" fontWeight="bold">
          코드 입력
        </Text>
        <Input
          mt="3"
          variant="filled"
          value={value}
          placeholder="코드를 입력해주세요"
          onChangeText={handleChange}
        />
      </Box>
      <Button
        variant="solid"
        onPress={() => {
          if (value === '') {
            toast.show({
              status: 'error',
              title: '입장 코드',
              description: '입장 코드를 입력해주세요.',
            });
          } else {
            enterRoomCode(value);
          }
        }}
      >
        입력하기
      </Button>
    </Layout>
  );
};

export default AddRoomCodeScreen;
