import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import Navigation from 'navigation';
import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {PaperTheme} from 'src/style/paperTheme';
import {ToastConfig} from 'src/components/feedback/toast';
import SQLite from 'react-native-sqlite-storage';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import {createTable, getDBConnection} from 'src/database/sqlite';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useNetInfo} from '@react-native-community/netinfo';
import NoNetwork from 'src/components/states/noNetwork';
import {appTableName} from 'src/constants/db';

dayjs.locale('ko');
// Enable the SQLite
SQLite.enablePromise(true);
// Access the Client
const queryClient = new QueryClient();

const App = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  // Create SQLite Table (If exists, no create)
  const createSqlTable = async () => {
    try {
      const db = await getDBConnection();
      await createTable(db, appTableName.map);
      await createTable(db, appTableName.story);
    } catch (error) {
      console.error('SQLite table creation failed', error);
    }
  };

  // Check Network
  const {isConnected} = useNetInfo();

  useEffect(() => {
    createSqlTable();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <PaperProvider theme={PaperTheme}>
            <BottomSheetModalProvider>
              {isConnected ? <Navigation /> : <NoNetwork />}
              <Toast config={ToastConfig} />
              <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              />
            </BottomSheetModalProvider>
          </PaperProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
