import React, {useCallback, useRef} from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {customColor} from 'src/style/customColor';
import {BrandDynamicButton} from 'src/components/common/button';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import useStoryInput from 'src/hook/story/useStoryInput';
import useBackButton from 'src/hook/useBackButton';
import {TUpdateStory} from 'src/types/stack';
import {useAddStoryCalendar} from 'src/hook/story/useAddStoryCalendar';
import {useUpdateStory} from 'src/hook/story/useUpdateStory';
import AddStoryContent from 'src/components/story/addStoryContent';
import AddStoryCalendarSheet from 'src/components/story/addStoryCalendarSheet';

const UpdateStoryScreen = ({navigation, route}: TUpdateStory) => {
  const story = route.params.story;

  // Bottom Sheet Ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // Bottom Sheet present event
  const handlePresentPress = useCallback(
    () => bottomSheetModalRef.current?.present(),
    [],
  );
  // Bottom Sheet close event
  const handleClosePress = () => bottomSheetModalRef.current?.close();

  // 뒤로가기 버튼 hook
  useBackButton(() => navigation.goBack());

  // story form input hook
  const {
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
    isSaveDisabled,
    dateLabel,
  } = useStoryInput(true, story);

  // 캘린더 hook
  const {onPressDate, onDatePicker} = useAddStoryCalendar({
    setSelectedStartDate,
    setSelectedEndDate,
    handlePresentPress,
    handleClosePress,
  });

  // 업데이트 플로우 hook
  const {onUpdateStory, isBusy, isDisabled} = useUpdateStory({
    settingStoryData,
    onUpdateStorySuccess: () => navigation.goBack(),
    storyId: story.id,
  });

  return (
    <SafeAreaView
      className="flex-1 justify-center items-center bg-white p-6"
      edges={['top', 'bottom', 'left', 'right']}>
      <View className="w-full">
        <TextInput
          className="w-full bg-gray-300"
          mode="outlined"
          activeOutlineColor={customColor.brandMain}
          editable={false}
          value={regionTitle}
        />
      </View>
      <AddStoryContent
        title={title}
        setTitle={setTitle}
        contents={contents}
        setContents={setContents}
        point={point}
        setPoint={setPoint}
        dateLabel={dateLabel}
        onPressDate={onPressDate}
      />

      <View className="w-full mt-auto">
        <BrandDynamicButton
          classes="w-full"
          text={isBusy ? '저장 중...' : '저장'}
          isDisabled={isSaveDisabled || isDisabled}
          onPress={onUpdateStory}
        />
      </View>
      <AddStoryCalendarSheet
        bottomSheetRef={bottomSheetModalRef}
        start={selectedStartDate ?? new Date()}
        end={selectedEndDate ?? new Date()}
        onPick={onDatePicker}
        onClose={handleClosePress}
      />
    </SafeAreaView>
  );
};

export default UpdateStoryScreen;
