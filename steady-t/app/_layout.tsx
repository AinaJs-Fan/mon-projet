import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { initI18n } from '../src/i18n';
import { ThemeProvider } from '../src/theme';

export default function RootLayout() {
  const scheme = useColorScheme();

  useEffect(() => {
    initI18n();
  }, []);

  return (
    <ThemeProvider>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}