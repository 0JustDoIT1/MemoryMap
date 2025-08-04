import React, {useCallback, useEffect, useRef} from 'react';
import {Keyboard, Pressable, View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {customColor} from 'src/style/customColor';
import {TAddStory} from 'src/types/stack';
import CustomBottomSheet from 'src/components/common/bottomSheet';
import {BrandDynamicButton} from 'src/components/common/button';
import {dateToFormatString} from 'src/utils/dateFormat';
import {storyPointArray} from 'src/constants/point';
import NotFound from 'src/components/view/notFound';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import BrandCalendar from 'src/components/common/calendar';
import SelectPoint from 'src/components/common/selectPoint';
import useButton from 'src/hook/useButton';
import useStoryInput from 'src/hook/useStoryInput';
import useKoreaMapQuery from 'src/hook/useKoreaMapQuery';
import useStoryUpdate from 'src/hook/useStoryUpdate';
import {StoryInit} from 'src/constants/story';
import useBackButton from 'src/hook/useBackButton';
import useAd from 'src/hook/useAd';

const AddStoryScreen = ({navigation, route}: TAddStory) => {
  // Bottom Sheet Ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // Bottom Sheet present event
  const handlePresentPress = useCallback(
    () => bottomSheetModalRef.current?.present(),
    [],
  );
  // Bottom Sheet close event
  const handleClosePress = () => bottomSheetModalRef.current?.close();

  useBackButton(() => navigation.goBack());

  const region = route.params.regionId ? route.params.regionId : '';

  const {
    regionId,
    regionTitle,
    title,
    setTitle,
    contents,
    setContents,
    selectedStartDate,
    setSelectedStartDate,
    selectedEndDate,
    setSelectedEndDate,
    point,
    setPoint,
    settingStoryData,
  } = useStoryInput(false, {...StoryInit, regionId: region});
  const {isDisabled, disabledButton, abledButton} = useButton();
  const {isColorSuccess, isColorLoading, isColorError, colorData} =
    useKoreaMapQuery();
  const {addStoryMutation, updateMapMutation} = useStoryUpdate();
  const {load, show, isClosed, checkAdShow} = useAd();

  useEffect(() => {
    load();
    if (isClosed) {
      onAddStorySuccess();
      load();
    }
  }, [load, isClosed]);

  // BottomSheet opens when date is selected
  const onPressDate = () => {
    Keyboard.dismiss();
    handlePresentPress();
  };

  // Navigate to region selection page
  const onPressRegion = () => {
    if (isColorSuccess && colorData) {
      navigation.navigate('SelectRegion', {
        regionList: colorData.all,
        regionMainList: colorData.main,
      });
    }
  };

  // Select Date
  const onDatePicker = (startDate: Date, endDate: Date) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
    handleClosePress();
  };

  // Add Story
  const onAddStory = async () => {
    try {
      if (isColorSuccess) {
        disabledButton();
        const adShow = await checkAdShow('story');
        if (adShow) {
          show();
          await onAddingStory();
        } else {
          await onAddingStory();
          onAddStorySuccess();
        }
      }
    } catch (error) {
      abledButton();
      return;
    }
  };

  const onAddingStory = async () => {
    const newStory = settingStoryData();
    await addStoryMutation.mutateAsync(newStory);
    await updateMapMutation.mutateAsync({
      id: regionId,
      count: 1,
    });
  };

  const onAddStorySuccess = () => {
    navigation.navigate('Main', {screen: 'Story'});
  };

  return (
    <SafeAreaView
      className="flex-1 justify-center items-center bg-white p-6"
      edges={['top', 'bottom', 'left', 'right']}>
      {isColorError && <></>}
      {isColorLoading && <></>}
      {isColorSuccess && colorData && (
        <React.Fragment>
          {colorData.main.length >= 1 ? (
            <React.Fragment>
              <Pressable
                className="w-full"
                onPress={onPressRegion}
                disabled={isDisabled}>
                <TextInput
                  className="w-full bg-white"
                  mode="outlined"
                  label="지역을 선택해 주세요."
                  activeOutlineColor={customColor.brandMain}
                  editable={false}
                  value={regionTitle}
                />
              </Pressable>
              <View className="w-full flex-row justify-between items-center mt-2">
                <Pressable
                  className="w-full"
                  onPress={onPressDate}
                  disabled={isDisabled}>
                  <TextInput
                    className="w-full bg-white"
                    mode="outlined"
                    label="여행일자"
                    activeOutlineColor={customColor.brandMain}
                    editable={false}
                    value={
                      selectedStartDate && selectedEndDate
                        ? `${dateToFormatString(selectedStartDate, 'YYYY.MM.DD (ddd)')} ~ ${dateToFormatString(selectedEndDate, 'YYYY.MM.DD (ddd)')}`
                        : ''
                    }
                  />
                </Pressable>
              </View>
              <View className="w-full mt-2">
                <TextInput
                  className="w-full bg-white"
                  mode="outlined"
                  label="제목"
                  placeholder="(10자)"
                  activeOutlineColor={customColor.brandMain}
                  value={title}
                  maxLength={10}
                  onChangeText={setTitle}
                />
                <TextInput
                  className="w-full bg-white h-40 mt-2"
                  mode="outlined"
                  label="내용"
                  placeholder="(100자)"
                  activeOutlineColor={customColor.brandMain}
                  multiline={true}
                  value={contents}
                  maxLength={100}
                  onChangeText={setContents}
                />
              </View>
              <View className="mt-8">
                <Text className="text-sm ml-2">여행은 즐거우셨나요?</Text>
                <View className="w-full mt-4 flex-row justify-between items-center">
                  {storyPointArray.map(item => (
                    <SelectPoint
                      key={item.point}
                      item={item}
                      point={point}
                      setPoint={setPoint}
                    />
                  ))}
                </View>
              </View>

              <View className="w-full mt-auto">
                <BrandDynamicButton
                  classes="w-full"
                  text="저장"
                  isDisabled={
                    regionId === '' ||
                    !selectedStartDate ||
                    !selectedEndDate ||
                    title === '' ||
                    contents === '' ||
                    point === 0 ||
                    isDisabled
                  }
                  onPress={onAddStory}
                />
              </View>
              <CustomBottomSheet
                ref={bottomSheetModalRef}
                snap="60%"
                contents={
                  <BrandCalendar
                    selectedStartDate={selectedStartDate!}
                    selectedEndDate={selectedEndDate!}
                    onDatePicker={onDatePicker}
                    close={handleClosePress}
                  />
                }
              />
            </React.Fragment>
          ) : (
            <NotFound
              icon={
                <MaterialCommunityIcons
                  name="map-search-outline"
                  size={90}
                  color={customColor.blackOpacity}
                />
              }
              title="색칠된 지역이 없습니다."
              description="지도에서 색칠한 후에 스토리를 작성해 주세요."
              onPress={() => navigation.navigate('Main', {screen: 'Map'})}
            />
          )}
        </React.Fragment>
      )}
    </SafeAreaView>
  );
};

export default AddStoryScreen;
