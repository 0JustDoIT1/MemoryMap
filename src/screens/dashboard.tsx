import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomProgressBar from 'src/components/progressBar';
import {koreaMapDataInit} from 'src/constants/koreaMapData';
import useKoreaMap from 'src/hook/useKoreaMap';
import useStory from 'src/hook/useStory';
import {useAppTheme} from 'src/style/paperTheme';
import {DashboardProps} from 'src/types/stack';

const DashboardScreen = ({navigation}: DashboardProps) => {
  const theme = useAppTheme();
  const koreaMapRegionCount = Object.values(koreaMapDataInit).length;

  const {koreaMapData, mostColoredRegion, regionCountNumber} = useKoreaMap();
  const {story} = useStory();

  const percent = (regionCountNumber / koreaMapRegionCount) * 100;

  mostColoredRegion();

  return (
    <SafeAreaView className="flex-1 justify-start items-center w-screen h-screen bg-white p-6">
      <View className="flex justify-start items-start w-full p-4 rounded-lg bg-brandLight shadow-md shadow-black">
        <Text className="text-white">다녀온 지역</Text>
        <View className="flex-row items-end mt-2">
          <Text className="text-5xl text-white">{regionCountNumber}</Text>
          <Text className="text-white"> / {koreaMapRegionCount}</Text>
        </View>
        <View className="mt-6 w-full">
          <CustomProgressBar
            navigation={navigation}
            percent={percent}
            percentView={true}
            color={theme.colors.brandMain}
            bgColor={theme.colors.white}
            textColor={theme.colors.white}
          />
        </View>
      </View>
      <View className="flex justify-start items-start w-full p-4 mt-2 rounded-lg bg-white shadow-md shadow-black">
        <Text className="text-brandMain">가장 많이 색칠한 지역</Text>
        <View className="flex-row items-end mt-2">
          <Text className="text-5xl text-brandMain">{regionCountNumber}</Text>
          <Text className="text-brandMain"> / {koreaMapRegionCount}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;
