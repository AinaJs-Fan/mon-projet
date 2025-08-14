import React, { PropsWithChildren, useMemo } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import { ThemeProvider as RNThemeProvider } from '@react-navigation/native';

export type AppTheme = {
  colors: {
    background: string;
    card: string;
    text: string;
    mutedText: string;
    primary: string;
    accent: string;
    success: string;
    warning: string;
    danger: string;
    tile: string;
    border: string;
  };
  spacing: (multiplier?: number) => number;
  roundness: number;
  typography: {
    display: number;
    headline: number;
    title: number;
    body: number;
    caption: number;
  };
};

function createTheme(scheme: ColorSchemeName): AppTheme {
  const isDark = scheme === 'dark';
  return {
    colors: {
      background: isDark ? '#0f1115' : '#f7f7f8',
      card: isDark ? '#151821' : '#ffffff',
      text: isDark ? '#e8e9ec' : '#111318',
      mutedText: isDark ? '#a3a7b3' : '#61656f',
      primary: '#3a6c6e',
      accent: '#8aa29e',
      success: '#3da35d',
      warning: '#e3a017',
      danger: '#c55252',
      tile: isDark ? '#1b1f2a' : '#f0f1f3',
      border: isDark ? '#242938' : '#e3e5ea',
    },
    spacing: (m = 1) => 8 * m,
    roundness: 14,
    typography: {
      display: 34,
      headline: 28,
      title: 22,
      body: 16,
      caption: 13,
    },
  };
}

export const ThemeContext = React.createContext<AppTheme>(createTheme('light'));

export function ThemeProvider({ children }: PropsWithChildren) {
  const scheme = useColorScheme();
  const theme = useMemo(() => createTheme(scheme), [scheme]);
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return React.useContext(ThemeContext);
}