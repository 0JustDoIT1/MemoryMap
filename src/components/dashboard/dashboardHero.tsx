// components/dashboard/dashboardHero.tsx
import React from 'react';
import {Image, View} from 'react-native';
import {Text} from 'react-native-paper';
import CustomProgressBar from 'src/components/common/progressBar';
import {customColor} from 'src/style/customColor';
import DashboardSummary from './dashboardSummary';

interface IDashboardHero {
  visitedTotal: number;
  totalRegions: number;
  percent: number;
  photo: number;
  color: number;
  storyCount: number;
  navigation: any;
}

const DashboardHero = ({
  visitedTotal,
  totalRegions,
  percent,
  photo,
  color,
  storyCount,
  navigation,
}: IDashboardHero) => {
  return (
    <View className="relative w-full h-2/5 flex justify-between items-start px-8 bg-brandLight shadow-md shadow-black">
      <View className="w-full h-full flex justify-center">
        <View className="my-2">
          <Text className="text-lg text-white">추억을 확인해보세요.</Text>
        </View>
        <View className="w-full flex-row justify-between items-center">
          <View className="w-1/2">
            <View className="w-full flex-row justify-between items-center my-3">
              <View className="flex-row items-end">
                <Text className="text-6xl text-white">
                  {visitedTotal.toLocaleString()}
                </Text>
                <Text className="text-xl text-white leading-8">
                  /&nbsp;{totalRegions}
                </Text>
              </View>
            </View>
          </View>
          <View className="w-1/2 flex items-end">
            <Image
              style={{width: 100, height: 100}}
              source={require('assets/images/map.png')}
            />
          </View>
        </View>
        <View className="w-full my-4">
          <CustomProgressBar
            navigation={navigation}
            percent={percent}
            percentView={true}
            color={customColor.brandMain}
            bgColor={customColor.white}
            textColor={customColor.white}
          />
        </View>

        <DashboardSummary photo={photo} color={color} story={storyCount} />
      </View>
    </View>
  );
};

export default React.memo(DashboardHero);
