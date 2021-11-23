import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { View } from 'react-native';
import {
  Box,
  Flex,
  Text,
  VStack,
  Image,
  Spacer,
  ZStack,
  Circle,
} from 'native-base';
import { Layout } from '../../components';
import { RootStackParams } from '../../navigators/RootStackParams';

type RecordScreenProp = StackScreenProps<RootStackParams, 'Record'>;
const RecordScreen: React.FC<RecordScreenProp> = () => {
  return (
    <Layout>
      <VStack m={0} mt={5}>
        <Box mx={-6} mt={-6} px={4} pb={5} bgColor="white">
          <Box w="100%" bg="#1A1B22" rounded="lg" p="8">
            <Flex
              direction="column"
              justify="space-between"
              mt={1}
              mb={1}
              w="100%"
            >
              <Flex direction="row" justify="space-between" w="100%">
                <Box w="30%">
                  <ZStack
                    alignItems="center"
                    justifyContent="center"
                    mr={5}
                    mt={8}
                  >
                    <View
                      style={{
                        width: 75,
                        height: 75,
                        overflow: 'hidden',
                        borderRadius: 37.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: [{ rotate: '180deg' }],
                      }}
                    >
                      <View
                        style={{
                          width: 75,
                          height: 75,
                          borderRadius: 37.5,
                          backgroundColor: '#1A1B22',
                          zIndex: 0,
                        }}
                      />
                      <View
                        style={{
                          width: 37.5,
                          height: 75,
                          backgroundColor: '#54E68E',
                          borderRadius: 37.5,
                          borderTopRightRadius: 0,
                          borderBottomRightRadius: 0,
                          transform: [{ rotate: '0deg' }],
                          position: 'absolute',
                          zIndex: 1,
                          alignSelf: 'flex-start',
                        }}
                      />
                      <View
                        style={{
                          width: 65,
                          height: 65,
                          backgroundColor: '#1A1B22',
                          borderRadius: 32.5,
                          position: 'absolute',
                          zIndex: 2,
                        }}
                      />
                    </View>
                    <Circle size="60px" bg="#1A1B22"></Circle>
                    <Circle size="55px" bg="#fff"></Circle>
                    <Box>
                      <Image
                        source={require('./images/avatar.png')}
                        size={10}
                        alt="avatar"
                      />
                    </Box>
                  </ZStack>
                </Box>
                <Flex direction="column" w="70%">
                  <Flex direction="row">
                    <Text color="white">승률</Text>{' '}
                    <Text color="#54E68E">50%</Text>
                  </Flex>
                  <Text fontSize="2xl" color="white" fontWeight="bold">
                    박주마
                  </Text>
                  <Text color="#828282">juma12345</Text>
                </Flex>
              </Flex>
              <Flex direction="row" justify="space-between" mt={5}>
                <Box w="33.3%">
                  <Flex direction="column" justify="center" align="center">
                    <Text fontSize="2xl" color="white" fontWeight="bold">
                      12
                    </Text>
                    <Text fontSize="sm" color="white">
                      참여 게임수
                    </Text>
                  </Flex>
                </Box>
                <Box w="33.3%">
                  <Flex direction="column" justify="center" align="center">
                    <Text fontSize="2xl" color="white" fontWeight="bold">
                      4.5
                    </Text>
                    <Text fontSize="sm" color="white">
                      평균 등수
                    </Text>
                  </Flex>
                </Box>
                <Box w="33.3%">
                  <Flex direction="column" justify="center" align="center">
                    <Text fontSize="2xl" color="white" fontWeight="bold">
                      3
                    </Text>
                    <Text fontSize="sm" color="white">
                      1등 횟수
                    </Text>
                  </Flex>
                </Box>
              </Flex>
              <Spacer />
            </Flex>
          </Box>
        </Box>
      </VStack>
      <Spacer />

      <Box pb={3} pt={3}>
        <VStack space="3">
          <Text fontSize="xl" fontWeight="bold">
            히스토리
          </Text>
          <Box
            w="100%"
            bg="#fff"
            pt="4"
            pb="1"
            borderTopWidth={1}
            borderTopColor="#E0E0E0"
          >
            <Flex direction="row" w="100%" h="24px" align="flex-end">
              <Box mr={2} w="40px" bg="#7B61FF" rounded="3">
                <Flex
                  h="100%"
                  direction="column"
                  align="center"
                  justify="center"
                >
                  <Text fontSize="xs" fontWeight="bold" color="#fff">
                    1위
                  </Text>
                </Flex>
              </Box>
              <Text
                mr={2}
                fontSize="xl"
                fontWeight="bold"
                color="black"
                alignSelf="flex-start"
                mt="-2px"
              >
                1위 치킨빵 🐤
              </Text>
              <Text fontSize="xs" color="#828282">
                2021.10.03 ~ 2021.10.16
              </Text>
            </Flex>
            <Spacer />
            <Flex direction="row" justify="space-between" mt={5}>
              <Box w="50%">
                <Text fontSize="md" color="#828282">
                  수익률
                </Text>
                <Text fontSize="md" color="#828282">
                  참여종목
                </Text>
                <Text fontSize="md" color="#828282">
                  참여인원
                </Text>
              </Box>
              <Spacer />
              <Box w="50%">
                <Flex direction="column" justify="flex-end" align="flex-end">
                  <Text fontSize="md">24.2%</Text>
                  <Text fontSize="md">APPL</Text>
                  <Text fontSize="md">박주마, 김주주, 정감자</Text>
                </Flex>
              </Box>
            </Flex>
            <Spacer />
          </Box>
          <Box
            w="100%"
            bg="#fff"
            pt="4"
            pb="1"
            borderTopWidth={1}
            borderTopColor="#E0E0E0"
          >
            <Flex direction="row" w="100%" h="24px" align="flex-end">
              <Box mr={2} w="40px" bg="#7B61FF" rounded="3" opacity={0.6}>
                <Flex
                  h="100%"
                  direction="column"
                  align="center"
                  justify="center"
                >
                  <Text fontSize="xs" fontWeight="bold" color="#fff">
                    2위
                  </Text>
                </Flex>
              </Box>
              <Text
                mr={2}
                fontSize="xl"
                fontWeight="bold"
                color="black"
                alignSelf="flex-start"
                mt="-2px"
              >
                담주 회식내기
              </Text>
              <Text fontSize="xs" color="#828282">
                2021.10.03 ~ 2021.10.16
              </Text>
            </Flex>
            <Spacer />
            <Flex direction="row" justify="space-between" mt={5}>
              <Box w="50%">
                <Text fontSize="md" color="#828282">
                  수익률
                </Text>
                <Text fontSize="md" color="#828282">
                  참여종목
                </Text>
                <Text fontSize="md" color="#828282">
                  참여인원
                </Text>
              </Box>
              <Spacer />
              <Box w="50%">
                <Flex direction="column" justify="flex-end" align="flex-end">
                  <Text fontSize="md">24.2%</Text>
                  <Text fontSize="md">APPL</Text>
                  <Text fontSize="md">박주마, 김주주, 정감자</Text>
                </Flex>
              </Box>
            </Flex>
            <Spacer />
          </Box>

          <Box
            w="100%"
            bg="#fff"
            pt="4"
            pb="1"
            borderTopWidth={1}
            borderTopColor="#E0E0E0"
          >
            <Flex direction="row" w="100%" h="24px" align="flex-end">
              <Box mr={2} w="40px" bg="#7B61FF" rounded="3" opacity={0.3}>
                <Flex
                  h="100%"
                  direction="column"
                  align="center"
                  justify="center"
                >
                  <Text fontSize="xs" fontWeight="bold" color="#fff">
                    3위
                  </Text>
                </Flex>
              </Box>
              <Text
                mr={2}
                fontSize="xl"
                fontWeight="bold"
                color="black"
                alignSelf="flex-start"
                mt="-2px"
              >
                주식 스터디방
              </Text>
              <Text fontSize="xs" color="#828282">
                2021.10.03 ~ 2021.10.16
              </Text>
            </Flex>
            <Spacer />
            <Flex direction="row" justify="space-between" mt={5}>
              <Box w="50%">
                <Text fontSize="md" color="#828282">
                  수익률
                </Text>
                <Text fontSize="md" color="#828282">
                  참여종목
                </Text>
                <Text fontSize="md" color="#828282">
                  참여인원
                </Text>
              </Box>
              <Spacer />
              <Box w="50%">
                <Flex direction="column" justify="flex-end" align="flex-end">
                  <Text fontSize="md">24.2%</Text>
                  <Text fontSize="md">APPL</Text>
                  <Text fontSize="md">박주마, 김주주, 정감자</Text>
                </Flex>
              </Box>
            </Flex>
            <Spacer />
          </Box>
        </VStack>
      </Box>
    </Layout>
  );
};

export default RecordScreen;
