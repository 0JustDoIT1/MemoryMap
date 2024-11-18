import React from 'react';
import {Image, View} from 'react-native';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomProgressBar from 'src/components/progressBar';
import {koreaMapDataInit} from 'src/constants/koreaMapData';
import useDashboard from 'src/hook/useDashboard';
import {customStyle} from 'src/style/customStyle';
import {useAppTheme} from 'src/style/paperTheme';
import {DashboardProps} from 'src/types/stack';

const DashboardScreen = ({navigation}: DashboardProps) => {
  const theme = useAppTheme();

  const koreaMapRegionCount = Object.values(koreaMapDataInit).length;

  const {
    regionCountNumber,
    allCountStoryNum,
    allCountColorNum,
    allCountPhotoNum,
    mostColoredRegion,
    mostStoryRegion,
    maxPointRegion,
  } = useDashboard();

  const percent = (regionCountNumber / koreaMapRegionCount) * 100;

  return (
    <SafeAreaView className="flex-1 justify-between items-center w-screen h-screen bg-white">
      <View className="relative w-full h-1/3 flex justify-between items-start px-8 bg-brandLight shadow-md shadow-black">
        <View className="w-full h-full flex justify-center">
          <View className="w-full flex-row justify-between items-center">
            <View className="w-1/2">
              <View className="my-2">
                <Text className="text-lg text-white">얼마나 왔다감?</Text>
              </View>
              <View className="w-full flex-row justify-between items-center my-2">
                <View className="flex-row items-end">
                  <Text className="text-6xl text-white">
                    {regionCountNumber}
                  </Text>
                  <Text className="text-xl text-white leading-8">
                    /&nbsp;{koreaMapRegionCount}
                  </Text>
                </View>
              </View>
            </View>
            <View className="w-1/2 flex items-end">
              <Image
                style={customStyle().dashboardImage}
                source={require('assets/images/map.png')}
              />
            </View>
          </View>
          <View className="w-full mt-2 mb-4">
            <CustomProgressBar
              navigation={navigation}
              percent={percent}
              percentView={true}
              color={theme.colors.brandMain}
              bgColor={theme.colors.white}
              textColor={theme.colors.white}
            />
          </View>

          <View className="absolute bottom-[-32] w-full h-16 flex-row justify-center items-center bg-white rounded-lg shadow shadow-black">
            <View className="flex items-center mx-6">
              <Text className="text-sm text-brandMain">사진</Text>
              <Text className="text-xl text-gray-500 mt-[0.5px]">
                {allCountPhotoNum}
              </Text>
            </View>
            <View className="h-5/6 mx-3 border-r-[0.5px] border-gray-400"></View>
            <View className="flex items-center mx-6">
              <Text className="text-sm text-brandMain">색상</Text>
              <Text className="text-xl text-gray-500 mt-[0.5px]">
                {allCountColorNum}
              </Text>
            </View>
            <View className="h-5/6 mx-3 border-r-[0.5px] border-gray-400"></View>
            <View className="flex items-center mx-6">
              <Text className="text-sm text-brandMain">스토리</Text>
              <Text className="text-xl text-gray-500 mt-[0.5px]">
                {allCountStoryNum}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="w-full h-2/3 flex justify-center px-8 mt-4">
        <View className="flex justify-start items-start w-full p-4 my-2 rounded-lg bg-white shadow-md shadow-black">
          <View className="flex-row items-end">
            <Text className="text-base text-brandMain">
              가장 많이 색칠한 지역
            </Text>
            {mostColoredRegion().MathColorNum !== 0 && (
              <Text className="text-base text-gray-500">
                &nbsp;({mostColoredRegion().MathColorNum}개)
              </Text>
            )}
          </View>
          <View className="flex-row items-end mt-4">
            <Text className="text-3xl text-gray-500">
              {mostColoredRegion().regionTitle}
            </Text>

            {mostColoredRegion().regionIdArr.length > 1 && (
              <View className="flex-row items-end">
                <Text className="text-sm leading-7 text-gray-500 ml-2">
                  외
                  <Text className="text-lg leading-7 text-gray-500 ml-2">
                    &nbsp;{mostColoredRegion().regionIdArr.length - 1}&nbsp;
                  </Text>
                  지역
                </Text>
              </View>
            )}
          </View>
        </View>
        <View className="flex justify-start items-start w-full p-4 my-2 rounded-lg bg-white shadow-md shadow-black">
          <View className="flex-row items-end">
            <Text className="text-base text-brandMain">스토리 최다 지역</Text>
            {mostStoryRegion().MathStoryNum !== 0 && (
              <Text className="text-base text-gray-500">
                &nbsp;({mostStoryRegion().MathStoryNum}개)
              </Text>
            )}
          </View>
          <View className="flex-row items-end mt-4">
            <Text className="text-3xl text-gray-500">
              {mostStoryRegion().regionTitle}
            </Text>

            {mostStoryRegion().regionIdArr.length > 1 && (
              <View className="flex-row items-end">
                <Text className="text-sm leading-7 text-gray-500 ml-2">
                  외
                  <Text className="text-lg leading-7 text-gray-500 ml-2">
                    &nbsp;{mostStoryRegion().regionIdArr.length - 1}&nbsp;
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
            {maxPointRegion().mathPointNum !== 0 && (
              <Text className="text-base text-gray-500">
                &nbsp;({maxPointRegion().mathPointNum}점)
              </Text>
            )}
          </View>
          <View className="flex-row items-end mt-4">
            <Text className="text-3xl text-gray-500">
              {maxPointRegion().regionTitle}
            </Text>

            {maxPointRegion().regionIdArr.length > 1 && (
              <View className="flex-row items-end">
                <Text className="text-sm leading-7 text-gray-500 ml-2">
                  외
                  <Text className="text-lg leading-7 text-gray-500 ml-2">
                    &nbsp;{maxPointRegion().regionIdArr.length - 1}&nbsp;
                  </Text>
                  지역
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;
