import React from 'react';
import { LogBox, StatusBar } from 'react-native';
import { Box, NativeBaseProvider } from 'native-base';
import AppNavigator from './app/navigators/AppNavigator';
import theme from './app/config/theme';

export default function App() {
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NativeBaseProvider theme={theme}>
        <Box flex={1} safeArea>
          <AppNavigator />
        </Box>
      </NativeBaseProvider>
    </>
  );
}
