import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  MainScreen,
  AddRoomTitleScreen,
  AddRoomInfoScreen,
  CompleteCreateRoom,
  ResultRoomScreen,
  WaitingRoomScreen,
  RegisterStockScreen,
  RunningRoomScreen,
  SearchStockScreen,
} from '../screens';
import { RootStackParams } from './RootStackParams';
import MainNavigator from './MainNavigator';

const AppStack = createNativeStackNavigator<RootStackParams>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator initialRouteName="Main">
        <AppStack.Screen name="Main" component={MainNavigator} />
        <AppStack.Screen name="Sample" component={MainScreen} />
        <AppStack.Screen
          name="AddRoomTitle"
          component={AddRoomTitleScreen}
          options={{ headerTitle: '방 생성하기' }}
        />
        <AppStack.Screen
          name="AddRoomInfo"
          component={AddRoomInfoScreen}
          options={{ headerTitle: '방 생성하기' }}
        />
        <AppStack.Screen
          name="CompleteRoom"
          component={CompleteCreateRoom}
          options={{ headerTitle: '생성 완료' }}
        />
        <AppStack.Screen
          name="WaitingRoom"
          component={WaitingRoomScreen}
          options={{ headerTitle: '대기중' }}
        />
        <AppStack.Screen
          name="RunningRoom"
          component={RunningRoomScreen}
          options={{ headerTitle: '경기중' }}
        />
        <AppStack.Screen
          name="ResultRoom"
          component={ResultRoomScreen}
          options={{ headerTitle: '경기 결과' }}
        />
        <AppStack.Screen
          name="RegisterStock"
          component={RegisterStockScreen}
          options={{
            headerTitle: '주식 등록하기',
          }}
        />
        <AppStack.Screen
          name="SearchStock"
          component={SearchStockScreen}
          options={{
            headerTitle: '주식 검색하기',
            animation: 'slide_from_bottom',
          }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
