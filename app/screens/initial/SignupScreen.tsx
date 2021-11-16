import React from 'react';
import {
  Button,
  Input,
  Box,
  Text,
  Image,
  Flex,
  Spacer,
  Circle,
  ZStack,
} from 'native-base';
import { Layout } from '../../components';

const SignupScreen: React.FC = () => {
  const [value, setValue] = React.useState('');
  return (
    <Layout>
      <Box>
        <Box mb="5">
          <Text fontSize="xs" fontWeight="bold" mb="4">
            아이디
          </Text>
          <Input
            value={value}
            variant="filled"
            placeholder="이메일을 입력해주세요"
            onChange={(event: any) => setValue(event.target.value)}
          />
        </Box>
        <Box mb="5">
          <Text fontSize="xs" fontWeight="bold" mb="4">
            비밀번호
          </Text>
          <Input
            value={value}
            variant="filled"
            placeholder="비밀번호를 입력해주세요"
            onChange={(event: any) => setValue(event.target.value)}
          />
        </Box>
        <Box mb="5">
          <Text fontSize="xs" fontWeight="bold" mb="4">
            닉네임
          </Text>
          <Input
            value={value}
            variant="filled"
            placeholder="닉네임을 입력해주세요"
            onChange={(event: any) => setValue(event.target.value)}
          />
        </Box>
        <Box mb="5">
          <Text fontSize="xs" fontWeight="bold" mb="4">
            아바타
          </Text>
          <Flex direction="row">
            <Circle size="56px" bg="#54E68E" mr="5">
              <ZStack alignItems="center" justifyContent="center">
                <Circle size="52px" bg="#fff"></Circle>
                <Box>
                  <Image source={require('./images/avatar_1.png')} size={8} />
                </Box>
              </ZStack>
            </Circle>
            <Circle size="56px" bg="#fff" mr="5">
              <Box>
                <Image source={require('./images/avatar_2.png')} size={8} />
              </Box>
            </Circle>
            <Circle size="56px" bg="#fff" mr="5">
              <Box>
                <Image source={require('./images/avatar_3.png')} size={8} />
              </Box>
            </Circle>
            <Circle size="56px" bg="#fff" mr="5">
              <Box>
                <Image source={require('./images/avatar_4.png')} size={8} />
              </Box>
            </Circle>
          </Flex>
        </Box>
      </Box>
      <Spacer />
      <Box>
        <Button variant="solid">회원가입</Button>
      </Box>
    </Layout>
  );
};

export default SignupScreen;
