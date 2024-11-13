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
    brandLight: '#FF7C6C',
    brandMain: '#FF624F',
    brandDark: '#FF4832',
    brandBase: '#FF9A8E',
    brandAccent: '#FF290F',
    success: '#22bb33',
    error: '#ff0000',
    info: '#5bc0de',
    blur: '#9CA3AF',
    excite: '#41C450',
    happy: '#9ACD32',
    neutral: '#41C4AE',
    sad: '#FF7224',
    dead: '#FF4343',
  },
};

export type AppTheme = typeof PaperTheme;

export const useAppTheme = () => useTheme<AppTheme>();
