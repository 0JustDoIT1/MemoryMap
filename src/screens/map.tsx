import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import KoreaMapSvg from 'src/components/koreaMapSvg';
import {MapProps} from 'src/types/stack';

const MapScreen = ({navigation}: MapProps) => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center w-screen h-screen bg-white dark:bg-black">
      <KoreaMapSvg />
    </SafeAreaView>
  );
};

export default MapScreen;
