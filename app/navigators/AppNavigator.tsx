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
        <AppStack.Screen name="Init" component={InitScreen} />
        <AppStack.Screen name="Login" component={LoginScreen} />
        <AppStack.Screen name="SignUp" component={SignupScreen} />
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
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
