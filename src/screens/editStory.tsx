import React, {useEffect, useState} from 'react';
import {Image, Keyboard, Pressable, View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import useKoreaMap from 'src/hook/useKoreaMap';
import {customColor} from 'src/style/customColor';
import {EditStoryProps} from 'src/types/stack';
import useCustomBottomSheet from 'src/hook/useBottomSheet';
import CustomBottomSheet from 'src/components/bottomSheet';
import MemoizedCalendar from 'src/components/calendar';
import {BrandDynamicButton} from 'src/components/button';
import {dateToFormatString, timestampToDate} from 'src/utils/dateFormat';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {storyPointArray} from 'src/constants/storyPoint';
import {customStyle} from 'src/style/customStyle';
import {_setDoc} from 'src/utils/firestore';
import {showBottomToast} from 'src/utils/showToast';
import useStory from 'src/hook/useStory';
import {StoryData} from 'src/types/story';
import {getRegionTitleById} from 'src/utils/koreaMap';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const EditStoryScreen = ({navigation, route}: EditStoryProps) => {
  const {koreaMapData} = useKoreaMap();
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
    getStoryById,
    updateStoryById,
  } = useStory();
  const {
    bottomSheetModalRef,
    snapPoints,
    bottomSheetTitle,
    bottomSheetDescription,
    bottomSheetContents,
    settingBottomSheet,
    handlePresentPress,
    handleClosePress,
    renderBackdrop,
  } = useCustomBottomSheet();

  const [id, setId] = useState<string>('');

  // 지역 id에 맞게 title 설정
  useEffect(() => {
    if (route.params.storyId) {
      const story: StoryData = getStoryById(route.params.storyId);
      setId(story._id);
      setRegionId(story.regionId);
      setRegionTitle(getRegionTitleById(koreaMapData, story.regionId));
      setTitle(story.title);
      setContents(story.contents);
      setSelectedStartDate(timestampToDate(story.startDate));
      setSelectedEndDate(timestampToDate(story.endDate));
      setPoint(story.point);
    }
  }, [route.params.storyId]);

  // 날짜 선택 시 bottomSheet open
  const onPressDate = () => {
    Keyboard.dismiss();
    settingBottomSheet({
      contents: (
        <MemoizedCalendar
          selectedStartDate={selectedStartDate!}
          selectedEndDate={selectedEndDate!}
          onDatePicker={onDatePicker}
          close={handleClosePress}
        />
      ),
      snap: '70%',
    });
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

  // 날짜 선택
  const onDatePicker = (startDate: Date, endDate: Date) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
    handleClosePress();
  };

  // 스토리 수정
  const onUpdateStory = async () => {
    try {
      await updateStoryById(id);

      onUpdateStorySuccess();
    } catch (error) {
      onUpdateStoryError(error);
    }
  };

  const onUpdateStorySuccess = () => {
    const text = `해당 스토리를 수정했습니다.`;

    navigation.navigate('Story');
    showBottomToast('success', text);
  };

  const onUpdateStoryError = (error: any) => {
    showBottomToast('error', '스토리 저장에 실패했습니다.');
  };

  return (
    <SafeAreaView className="flex-1 justify-start items-center w-screen h-screen bg-white p-6">
      <View className="w-full">
        <TextInput
          className="w-full bg-gray-300"
          mode="outlined"
          activeOutlineColor={customColor.brandMain}
          editable={false}
          value={regionTitle}
        />
      </View>
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
                <View className="w-[60px] h-[60px] bg-white rounded-full shadow-sm shadow-black">
                  <Image style={{width: 60, height: 60}} source={item.image} />
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
          onPress={onUpdateStory}
        />
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

export default EditStoryScreen;
