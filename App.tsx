import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import Navigation from 'navigation';
import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {RecoilRoot} from 'recoil';
import {PaperTheme} from 'src/style/paperTheme';
import {toastConfig} from 'src/style/toast.config';
import SQLite from 'react-native-sqlite-storage';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import {createTable, getDBConnection} from 'src/database/sqlite';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useNetInfo} from '@react-native-community/netinfo';
import NoNetwork from 'src/screens/noNetwork';
import {appTableName} from 'src/constants/app';

dayjs.locale('ko');
// Enable the SQLite
SQLite.enablePromise(true);
// Access the Client
const queryClient = new QueryClient();

const App = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  // Create SQLite Table (If exists, no create)
  const createSqlTable = async () => {
    const db = await getDBConnection();
    await createTable(db, appTableName.map);
    await createTable(db, appTableName.story);
  };

  // Check Network
  const {isConnected} = useNetInfo();

  useEffect(() => {
    createSqlTable();
  }, []);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <PaperProvider theme={PaperTheme}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <GestureHandlerRootView style={{flex: 1}}>
              <BottomSheetModalProvider>
                {isConnected ? <Navigation /> : <NoNetwork />}
              </BottomSheetModalProvider>
              <Toast config={toastConfig} />
            </GestureHandlerRootView>
          </PaperProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
