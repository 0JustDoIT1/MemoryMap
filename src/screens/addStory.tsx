import React, {useEffect, useMemo, useState} from 'react';
import {Pressable, View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import useKoreaMap from 'src/hook/useKoreaMap';
import {useAppTheme} from 'src/style/paperTheme';
import {AddStoryProps} from 'src/types/stack';
import {DateParsable} from 'react-native-calendar-picker';
import useCustomBottomSheet from 'src/hook/useBottomSheet';
import CustomBottomSheet from 'src/components/bottomSheet';
import BrandCalendar from 'src/components/calendar';
import {dateToFormatString} from 'src/utils/dateFormat';
import {BrandContainedButton} from 'src/components/button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const AddStory = ({navigation, route}: AddStoryProps) => {
  const theme = useAppTheme();

  const {koreaMapData, getColorRegionList} = useKoreaMap();

  const {
    bottomSheetModalRef,
    snapPoints,
    bottomSheetTitle,
    bottomSheetDescription,
    bottomSheetContents,
    handlePresentModalPress,
    handleClosePress,
    renderBackdrop,
  } = useCustomBottomSheet();

  const [regionId, setRegionId] = useState<string>('');
  const [regionTitle, setRegionTitle] = useState<string>('');

  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');
  const [selectedStartDate, selectedSetStartDate] = useState<DateParsable>('');
  const [selectedEndDate, selectedSetEndDate] = useState<DateParsable>('');

  const regionMain = useMemo(
    () => Object.keys(getColorRegionList()),
    [koreaMapData],
  );

  useEffect(() => {
    if (route.params.region) {
      setRegionId(route.params.region!);
      setRegionTitle(
        koreaMapData[route.params.region!].value[
          koreaMapData[route.params.region!].value.length - 1
        ],
      );
    }
  }, [route.params.region]);

  // 지역 선택 페이지로 전환
  const onPressRegion = () => {
    navigation.navigate('SelectRegion');
  };

  const onDatePicker = (startDate: Date, endDate: Date) => {
    selectedSetStartDate(startDate);
    selectedSetEndDate(endDate);
    handleClosePress();
  };

  return (
    <SafeAreaView className="flex-1 justify-start items-center bg-white p-6">
      {regionMain.length >= 1 ? (
        <React.Fragment>
          <Pressable className="w-full" onPress={onPressRegion}>
            <TextInput
              className="w-full bg-white"
              mode="outlined"
              label="지역을 선택해 주세요."
              activeOutlineColor={theme.colors.brandMain}
              editable={false}
              value={regionTitle}
            />
          </Pressable>
          <View className="w-full flex-row justify-between items-center mt-2">
            <Pressable
              className="w-[49%]"
              onPress={() => {
                handlePresentModalPress({
                  contents: (
                    <BrandCalendar
                      selectedStartDate={selectedStartDate}
                      selectedEndDate={selectedEndDate}
                      onDatePicker={onDatePicker}
                      close={handleClosePress}
                    />
                  ),
                  snap: '70%',
                });
              }}>
              <TextInput
                className="w-full bg-white"
                mode="outlined"
                label="From"
                activeOutlineColor={theme.colors.brandMain}
                editable={false}
                value={dateToFormatString(
                  selectedStartDate.toString(),
                  'yyyy.MM.dd',
                )}
              />
            </Pressable>
            <Pressable
              className="w-[49%]"
              onPress={() => {
                handlePresentModalPress({
                  contents: (
                    <BrandCalendar
                      selectedStartDate={selectedStartDate}
                      selectedEndDate={selectedEndDate}
                      onDatePicker={onDatePicker}
                      close={handleClosePress}
                    />
                  ),
                  snap: '70%',
                });
              }}>
              <TextInput
                className="w-full bg-white"
                mode="outlined"
                label="To"
                activeOutlineColor={theme.colors.brandMain}
                editable={false}
                value={dateToFormatString(
                  selectedEndDate.toString(),
                  'yyyy.MM.dd',
                )}
              />
            </Pressable>
          </View>
          <View className="w-full mt-2">
            <TextInput
              className="w-full bg-white"
              mode="outlined"
              label="제목"
              activeOutlineColor={theme.colors.brandMain}
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              className="w-full bg-white h-40 mt-2"
              mode="outlined"
              label="내용"
              activeOutlineColor={theme.colors.brandMain}
              multiline={true}
              value={contents}
              onChangeText={setContents}
            />
          </View>
        </React.Fragment>
      ) : (
        <View className="w-full h-full flex justify-center items-center">
          <Text>색칠된 지역이 없습니다.</Text>
        </View>
      )}
      <View className="mt-8">
        <Text className="text-md ml-2">여행 기분은 어떠셨나요?</Text>
        <View className="w-full mt-2 flex-row justify-between items-center">
          <View className="flex items-center">
            <MaterialCommunityIcons
              name="emoticon-excited-outline"
              size={60}
              color={theme.colors.excite}
            />
            <Text className="text-excite">최고</Text>
          </View>
          <View className="flex items-center">
            <MaterialCommunityIcons
              name="emoticon-happy-outline"
              size={60}
              color={theme.colors.happy}
            />
            <Text className="text-happy">좋음</Text>
          </View>
          <View className="flex items-center">
            <MaterialCommunityIcons
              name="emoticon-neutral-outline"
              size={60}
              color={theme.colors.info}
            />
            <Text className="text-neutral">보통</Text>
          </View>
          <View className="flex items-center">
            <MaterialCommunityIcons
              name="emoticon-sad-outline"
              size={60}
              color={theme.colors.sad}
            />
            <Text className="text-sad">나쁨</Text>
          </View>
          <View className="flex items-center">
            <MaterialCommunityIcons
              name="emoticon-dead-outline"
              size={60}
              color={theme.colors.dead}
            />
            <Text className="text-dead">끔찍함</Text>
          </View>
        </View>
      </View>

      <View className="w-full mt-auto">
        <BrandContainedButton classes="w-full" text="저장" />
      </View>

      <CustomBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        handleClosePress={handleClosePress}
        renderBackdrop={renderBackdrop}
        title={bottomSheetTitle}
        description={bottomSheetDescription}
        contents={bottomSheetContents}
      />
    </SafeAreaView>
  );
};

export default AddStory;
