/* eslint-disable @typescript-eslint/dot-notation */
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigators/RootStackParams';
import {
  useToast,
  Spacer,
  Input,
  Text,
  VStack,
  FormControl,
  Box,
  Flex,
  Avatar,
} from 'native-base';
import { Button } from 'native-base';

import { callAPI } from '../../config/api';
import { Layout } from '../../components';

const IMAGE_URL = [
  require('../../../assets/images/character1.png'),
  require('../../../assets/images/character2.png'),
  require('../../../assets/images/character3.png'),
];

type FormData = {
  nickname: string;
  avatarId: number;
};
type Error = Partial<FormData>;

type ChangeProfileScreenProp = StackScreenProps<RootStackParams>;
const ChangeProfileScreen: React.FC<ChangeProfileScreenProp> = ({
  navigation,
}) => {
  const toast = useToast();
  const [formData, setFormData] = React.useState<FormData>({
    nickname: '',
    avatarId: 1,
  });
  const [errors, setErrors] = React.useState<Error>({});
  const validate = () => {
    if (formData.nickname === '') {
      setErrors({
        ...errors,
        nickname: '닉네임을 작성해주세요',
      });
      return false;
    } else {
      delete errors.nickname;
    }
    return true;
  };

  const registerUser = () => {
    const isValidate = validate();
    if (isValidate === false) return;
    callAPI('/user/username', 'POST', {
      username: formData.nickname,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.isNameExist) {
          toast.show({
            status: 'error',
            title: '닉네임 중복',
            description: '중복된 닉네임이 존재합니다.',
          });
          return;
        } else {
          callAPI('/user', 'PUT', {
            username: formData.nickname,
            avatar: formData.avatarId.toString(),
          })
            .then(() => {
              toast.show({
                status: 'success',
                title: '프로필 수정 성공',
                description: '프로필 수정이 성공적으로 완료되었습니다.',
              });
              navigation.reset({ routes: [{ name: 'Mypage' }] });
            })
            .catch((err) => {
              console.error(err);
              toast.show({
                status: 'error',
                title: '프로필 수정 실패',
                description: '프로필 수정 도중 문제가 발생했습니다.',
              });
            });
        }
      })
      .catch((err) => {
        console.error(err);
        toast.show({
          status: 'error',
          title: '프로필 수정 실패',
          description: '프로필 수정 도중 문제가 발생했습니다.',
        });
      });
  };

  return (
    <Layout>
      <VStack space={5}>
        <FormControl isRequired isInvalid={'nickname' in errors}>
          <FormControl.Label
            mb="4"
            _text={{ fontSize: 'md', fontWeight: 'bold' }}
          >
            닉네임
          </FormControl.Label>
          <Input
            value={formData.nickname}
            variant="filled"
            placeholder="닉네임을 10자 이내로 입력해주세요"
            maxLength={10}
            onChangeText={(value: string) =>
              setFormData({ ...formData, nickname: value })
            }
          />
          {'nickname' in errors && (
            <FormControl.ErrorMessage
              _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}
            >
              {errors['nickname']}
            </FormControl.ErrorMessage>
          )}
        </FormControl>
        <Box>
          <Text fontSize="md" fontWeight="bold" mb="4">
            아바타
          </Text>
          <Flex direction="row" justify="space-around" alignItems="center">
            {IMAGE_URL.map((v, i) => (
              <Avatar
                key={v}
                size={formData.avatarId === i + 1 ? '66px' : '58px'}
                padding={1}
                margin={formData.avatarId === i + 1 ? undefined : '4px'}
                bg="white"
                borderWidth={formData.avatarId === i + 1 ? '4px' : undefined}
                borderColor="primary.400"
                source={v}
                onTouchStart={() =>
                  setFormData({ ...formData, avatarId: i + 1 })
                }
              >
                {v}
              </Avatar>
            ))}
          </Flex>
        </Box>
      </VStack>
      <Spacer />
      <Box>
        <Button variant="solid" onPress={registerUser}>
          프로필 수정
        </Button>
      </Box>
    </Layout>
  );
};

export default ChangeProfileScreen;
