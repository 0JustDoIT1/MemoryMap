import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import Navigation from 'navigation';
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {RecoilRoot} from 'recoil';
import {PaperTheme} from 'src/style/paperTheme';
import {toastConfig} from 'src/style/toast.config';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

const App = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <PaperProvider theme={PaperTheme}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <GestureHandlerRootView style={{flex: 1}}>
            <BottomSheetModalProvider>
              <Navigation />
            </BottomSheetModalProvider>
            <Toast config={toastConfig} />
          </GestureHandlerRootView>
        </PaperProvider>
      </SafeAreaProvider>
    </RecoilRoot>
  );
};

export default App;
