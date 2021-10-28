import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Box, Flex, Text, VStack, HStack, Image, Spacer } from 'native-base';
import { Layout } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';
import { Progress } from 'native-base';

// TODO : Loading 처리 == Skeleton
// TODO : UserInfo 상태 모델 ({NickName:string, Average:string? number?})
// TODO : 각각의 카드 정보 상태 모델

type MainSceenProp = StackScreenProps<RootStackParams, 'Main'>;
const MainScreen: React.FC<MainSceenProp> = () => {
  return (
    <Layout color="gray.100">
      <VStack mb="19px">
        <Box mx={-6} mt={-6} px={6} pb={6} bgColor="white">
          <Flex direction="column" justify="space-between" mt={10} mb={6}>
            <Flex direction="row">
              <Text fontSize="3xl" fontWeight="bold">
                {`다현님의\n배틀 현황입니다`}
              </Text>
              <Image
                mt="7"
                ml="2"
                size="40px"
                source={require('./horse.png')}
                alt="icon"
              />
            </Flex>
            <Text mt={2} fontSize="xl">
              평균 등수
              <Text fontSize="xl" fontWeight="bold" color="#8B74FF">
                &nbsp;4.5위
              </Text>
            </Text>
          </Flex>
        </Box>
      </VStack>
      <Spacer />
      <Box pb="20px">
        <VStack space="3">
          {/* BOX 1 */}
          <Box h="140" w="100%" bg="#fff" rounded="md" px="4" pt="3" pb="4">
            <Box h="55%" mt="0">
              <Box w="63px" h="24px" bg="#000" rounded="3">
                <Flex
                  h="100%"
                  direction="column"
                  align="center"
                  justify="center"
                >
                  <Text fontWeight="bold" color="#fff">
                    준비중
                  </Text>
                </Flex>
              </Box>
              <Box
                ml="3%"
                style={{
                  width: 0,
                  height: 0,
                  backgroundColor: 'transparent',
                  borderStyle: 'solid',
                  borderLeftWidth: 5,
                  borderRightWidth: 5,
                  borderBottomWidth: 6,
                  borderLeftColor: 'transparent',
                  borderRightColor: 'transparent',
                  borderBottomColor: '#000',
                  transform: [{ rotate: '180deg' }],
                }}
              ></Box>
              <Image
                ml="0%"
                size="27px"
                source={require('./horse.png')}
                alt="icon"
              />
              <Flex direction="column" justify="flex-end" align="flex-end">
                <Box w="100%" mt="1">
                  <Progress
                    h="0.5"
                    value={0}
                    bgColor="gray.100"
                    _filledTrack={{ bgColor: 'primary.400', rounded: 'lg' }}
                  />
                </Box>
              </Flex>
            </Box>
            <Spacer />
            <HStack mt="3">
              <Flex direction="row" justify="space-between">
                <Box w="50%">
                  <Text fontSize="xl" fontWeight="bold">
                    주식 무스메
                  </Text>
                  <Text fontSize="md" color="#828282">
                    3일 뒤 시작
                  </Text>
                </Box>
                <Spacer />
                <Box w="50%">
                  <Flex direction="column" justify="flex-end" align="flex-end">
                    <Text fontSize="sm">수익률</Text>
                    <Text fontSize="2xl" color="#000" fontWeight="bold">
                      0.0%
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            </HStack>
            <Spacer />
          </Box>
          {/* BOX 2 */}
          <Box
            h="140"
            w="100%"
            bg="#fff"
            rounded="md"
            px="4"
            pt="3"
            pb="4"
            borderWidth="2"
            borderColor="#6CE99E"
          >
            <Box h="55%">
              <Box ml="40%" w="63px" h="24px" bg="#000" rounded="3">
                <Flex
                  h="100%"
                  direction="column"
                  align="center"
                  justify="center"
                >
                  <Text fontWeight="bold" color="#fff">
                    현재 4위
                  </Text>
                </Flex>
              </Box>
              <Box
                ml="48%"
                style={{
                  width: 0,
                  height: 0,
                  backgroundColor: 'transparent',
                  borderStyle: 'solid',
                  borderLeftWidth: 5,
                  borderRightWidth: 5,
                  borderBottomWidth: 6,
                  borderLeftColor: 'transparent',
                  borderRightColor: 'transparent',
                  borderBottomColor: '#000',
                  transform: [{ rotate: '180deg' }],
                }}
              ></Box>
              <Image
                ml="45%"
                size="27px"
                source={require('./horse.png')}
                alt="icon"
              />
              <Flex direction="column" justify="flex-end" align="flex-end">
                <Box w="100%" mt="1">
                  <Progress
                    h="0.5"
                    value={55}
                    bgColor="gray.100"
                    _filledTrack={{ bgColor: 'primary.400', rounded: 'lg' }}
                  />
                </Box>
              </Flex>
            </Box>
            <Spacer />
            <HStack mt="3">
              <Flex direction="row" justify="space-between">
                <Box w="50%">
                  <Text fontSize="xl" fontWeight="bold">
                    주식 무스메
                  </Text>
                  <Text fontSize="md" color="#828282">
                    3일 뒤 종료
                  </Text>
                </Box>
                <Spacer />
                <Box w="50%">
                  <Flex direction="column" justify="flex-end" align="flex-end">
                    <Text fontSize="sm">수익률</Text>
                    <Text fontSize="2xl" color="#EB5757" fontWeight="bold">
                      +24.2%
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            </HStack>
            <Spacer />
          </Box>
          {/* BOX 3 */}
          <Box h="140" w="100%" bg="#fff" rounded="md" px="4" pt="3" pb="4">
            <Box h="55%">
              <Box ml="80%" w="63px" h="24px" bg="#000" rounded="3">
                <Flex
                  h="100%"
                  direction="column"
                  align="center"
                  justify="center"
                >
                  <Text fontWeight="bold" color="#fff">
                    최종 3위
                  </Text>
                </Flex>
              </Box>
              <Box
                ml="94%"
                style={{
                  width: 0,
                  height: 0,
                  backgroundColor: 'transparent',
                  borderStyle: 'solid',
                  borderLeftWidth: 5,
                  borderRightWidth: 5,
                  borderBottomWidth: 6,
                  borderLeftColor: 'transparent',
                  borderRightColor: 'transparent',
                  borderBottomColor: '#000',
                  transform: [{ rotate: '180deg' }],
                }}
              ></Box>
              <Image
                ml="90%"
                size="27px"
                source={require('./horse.png')}
                alt="icon"
              />
              <Flex direction="column" justify="flex-end" align="flex-end">
                <Box w="100%" mt="1">
                  <Progress
                    h="0.5"
                    value={100}
                    bgColor="gray.100"
                    _filledTrack={{ bgColor: 'primary.400', rounded: 'lg' }}
                  />
                </Box>
              </Flex>
            </Box>
            <Spacer />
            <HStack mt="3">
              <Flex direction="row" justify="space-between">
                <Box w="50%">
                  <Text fontSize="xl" fontWeight="bold">
                    주식 무스메
                  </Text>
                  <Text fontSize="md" color="#828282">
                    2021. 08. 21. 종료
                  </Text>
                </Box>
                <Spacer />
                <Box w="50%">
                  <Flex direction="column" justify="flex-end" align="flex-end">
                    <Text fontSize="sm">수익</Text>
                    <Text fontSize="2xl" color="#2F80ED" fontWeight="bold">
                      -30.2%
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            </HStack>
            <Spacer />
          </Box>
        </VStack>
      </Box>
    </Layout>
  );
};

export default MainScreen;
