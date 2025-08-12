import React from 'react';
import {Image, View} from 'react-native';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomProgressBar from 'src/components/common/progressBar';
import useDashboard from 'src/hook/useDashboard';
import useExitApp from 'src/hook/common/useExitApp';
import {customColor} from 'src/style/customColor';
import {TDashboard} from 'src/types/stack';
import LoadingScreen from './loadingScreen';
import DashboardCard from 'src/components/dashboard/dashboardCard';

const DashboardScreen = ({navigation}: TDashboard) => {
  const {
    koreaMapRegionCount,
    mapData,
    storyData,

    isLoadingAny,
    isErrorAny,
    percent,
    visitedTotal,

    mostCount,
    mostRegion,
    mostOthers,

    storyTopCount,
    storyTopRegion,
    storyTopOthers,

    pointTopAvg,
    pointTopRegion,
    pointTopOthers,
  } = useDashboard();
  useExitApp();

  if (isErrorAny) {
    return null;
  }

  if (isLoadingAny) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView
      className="flex-1 justify-center items-center bg-white"
      edges={['bottom', 'left', 'right']}>
      {mapData && storyData && (
        <>
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
                        {visitedTotal}
                      </Text>
                      <Text className="text-xl text-white leading-8">
                        /&nbsp;{koreaMapRegionCount}
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

              <View className="absolute bottom-[-32] w-full h-16 flex-row justify-center items-center bg-white rounded-lg shadow shadow-black">
                <View className="flex items-center mx-6">
                  <Text className="text-sm text-brandMain">사진</Text>
                  <Text className="text-xl text-gray-500 mt-[0.5px]">
                    {mapData.photo}
                  </Text>
                </View>
                <View className="h-5/6 mx-3 border-r-[0.5px] border-gray-400"></View>
                <View className="flex items-center mx-6">
                  <Text className="text-sm text-brandMain">색상</Text>
                  <Text className="text-xl text-gray-500 mt-[0.5px]">
                    {mapData.color}
                  </Text>
                </View>
                <View className="h-5/6 mx-3 border-r-[0.5px] border-gray-400"></View>
                <View className="flex items-center mx-6">
                  <Text className="text-sm text-brandMain">스토리</Text>
                  <Text className="text-xl text-gray-500 mt-[0.5px]">
                    {storyData.count}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="w-full h-3/5 flex justify-center px-8 mt-4">
            <DashboardCard
              label="가장 많이 색칠한 지역"
              value={mostCount}
              region={mostRegion}
              othersCount={mostOthers}
            />
            <DashboardCard
              label="스토리 최다 지역"
              value={storyTopCount}
              region={storyTopRegion}
              othersCount={storyTopOthers}
            />
            <DashboardCard
              label="최고 평점 지역"
              value={pointTopAvg}
              region={pointTopRegion}
              othersCount={pointTopOthers}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default DashboardScreen;
