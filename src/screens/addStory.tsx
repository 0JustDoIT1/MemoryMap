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
