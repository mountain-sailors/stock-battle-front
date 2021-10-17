import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import AppNavigator from './app/navigators/AppNavigator';
import theme from './app/config/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppNavigator />
    </ThemeProvider>
  );
}
