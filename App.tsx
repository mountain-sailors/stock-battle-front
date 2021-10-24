import React from 'react';
import { NativeBaseProvider } from 'native-base';
import AppNavigator from './app/navigators/AppNavigator';
import theme from './app/config/theme';

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <AppNavigator />
    </NativeBaseProvider>
  );
}
