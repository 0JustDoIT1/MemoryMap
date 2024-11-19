import {configureFonts, MD3LightTheme, useTheme} from 'react-native-paper';
import {customColor} from './customColor';

const fontConfig = {
  fontFamily: 'GmarketSansMedium',
};

export const PaperTheme = {
  ...MD3LightTheme,
  fonts: configureFonts({config: fontConfig}),
  custom: 'property',
  colors: {
    ...MD3LightTheme.colors,
    ...customColor,
  },
};

export type AppTheme = typeof PaperTheme;

export const useAppTheme = () => useTheme<AppTheme>();
