import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRecoilValue} from 'recoil';
import KoreaMapSvg from 'src/components/koreaMapSvg';
import {appUserState} from 'src/recoil/atom';
import {MapProps} from 'src/types/stack';

const MapScreen = ({navigation}: MapProps) => {
  const appUser = useRecoilValue(appUserState);
  console.log('앱', appUser);
  return (
    <SafeAreaView className="flex-1 justify-center items-center w-screen h-screen bg-white dark:bg-black">
      <KoreaMapSvg />
    </SafeAreaView>
  );
};

export default MapScreen;
