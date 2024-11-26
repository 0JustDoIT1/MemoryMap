import React, {useCallback, useEffect, useRef} from 'react';
import {Image, Keyboard, Pressable, View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import useKoreaMap from 'src/hook/useKoreaMap';
import {customColor} from 'src/style/customColor';
import {AddStoryProps} from 'src/types/stack';
import CustomBottomSheet from 'src/components/bottomSheet';
import MemoizedCalendar from 'src/components/calendar';
import {BrandDynamicButton} from 'src/components/button';
import {dateToFormatString} from 'src/utils/dateFormat';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {storyPointArray} from 'src/constants/storyPoint';
import {customStyle} from 'src/style/customStyle';
import {_setDoc} from 'src/utils/firestore';
import {showBottomToast} from 'src/utils/showToast';
import useStory from 'src/hook/useStory';
import NotFound from 'src/components/notFound';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getRegionTitleById} from 'src/utils/koreaMap';
import useRegionCount from 'src/hook/useRegionCount';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AddStoryScreen = ({navigation, route}: AddStoryProps) => {
  // Bottom Sheet Ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // Bottom Sheet present event
  const handlePresentPress = useCallback(
    () => bottomSheetModalRef.current?.present(),
    [],
  );
  // Bottom Sheet close event
  const handleClosePress = () => bottomSheetModalRef.current?.close();

  const {koreaMapData, regionMain, updateKoreaMapDataStory} = useKoreaMap();
  const {
    regionId,
    setRegionId,
    regionTitle,
    setRegionTitle,
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
    addStoryByRegionId,
  } = useStory();
  const {updateRegionCountById} = useRegionCount();

  // 지역 id에 맞게 title 설정
  useEffect(() => {
    if (route.params?.regionId) {
      const region = route.params.regionId;
      setRegionId(region);
      setRegionTitle(getRegionTitleById(koreaMapData, region));
    }
  }, [route.params]);

  // 날짜 선택 시 bottomSheet open
  const onPressDate = () => {
    Keyboard.dismiss();
    handlePresentPress();
  };

  // 점수 선택에 따라 크기 변화
  const animatedStyle = (num: number) =>
    useAnimatedStyle(() => {
      return {
        transform: [{scale: num === point ? withTiming(1.3) : withTiming(1)}],
        elevation: 1,
      };
    }, [point]);

  // 지역 선택 페이지로 전환
  const onPressRegion = () => {
    navigation.navigate('SelectRegion');
  };

  // 날짜 선택
  const onDatePicker = (startDate: Date, endDate: Date) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
    handleClosePress();
  };

  // 스토리 추가
  const onAddStory = async () => {
    try {
      await addStoryByRegionId();
      await updateRegionCountById(regionId, 'story', 1);
      await updateKoreaMapDataStory(regionId, 1);

      onAddStorySuccess();
    } catch (error) {
      onAddStoryError(error);
    }
  };

  const onAddStorySuccess = () => {
    const text = `스토리를 작성했습니다.`;

    navigation.navigate('Main', {screen: 'Story'});
    showBottomToast('success', text);
  };

  const onAddStoryError = (error: any) => {
    showBottomToast('error', '스토리 저장에 실패했습니다.');
  };

  return (
    <SafeAreaView
      className="flex-1 justify-center items-center bg-white p-6"
      edges={['top', 'bottom', 'left', 'right']}>
      {regionMain.length >= 1 ? (
        <React.Fragment>
          <Pressable className="w-full" onPress={onPressRegion}>
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
            <Pressable className="w-[49%]" onPress={onPressDate}>
              <TextInput
                className="w-full bg-white"
                mode="outlined"
                label="From"
                activeOutlineColor={customColor.brandMain}
                editable={false}
                value={dateToFormatString(selectedStartDate, 'YYYY.MM.DD')}
              />
            </Pressable>
            <Pressable className="w-[49%]" onPress={onPressDate}>
              <TextInput
                className="w-full bg-white"
                mode="outlined"
                label="To"
                activeOutlineColor={customColor.brandMain}
                editable={false}
                value={dateToFormatString(selectedEndDate, 'YYYY.MM.DD')}
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
        </React.Fragment>
      ) : (
        <NotFound
          icon={
            <MaterialCommunityIcons
              name="map-search-outline"
              size={90}
              color={customColor.outline}
            />
          }
          title="색칠된 지역이 없습니다."
          description="지도에서 색칠한 후에 스토리를 작성해 주세요."
          onPress={() => navigation.navigate('Main', {screen: 'Map'})}
        />
      )}
      <View className="mt-8">
        <Text className="text-sm ml-2">여행은 즐거우셨나요?</Text>
        <View className="w-full mt-4 flex-row justify-between items-center">
          {storyPointArray.map(item => {
            return (
              <AnimatedPressable
                key={item.point}
                className="flex items-center"
                style={animatedStyle(item.point)}
                onPress={() => {
                  Keyboard.dismiss();
                  setPoint(item.point);
                }}>
                <View className="w-[50px] h-[50px] bg-white rounded-full shadow-sm shadow-black">
                  <Image style={{width: 50, height: 50}} source={item.image} />
                </View>
                <Text
                  className="mt-1"
                  style={customStyle({color: item.color}).storyPointIconText}>
                  {item.text}
                </Text>
              </AnimatedPressable>
            );
          })}
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
            point === 0
          }
          onPress={onAddStory}
        />
      </View>
      <CustomBottomSheet
        ref={bottomSheetModalRef}
        snap="60%"
        contents={
          <MemoizedCalendar
            selectedStartDate={selectedStartDate!}
            selectedEndDate={selectedEndDate!}
            onDatePicker={onDatePicker}
            close={handleClosePress}
          />
        }
      />
    </SafeAreaView>
  );
};

export default AddStoryScreen;
