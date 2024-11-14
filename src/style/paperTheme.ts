import {configureFonts, MD3LightTheme, useTheme} from 'react-native-paper';

const fontConfig = {
  fontFamily: 'GmarketSansMedium',
};

export const PaperTheme = {
  ...MD3LightTheme,
  fonts: configureFonts({config: fontConfig}),
  custom: 'property',
  colors: {
    ...MD3LightTheme.colors,
    white: '#ffffff',
    black: '#000000',
    gray: '#6b7280',
    brandLight: '#FF7C6C',
    brandMain: '#FF624F',
    brandDark: '#FF4832',
    brandBase: '#FF9A8E',
    brandAccent: '#FF290F',
    success: '#22bb33',
    error: '#FF2424',
    info: '#5bc0de',
    blur: '#9CA3AF',
  },
};

export type AppTheme = typeof PaperTheme;

export const useAppTheme = () => useTheme<AppTheme>();
