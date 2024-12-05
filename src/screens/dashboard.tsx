import {keepPreviousData, useQuery} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomProgressBar from 'src/components/progressBar';
import {koreaMapDataInit} from 'src/constants/koreaMapData';
import useAuth from 'src/hook/useAuth';
import SkeletonDashboard from 'src/skeleton/skeletonDashboard';
import {customColor} from 'src/style/customColor';
import {DashboardProps} from 'src/types/stack';
import {getDashboardKoreaMapData} from 'src/utils/koreaMap.db';
import {getDashboardStory} from 'src/utils/story.db';

const DashboardScreen = ({navigation}: DashboardProps) => {
  const koreaMapRegionCount = Object.values(koreaMapDataInit).length;

  const {appUser} = useAuth();
  const uid = appUser?.uid!;

  const [percent, setPercent] = useState<number>(0);

  // React-Query Query
  const {
    isSuccess: isMapSuccess,
    isLoading: isMapLoading,
    isError: isMapError,
    data: mapData,
  } = useQuery({
    queryKey: ['dashboardKoreaMap', uid],
    queryFn: () => getDashboardKoreaMapData(uid),
    enabled: !!uid,
    retry: false,
    placeholderData: keepPreviousData,
  });
  const {
    isSuccess: isStorySuccess,
    isLoading: isStoryLoading,
    isError: isStoryError,
    data: storyData,
  } = useQuery({
    queryKey: ['dashboardStory', uid],
    queryFn: () => getDashboardStory(uid),
    enabled: !!uid,
    retry: false,
  });

  useEffect(() => {
    if (isMapSuccess) {
      setPercent(((mapData.color + mapData.photo) / koreaMapRegionCount) * 100);
    }
  }, [mapData]);

  return (
    <SafeAreaView
      className="flex-1 justify-center items-center bg-white"
      edges={['bottom', 'left', 'right']}>
      {(isMapError || isStoryError) && <></>}
      {(isMapLoading || isStoryLoading) && <SkeletonDashboard />}
      {isMapSuccess && isStorySuccess && (
        <React.Fragment>
          <View className="relative w-full h-2/5 flex justify-between items-start px-8 bg-brandLight shadow-md shadow-black">
            <View className="w-full h-full flex justify-center">
              <View className="w-full flex-row justify-between items-center">
                <View className="w-1/2">
                  <View className="my-2">
                    <Text className="text-lg text-white">얼마나 왔다감?</Text>
                  </View>
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
                    style={{width: 110, height: 110}}
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
