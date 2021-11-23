import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import theme from '../config/theme';
import {
  MypageScreen,
  MainScreen,
  AddRoomTitleScreen,
  RecordScreen,
} from '../screens';

import { MainBottomParams } from './MainBottomParams';

const Tab = createBottomTabNavigator<MainBottomParams>();

interface RouteInfo {
  name: keyof MainBottomParams;
  component: React.ComponentType<any>;
  title: string;
  icon: string;
}
const routes: RouteInfo[] = [
  { name: 'Home', component: MainScreen, title: '홈', icon: 'home' },
  {
    name: 'CreateRoom',
    component: AddRoomTitleScreen,
    title: '방 등록',
    icon: 'plussquareo',
  },
  {
    name: 'Record',
    component: RecordScreen,
    title: '전적',
    icon: 'barchart',
  },
  { name: 'Mypage', component: MypageScreen, title: '내 정보', icon: 'user' },
];

const MainNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          return (
            <AntDesignIcon
              name={routes.find((v) => v.name === route.name)?.icon ?? ''}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: theme.colors.gray[800],
        tabBarInactiveTintColor: theme.colors.gray[400],
      })}
    >
      {routes.map(({ name, component, title }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{ title: title, headerShown: false }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default MainNavigator;
