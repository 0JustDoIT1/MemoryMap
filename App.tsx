import Navigation from 'navigation';
import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {RecoilRoot} from 'recoil';
import {PaperTheme} from 'src/style/paperTheme';

const App = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  // const backgroundStyle = 'bg-neutral-300 dark:bg-slate-900';

  return (
    <SafeAreaProvider>
      <PaperProvider theme={PaperTheme}>
        <RecoilRoot>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <GestureHandlerRootView style={{flex: 1}}>
            <Navigation />
            <Toast />
          </GestureHandlerRootView>
        </RecoilRoot>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
