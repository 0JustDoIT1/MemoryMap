import React, {useCallback, useRef} from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {customColor} from 'src/style/customColor';
import {TAddStory} from 'src/types/stack';
import {BrandDynamicButton} from 'src/components/common/button';
import NotFound from 'src/components/view/notFound';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import useStoryInput from 'src/hook/story/useStoryInput';
import {StoryInit} from 'src/constants/story';
import useBackButton from 'src/hook/useBackButton';
import LoadingScreen from './loadingScreen';
import {useAddStoryCalendar} from 'src/hook/story/useAddStoryCalendar';
import {useAddStory} from 'src/hook/story/useAddStory';
import {useSelectRegion} from 'src/hook/story/useAddStoryRegion';
import AddStoryContent from 'src/components/story/addStoryContent';
import AddStoryCalendarSheet from 'src/components/story/addStoryCalendarSheet';

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
  const {onPressDate, onDatePicker} = useAddStoryCalendar({
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
  const {isDisabled, isBusy, onAddStory} = useAddStory({
    settingStoryData,
    regionId,
    onAddStorySuccess: () => navigation.navigate('Main', {screen: 'Story'}),
  });

  if (isColorError) {
    return null;
  }

  if (isColorLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView
      className="flex-1 justify-center items-center bg-white p-6"
      edges={['top', 'bottom', 'left', 'right']}>
      {isRegionSelectable ? (
        <>
          <AddStoryContent
            regionTitle={regionTitle}
            title={title}
            setTitle={setTitle}
            contents={contents}
            setContents={setContents}
            point={point}
            setPoint={setPoint}
            dateLabel={dateLabel}
            onPressRegion={onPressRegion}
            onPressDate={onPressDate}
          />
          <View className="w-full mt-auto">
            <BrandDynamicButton
              classes="w-full"
              text={isBusy ? '저장 중...' : '저장'}
              isDisabled={isSaveDisabled || isDisabled}
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
    </SafeAreaView>
  );
};

export default AddStoryScreen;
