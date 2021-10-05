import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import HomeScreen from './app/screens/HomeScreen';
import MypageScreen from './app/screens/MypageScreen';
import theme from './app/config/theme';

const Tab = createBottomTabNavigator();

const tabBarIconDomain = {
  '홈': 'home',
  '내 정보': 'user',
} as const;
type tabBarIcon = keyof typeof tabBarIconDomain;

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            return <AntDesignIcon
              name={tabBarIconDomain[route.name as tabBarIcon]}
              size={size}
              color={color}
            />;
          },
          tabBarActiveTintColor: theme.colors.black,
          tabBarInactiveTintColor: theme.colors.gray[400],
        })}
      >
        <Tab.Screen
          name="홈"
          component={HomeScreen}
        />
        <Tab.Screen
          name="내 정보"
          component={MypageScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
