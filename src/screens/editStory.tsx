import React, {useCallback, useEffect, useRef} from 'react';
import {Keyboard, Pressable, View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {customColor} from 'src/style/customColor';
import {EditStoryProps} from 'src/types/stack';
import CustomBottomSheet from 'src/components/bottomSheet';
import {BrandDynamicButton} from 'src/components/button';
import {dateToFormatString, dateTypeToDate} from 'src/utils/dateFormat';
import {storyPointArray} from 'src/constants/point';
import useStory from 'src/hook/useStory';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import BrandCalendar from 'src/components/calendar';
import useAuth from 'src/hook/useAuth';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import SelectPoint from 'src/components/selectPoint';
import {Story} from 'src/types/story';
import {addStoryByRegionId} from 'src/utils/story.db';
import {getRegionTitleById} from 'src/utils/koreaMap.util';
import useButton from 'src/hook/useButton';

const EditStoryScreen = ({navigation, route}: EditStoryProps) => {
  // Bottom Sheet Ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // Bottom Sheet present event
  const handlePresentPress = useCallback(
    () => bottomSheetModalRef.current?.present(),
    [],
  );
  // Bottom Sheet close event
  const handleClosePress = () => bottomSheetModalRef.current?.close();

  const {appUser} = useAuth();
  const uid = appUser?.uid!;
  const story = route.params.story;

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
    settingStoryData,
  } = useStory(uid);
  const {isDisabled, disabledButton, abledButton} = useButton();

  // Access the client
  const queryClient = useQueryClient();

  // React-Query Mutation
  const editStoryMutation = useMutation({
    mutationFn: (data: Story) => addStoryByRegionId(data),
  });

  // Set state to region id
  useEffect(() => {
    if (route.params.story) {
      setRegionId(story.regionId);
      setRegionTitle(getRegionTitleById(story.regionId));
      setTitle(story.title);
      setContents(story.contents);
      setSelectedStartDate(dateTypeToDate(story.startDate));
      setSelectedEndDate(dateTypeToDate(story.endDate));
      setPoint(story.point);
    }
  }, [route.params.story]);

  // DateRangePicker bottomsheet open
  const onPressDate = () => {
    Keyboard.dismiss();
    handlePresentPress();
  };

  // Select Date(start & end)
  const onDatePicker = (startDate: Date, endDate: Date) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
    handleClosePress();
  };

  // Edit Story
  const onUpdateStory = async () => {
    disabledButton();
    try {
      const newStory = settingStoryData(true, story);
      await editStoryMutation.mutateAsync(newStory);

      await queryClient.invalidateQueries({
        queryKey: ['story'],
        refetchType: 'all',
      });
      await queryClient.invalidateQueries({
        queryKey: ['viewStory', route.params.story.id],
        refetchType: 'all',
      });
      await queryClient.invalidateQueries({
        queryKey: ['koreaMapData', uid],
        refetchType: 'all',
      });
      await queryClient.invalidateQueries({
        queryKey: ['story', uid],
        refetchType: 'all',
      });

      onUpdateStorySuccess();
    } catch (error) {
      abledButton();
      return;
    }
  };

  const onUpdateStorySuccess = () => {
    abledButton();
    navigation.goBack();
  };

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
          {storyPointArray.map(item => {
            return (
              <SelectPoint
                key={item.point}
                item={item}
                point={point}
                setPoint={setPoint}
              />
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
            point === 0 ||
            isDisabled
          }
          onPress={onUpdateStory}
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
    </SafeAreaView>
  );
};

export default EditStoryScreen;
