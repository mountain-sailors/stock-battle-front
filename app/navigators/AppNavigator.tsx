import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  MainScreen,
  AddRoomTitleScreen,
  AddRoomInfoScreen,
  CompleteCreateRoom,
  InitScreen,
  LoginScreen,
  SignupScreen,
  ResultRoomScreen,
  WaitingRoomScreen,
  RegisterStockScreen,
  RunningRoomScreen,
  SearchStockScreen,
  RecordScreen,
  SearchProfileScreen,
  MypageScreen,
} from '../screens';
import { RootStackParams } from './RootStackParams';
import MainNavigator from './MainNavigator';

const AppStack = createNativeStackNavigator<RootStackParams>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator initialRouteName="Init">
        <AppStack.Screen
          name="Main"
          component={MainNavigator}
          options={{ headerShown: false }}
        />
        <AppStack.Screen name="Home" component={MainScreen} />
        <AppStack.Screen name="Record" component={RecordScreen} />
        <AppStack.Screen
          name="SearchProfile"
          component={SearchProfileScreen}
          options={{ headerTitle: '유저 검색하기', headerTintColor: 'black' }}
        />
        <AppStack.Screen
          name="Init"
          component={InitScreen}
          options={{ headerShown: false }}
        />
        <AppStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerTitle: '로그인', headerTintColor: 'black' }}
        />
        <AppStack.Screen
          name="SignUp"
          component={SignupScreen}
          options={{ headerTitle: '회원가입', headerTintColor: 'black' }}
        />
        <AppStack.Screen
          name="AddRoomTitle"
          component={AddRoomTitleScreen}
          options={{ headerTitle: '방 생성하기', headerTintColor: 'black' }}
        />
        <AppStack.Screen
          name="AddRoomInfo"
          component={AddRoomInfoScreen}
          options={{ headerTitle: '방 생성하기', headerTintColor: 'black' }}
        />
        <AppStack.Screen
          name="CompleteRoom"
          component={CompleteCreateRoom}
          options={{ headerTitle: '생성 완료', headerTintColor: 'black' }}
        />
        <AppStack.Screen
          name="WaitingRoom"
          component={WaitingRoomScreen}
          options={{ headerTitle: '대기중', headerTintColor: 'black' }}
        />
        <AppStack.Screen
          name="RunningRoom"
          component={RunningRoomScreen}
          options={{ headerTitle: '경기중', headerTintColor: 'black' }}
        />
        <AppStack.Screen
          name="ResultRoom"
          component={ResultRoomScreen}
          options={{ headerTitle: '경기 결과', headerTintColor: 'black' }}
        />
        <AppStack.Screen
          name="RegisterStock"
          component={RegisterStockScreen}
          options={{
            headerTitle: '주식 등록하기',
            headerTintColor: 'black',
          }}
        />
        <AppStack.Screen
          name="SearchStock"
          component={SearchStockScreen}
          options={{
            headerTitle: '주식 검색하기',
            headerTintColor: 'black',
            animation: 'slide_from_bottom',
          }}
        />
        <AppStack.Screen
          name="Mypage"
          component={MypageScreen}
          options={{
            headerTitle: '마이페이지',
          }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
