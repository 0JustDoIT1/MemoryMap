import Navigation from 'navigation';
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const App = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  // const backgroundStyle = 'bg-neutral-300 dark:bg-slate-900';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Navigation />
    </SafeAreaProvider>
  );
};

export default App;
