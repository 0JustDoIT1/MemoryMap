import React, {useCallback, useEffect, useRef} from 'react';
import {Keyboard, Pressable, View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {customColor} from 'src/style/customColor';
import {AddStoryProps} from 'src/types/stack';
import CustomBottomSheet from 'src/components/bottomSheet';
import {BrandDynamicButton} from 'src/components/button';
import {dateToFormatString} from 'src/utils/dateFormat';
import {storyPointArray} from 'src/constants/point';
import {showBottomToast} from 'src/utils/showToast';
import useStory from 'src/hook/useStory';
import NotFound from 'src/components/notFound';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import useAuth from 'src/hook/useAuth';
import {getRegionTitleByList} from 'src/utils/koreaMap.util';
import BrandCalendar from 'src/components/calendar';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
  getKoreaMapDataByColor,
  updateKoreaMapDataStory,
} from 'src/utils/koreaMap.db';
import {Story} from 'src/types/story';
import {addStoryByRegionId} from 'src/utils/story.db';
import SelectPoint from 'src/components/selectPoint';

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

  const {appUser} = useAuth();
  const uid = appUser?.uid!;
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
  } = useStory(appUser?.uid!);

  // Access the client
  const queryClient = useQueryClient();

  // React-Query Query
  const {isSuccess, isError, data} = useQuery({
    queryKey: ['KoreaMapDataColor', uid],
    queryFn: () => getKoreaMapDataByColor(uid),
    enabled: !!uid,
    retry: false,
  });

  // React-Query Mutation
  const addStoryMutation = useMutation({
    mutationFn: (data: Story) => addStoryByRegionId(data),
  });
  const updateMapMutation = useMutation({
    mutationFn: ({uid, id, count}: {uid: string; id: string; count: number}) =>
      updateKoreaMapDataStory(uid, id, count),
  });

  // Set title to region ID
  useEffect(() => {
    if (route.params?.regionId) {
      const region = route.params.regionId;
      setRegionId(region);
      setRegionTitle(getRegionTitleByList(region));
    }
  }, [route.params]);

  // BottomSheet opens when date is selected
  const onPressDate = () => {
    Keyboard.dismiss();
    handlePresentPress();
  };

  // Navigate to region selection page
  const onPressRegion = () => {
    if (isSuccess) {
      navigation.navigate('SelectRegion', {
        regionList: data.all,
        regionMainList: data.main,
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
      if (isSuccess) {
        const newStory = settingStoryData(false);
        await addStoryMutation.mutateAsync(newStory);
        await updateMapMutation.mutateAsync({
          uid: uid,
          id: regionId,
          count: 1,
        });

        await queryClient.invalidateQueries({queryKey: ['story']});
        await queryClient.invalidateQueries({queryKey: ['koreaMapData', uid]});
        await queryClient.invalidateQueries({
          queryKey: ['storyRegionList', uid],
        });

        onAddStorySuccess();
      }
    } catch (error) {
      console.log('에러', error);
      onAddStoryError(error);
    }
  };

  const onAddStorySuccess = () => {
    const text = `스토리를 작성했습니다.`;

    showBottomToast('success', text);
    navigation.navigate('Main', {screen: 'Story'});
  };

  const onAddStoryError = (error: any) => {
    showBottomToast('error', '스토리 저장에 실패했습니다.');
  };

  return (
    <SafeAreaView
      className="flex-1 justify-center items-center bg-white p-6"
      edges={['top', 'bottom', 'left', 'right']}>
      {isError && <></>}
      {isSuccess && (
        <React.Fragment>
          {data.main.length >= 1 ? (
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
                <Pressable className="w-full" onPress={onPressDate}>
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
                    point === 0
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
                  color={customColor.outline}
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
