import React, {useEffect, useMemo, useState} from 'react';
import {Keyboard, Pressable, View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import useKoreaMap from 'src/hook/useKoreaMap';
import {useAppTheme} from 'src/style/paperTheme';
import {EditStoryProps} from 'src/types/stack';
import useCustomBottomSheet from 'src/hook/useBottomSheet';
import CustomBottomSheet from 'src/components/bottomSheet';
import MemoizedCalendar from 'src/components/calendar';
import {BrandDynamicButton} from 'src/components/button';
import {dateToFormatString} from 'src/utils/dateFormat';
import Animated, {useAnimatedStyle, withSpring} from 'react-native-reanimated';
import {storyPointEmojiArray} from 'src/constants/storyPoint';
import {customStyle} from 'src/style/customStyle';
import {_setDoc} from 'src/utils/firestore';
import {showBottomToast} from 'src/utils/showToast';
import useStory from 'src/hook/useStory';
import NotFound from 'src/components/notFound';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Story} from 'src/types/story';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const EditStory = ({navigation, route}: EditStoryProps) => {
  const theme = useAppTheme();

  const {koreaMapData, getColorRegionList} = useKoreaMap();
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
    updateStory,
  } = useStory();

  const regionMain = useMemo(
    () => Object.keys(getColorRegionList()),
    [koreaMapData],
  );

  const [edit, setEdit] = useState<boolean>(false);
  const [id, setId] = useState<string>('');

  // 지역 id에 맞게 title 설정
  useEffect(() => {
    if (route.params.id) {
      const region = route.params.id;
      setRegionId(region);
      setRegionTitle(
        koreaMapData[region].value[koreaMapData[region].value.length - 1],
      );
    }

    if (route.params.story) {
      const story: Story = JSON.parse(route.params.story);
      setId(story._id);
      setRegionId(story.regionId);
      setRegionTitle(
        koreaMapData[story.regionId].value[
          koreaMapData[story.regionId].value.length - 1
        ],
      );
      setTitle(story.title);
      setContents(story.contents);
      setSelectedStartDate(story.startDate);
      setSelectedEndDate(story.endDate);
      setPoint(story.point);
      setEdit(true);
    }
  }, [route.params.id, route.params.story]);

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

  // 날짜 선택 시 bottomSheet open
  const onPressDate = () => {
    Keyboard.dismiss();
    handlePresentModalPress({
      contents: (
        <MemoizedCalendar
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
          onDatePicker={onDatePicker}
          close={handleClosePress}
        />
      ),
      snap: '70%',
    });
  };

  // 점수 선택에 따라 크기 변화
  const animatedStyle = (num: number) =>
    useAnimatedStyle(() => {
      return {
        transform: [{scale: num === point ? withSpring(1.3) : withSpring(1)}],
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

  // 스토리 저장 및 수정
  const onUpdateStory = async () => {
    await updateStory(edit, id)
      .then(() => onUpdateStorySuccess())
      .catch(error => onUpdateStoryError(error));
  };

  const onUpdateStorySuccess = () => {
    navigation.navigate('Story');
    showBottomToast('success', '스토리 추가!');
  };

  const onUpdateStoryError = (error: any) => {
    showBottomToast('error', '스토리 저장에 실패했습니다.');
  };

  return (
    <SafeAreaView className="flex-1 justify-start items-center w-screen h-screen bg-white p-6">
      {regionMain.length >= 1 ? (
        <React.Fragment>
          <Pressable className="w-full" onPress={onPressRegion} disabled={edit}>
            <TextInput
              className={`w-full ${edit ? 'bg-gray-300' : 'bg-white'}`}
              mode="outlined"
              label={edit ? '' : '지역을 선택해 주세요.'}
              activeOutlineColor={theme.colors.brandMain}
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
                activeOutlineColor={theme.colors.brandMain}
                editable={false}
                value={dateToFormatString(selectedStartDate, 'YYYY.MM.DD')}
              />
            </Pressable>
            <Pressable className="w-[49%]" onPress={onPressDate}>
              <TextInput
                className="w-full bg-white"
                mode="outlined"
                label="To"
                activeOutlineColor={theme.colors.brandMain}
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
              activeOutlineColor={theme.colors.brandMain}
              value={title}
              maxLength={10}
              onChangeText={setTitle}
            />
            <TextInput
              className="w-full bg-white h-40 mt-2"
              mode="outlined"
              label="내용"
              placeholder="(100자)"
              activeOutlineColor={theme.colors.brandMain}
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
              color={theme.colors.outline}
            />
          }
          title="색칠된 지역이 없습니다."
          description="지도에서 색칠한 후에 스토리를 작성해 주세요."
          onPress={() => navigation.navigate('Map')}
        />
      )}
      <View className="mt-8">
        <Text className="text-md ml-2">여행은 즐거우셨나요?</Text>
        <View className="w-full mt-4 flex-row justify-between items-center">
          {storyPointEmojiArray.map(item => {
            return (
              <AnimatedPressable
                key={item.point}
                className="flex items-center"
                style={animatedStyle(item.point)}
                onPress={() => {
                  Keyboard.dismiss();
                  setPoint(item.point);
                }}>
                {/* <MaterialCommunityIcons
                  name={point === item.point ? item.icon : iconOutlined}
                  size={55}
                  color={item.color}
                  style={customStyle({color: item.color}).storyPointIcon}
                /> */}
                <Text className="text-5xl pt-2">{item.icon[0]}</Text>
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

export default EditStory;
