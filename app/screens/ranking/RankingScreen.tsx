import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Image,
  Spacer,
  ZStack,
  ScrollView,
} from 'native-base';
import { Layout } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';

// TODO : Loading 처리 == Skeleton
// TODO : UserInfo 상태 모델 ({NickName:string, Average:string? number?})
// TODO : 각각의 카드 정보 상태 모델

type MainSceenProp = StackScreenProps<RootStackParams, 'Main'>;
const MainScreen: React.FC<MainSceenProp> = () => {
  return (
    <ScrollView>
      <Layout>
        <VStack mb="40px">
          <Flex direction="column" justify="space-between" mt="4">
            <Box>
              <Text fontSize="3xl" fontWeight="bold">
                다현님의
              </Text>
              <Text fontSize="3xl" fontWeight="bold">
                배틀 현황입니다
              </Text>
            </Box>
            <Box>
              <HStack space={1}>
                <Text fontSize="2xl">평균 등수</Text>
                <Text fontSize="2xl" fontWeight="bold" color="#8B74FF">
                  4.5위
                </Text>
              </HStack>
            </Box>
          </Flex>
        </VStack>
        <Spacer />
        {/* TOPOF BOX 1 */}
        {/* TOPOF BOX 1 */}
        {/* TOPOF BOX 1 */}
        {/* TOPOF BOX 1 */}
        <Box pb="20px">
          <VStack space="3">
            <Box h="140" w="100%" bg="#F2F2F2" rounded="md" shadow={2} p="3.5">
              <Box h="58%">
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
                  <ZStack mt="1" ml={0} w="100%">
                    <Box h="0.5" w="100%" bg="#fff" rounded="md"></Box>
                  </ZStack>
                </Flex>
              </Box>
              <Spacer />
              <HStack mt="1">
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
                    <Flex
                      direction="column"
                      justify="flex-end"
                      align="flex-end"
                    >
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
            <Box h="140" w="100%" bg="#F2F2F2" rounded="md" shadow={2} p="3.5">
              <Box h="58%">
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
                  <ZStack mt="1" ml={0} w="100%">
                    <Box h="0.5" w="100%" bg="#fff" rounded="md"></Box>
                  </ZStack>
                </Flex>
              </Box>
              <Spacer />
              <HStack mt="1">
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
                    <Flex
                      direction="column"
                      justify="flex-end"
                      align="flex-end"
                    >
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
            <Box h="140" w="100%" bg="#F2F2F2" rounded="md" shadow={2} p="3.5">
              <Box h="58%">
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
                  <ZStack mt="1" ml={0} w="100%">
                    <Box h="0.5" w="100%" bg="#fff" rounded="md"></Box>
                  </ZStack>
                </Flex>
              </Box>
              <Spacer />
              <HStack mt="1">
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
                    <Flex
                      direction="column"
                      justify="flex-end"
                      align="flex-end"
                    >
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
            {/* TOPOF BOX 2 */}
            {/* TOPOF BOX 2 */}
            {/* TOPOF BOX 2 */}
            {/* TOPOF BOX 2 */}
            <Box
              h="140"
              w="100%"
              bg="#F2F2F2"
              rounded="md"
              shadow={2}
              p="3.5"
              borderWidth="2"
              borderColor="#6CE99E"
            >
              <Box h="60%">
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
                  <ZStack mt="1" ml={0} w="100%">
                    <Box h="0.5" w="100%" bg="#fff" rounded="md"></Box>
                    <Box h="0.5" w="50%" bg="#6CE99E" rounded="md"></Box>
                  </ZStack>
                </Flex>
              </Box>
              <Spacer />
              <HStack>
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
                    <Flex
                      direction="column"
                      justify="flex-end"
                      align="flex-end"
                    >
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
            {/* TOPOF BOX 3 */}
            {/* TOPOF BOX 3 */}
            {/* TOPOF BOX 3 */}
            {/* TOPOF BOX 3 */}
            <Box h="140" w="100%" bg="#F2F2F2" rounded="md" shadow={2} p="3.5">
              <Box h="60%">
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
                  <ZStack mt="1" ml={0} w="100%">
                    <Box h="0.5" w="100%" bg="#fff" rounded="md"></Box>
                    <Box h="0.5" w="100%" bg="#6CE99E" rounded="md"></Box>
                  </ZStack>
                </Flex>
              </Box>
              <Spacer />
              <HStack>
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
                    <Flex
                      direction="column"
                      justify="flex-end"
                      align="flex-end"
                    >
                      <Text fontSize="sm">수익률</Text>
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
    </ScrollView>
  );
};

export default MainScreen;
