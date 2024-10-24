import React from 'react';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SettingProps} from 'src/types/stack';

const SettingScreen = ({navigation}: SettingProps) => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center w-screen h-screen bg-white dark:bg-black">
      <Text>세팅</Text>
    </SafeAreaView>
  );
};

export default SettingScreen;
