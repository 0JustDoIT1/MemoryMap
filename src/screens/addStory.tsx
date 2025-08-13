import React, {useCallback, useRef} from 'react';
import {Pressable, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {customColor} from 'src/style/customColor';
import {TAddStory} from 'src/types/stack';
import NotFound from 'src/components/states/notFound';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import useStoryInput from 'src/hook/story/useStoryInput';
import {StoryInit} from 'src/constants/story';
import useBackButton from 'src/hook/common/useBackButton';
import LoadingOverlay from '../components/feedback/loadingOverlay';
import {useStoryCalendar} from 'src/hook/story/useAddStoryCalendar';
import {useAddStory} from 'src/hook/story/useAddStory';
import {useSelectRegion} from 'src/hook/story/useAddStoryRegion';
import AddStoryContent from 'src/components/story/addStoryContent';
import AddStoryCalendarSheet from 'src/components/story/addStoryCalendarSheet';
import {TextInput} from 'react-native-paper';
import BrandButton from 'src/components/common/button';

const AddStoryScreen = ({navigation, route}: TAddStory) => {
  const region = route.params.regionId ? route.params.regionId : '';

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
    isSaveDisabled,
    dateLabel,
  } = useStoryInput(false, {...StoryInit, regionId: region});

  // 캘린더 hook
  const {onPressDate, onDatePicker} = useStoryCalendar({
    setSelectedStartDate,
    setSelectedEndDate,
    handlePresentPress,
    handleClosePress,
  });

  // 지역 관련 hook
  const {
    onPressRegion,
    isRegionSelectable,
    isColorSuccess,
    isColorLoading,
    isColorError,
  } = useSelectRegion(navigation);

  // 저장 플로우 hook
  const {onAddStory, isDisabled, isBusy} = useAddStory({
    settingStoryData,
    regionId,
    onAddStorySuccess: () => navigation.navigate('Main', {screen: 'Story'}),
  });

  if (isColorError) {
    return null;
  }

  return (
    <SafeAreaView
      className="flex-1 justify-center items-center bg-white p-6"
      edges={['top', 'bottom', 'left', 'right']}>
      {isRegionSelectable ? (
        <>
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
            <BrandButton
              variant="contained"
              className="w-full"
              text={isBusy ? '저장 중...' : '저장'}
              disabled={isSaveDisabled || isDisabled}
              onPress={onAddStory}
            />
          </View>
          <AddStoryCalendarSheet
            bottomSheetRef={bottomSheetModalRef}
            start={selectedStartDate ?? new Date()}
            end={selectedEndDate ?? new Date()}
            onPick={onDatePicker}
            onClose={handleClosePress}
          />
        </>
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
      <LoadingOverlay visible={isColorLoading} />
    </SafeAreaView>
  );
};

export default AddStoryScreen;
