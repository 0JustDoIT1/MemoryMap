import React from 'react';
import {Image, View} from 'react-native';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomProgressBar from 'src/components/progressBar';
import {koreaMapDataInit} from 'src/constants/koreaMapData';
import useDashboard from 'src/hook/useDashboard';
import useExitApp from 'src/hook/useExitApp';
import {customColor} from 'src/style/customColor';
import {DashboardProps} from 'src/types/stack';

const DashboardScreen = ({navigation}: DashboardProps) => {
  const koreaMapRegionCount = Object.values(koreaMapDataInit).length;

  const {
    percent,
    isMapSuccess,
    isMapLoading,
    isMapError,
    mapData,
    isStorySuccess,
    isStoryLoading,
    isStoryError,
    storyData,
  } = useDashboard(koreaMapRegionCount);
  useExitApp();

  return (
    <SafeAreaView
      className="flex-1 justify-center items-center bg-white"
      edges={['bottom', 'left', 'right']}>
      {(isMapError || isStoryError) && <></>}
      {(isMapLoading || isStoryLoading) && <></>}
      {isMapSuccess && isStorySuccess && mapData && storyData && (
        <React.Fragment>
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
                        {mapData.color + mapData.photo}
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
            <View className="flex justify-start items-start w-full p-4 my-2 rounded-lg bg-white shadow-md shadow-black">
              <View className="flex-row items-end">
                <Text className="text-base text-brandMain">
                  가장 많이 색칠한 지역
                </Text>
                {mapData.mostRegion.length !== 0 && (
                  <Text className="text-base text-gray-500">
                    &nbsp;({mapData.mostRegion[0].count}개)
                  </Text>
                )}
              </View>
              <View className="flex-row items-end mt-4">
                <Text className="text-2xl text-gray-500">
                  {mapData.mostRegion.length >= 1
                    ? mapData.mostRegion[0].main
                    : '-'}
                </Text>

                {mapData.mostRegion.length > 1 && (
                  <View className="flex-row items-end">
                    <Text className="text-sm leading-7 text-gray-500 ml-1">
                      외
                      <Text className="text-lg leading-7 text-gray-500 ml-2">
                        &nbsp;{mapData.mostRegion.length - 1}
                        &nbsp;
                      </Text>
                      지역
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View className="flex justify-start items-start w-full p-4 my-2 rounded-lg bg-white shadow-md shadow-black">
              <View className="flex-row items-end">
                <Text className="text-base text-brandMain">
                  스토리 최다 지역
                </Text>
                {storyData.countRegion.length !== 0 && (
                  <Text className="text-base text-gray-500">
                    &nbsp;({storyData.countRegion[0].count}개)
                  </Text>
                )}
              </View>
              <View className="flex-row items-end mt-4">
                <Text className="text-2xl text-gray-500">
                  {storyData.countRegion.length >= 1
                    ? storyData.countRegion[0].title
                    : '-'}
                </Text>

                {storyData.countRegion.length > 1 && (
                  <View className="flex-row items-end">
                    <Text className="text-sm leading-7 text-gray-500 ml-1">
                      외
                      <Text className="text-lg leading-7 text-gray-500 ml-2">
                        &nbsp;{storyData.countRegion.length - 1}
                        &nbsp;
                      </Text>
                      지역
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View className="flex justify-start items-start w-full p-4 my-2 rounded-lg bg-white shadow-md shadow-black">
              <View className="flex-row items-end">
                <Text className="text-base text-brandMain">최고 평점 지역</Text>
                {storyData.pointRegion.length !== 0 && (
                  <Text className="text-base text-gray-500">
                    &nbsp;({storyData.pointRegion[0].avg}점)
                  </Text>
                )}
              </View>
              <View className="flex-row items-end mt-4">
                <Text className="text-2xl text-gray-500">
                  {storyData.pointRegion.length >= 1
                    ? storyData.pointRegion[0].title
                    : '-'}
                </Text>

                {storyData.pointRegion.length > 1 && (
                  <View className="flex-row items-end">
                    <Text className="text-sm leading-7 text-gray-500 ml-1">
                      외
                      <Text className="text-lg leading-7 text-gray-500 ml-2">
                        &nbsp;{storyData.pointRegion.length - 1}&nbsp;
                      </Text>
                      지역
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </React.Fragment>
      )}
    </SafeAreaView>
  );
};

export default DashboardScreen;
