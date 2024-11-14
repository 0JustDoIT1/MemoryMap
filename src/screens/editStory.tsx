import React, {useEffect, useMemo} from 'react';
import {Keyboard, Pressable, View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import useKoreaMap from 'src/hook/useKoreaMap';
import {useAppTheme} from 'src/style/paperTheme';
import {AddStoryProps} from 'src/types/stack';
import useCustomBottomSheet from 'src/hook/useBottomSheet';
import CustomBottomSheet from 'src/components/bottomSheet';
import MemoizedCalendar from 'src/components/calendar';
import {BrandContainedButton, BrandDynamicButton} from 'src/components/button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {dateToFormatString} from 'src/utils/dateFormat';
import Animated, {useAnimatedStyle, withSpring} from 'react-native-reanimated';
import {storyPointIcon} from 'src/constants/storyPoint';
import {customStyle} from 'src/style/customStyle';
import {_setCollection} from 'src/utils/firestore';
import {showBottomToast} from 'src/utils/showToast';
import useStory from 'src/hook/useStory';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AddStory = ({navigation, route}: AddStoryProps) => {
  const theme = useAppTheme();

  const {koreaMapData, getColorRegionList, onCountStory} = useKoreaMap();
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
    selectedSetStartDate,
    selectedEndDate,
    selectedSetEndDate,
    point,
    setPoint,
    onUpdateStory,
  } = useStory();

  const regionMain = useMemo(
    () => Object.keys(getColorRegionList()),
    [koreaMapData],
  );

  // 지역 id에 맞게 title 설정
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
        transform: [{scale: num === point ? withSpring(1.2) : withSpring(1)}],
        elevation: 1,
      };
    }, [point]);

  // 지역 선택 페이지로 전환
  const onPressRegion = () => {
    navigation.navigate('SelectRegion');
  };

  // 날짜 선택
  const onDatePicker = (startDate: Date, endDate: Date) => {
    selectedSetStartDate(startDate);
    selectedSetEndDate(endDate);
    handleClosePress();
  };

  // 스토리 저장
  const onSaveStory = async () => {
    await onUpdateStory()
      .then(() => onPlusCountStory())
      .catch(error => onUpdateStoryError(error));
  };

  const onUpdateStoryError = (error: any) => {
    showBottomToast('error', '스토리 저장에 실패했습니다.');
  };

  // 스토리 카운트 추가
  const onPlusCountStory = async () => {
    await onCountStory(regionId, 1)
      .then(() => onPlusCountStorySuccess())
      .catch(error => onPlusCountStoryError(error));
  };

  const onPlusCountStorySuccess = () => {
    navigation.navigate('Story');
    showBottomToast('success', '스토리 추가!');
  };

  const onPlusCountStoryError = (error: any) => {
    showBottomToast('error', '스토리 계산에 실패했습니다.');
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
              activeOutlineColor={theme.colors.brandMain}
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              className="w-full bg-white h-40 mt-2"
              mode="outlined"
              label="내용"
              placeholder="최대 200자"
              activeOutlineColor={theme.colors.brandMain}
              multiline={true}
              value={contents}
              maxLength={200}
              onChangeText={setContents}
            />
          </View>
        </React.Fragment>
      ) : (
        <View className="w-full h-full flex justify-center items-center">
          <View className="rounded-full bg-white shadow shadow-black p-4">
            <MaterialCommunityIcons
              name="map-search-outline"
              size={90}
              color={theme.colors.outline}
            />
          </View>
          <View className="mt-6">
            <Text className="text-lg text-outline text-center">
              색칠된 지역이 없습니다.
            </Text>
            <Text className="text-sm text-outline text-center">
              지도에서 색칠한 후에 스토리를 작성해 주세요.
            </Text>
          </View>
          <View className="mt-8">
            <BrandContainedButton
              text="색칠하기"
              classes="px-6 rounded-md"
              onPress={() => navigation.navigate('Map')}
            />
          </View>
        </View>
      )}
      <View className="mt-8">
        <Text className="text-md ml-2">여행은 즐거우셨나요?</Text>
        <View className="w-full mt-4 flex-row justify-between items-center">
          {storyPointIcon.map(item => {
            const iconOutlined = `${item.icon}-outline`;

            return (
              <AnimatedPressable
                key={item.point}
                className="flex items-center"
                style={animatedStyle(item.point)}
                onPress={() => {
                  Keyboard.dismiss();
                  setPoint(item.point);
                }}>
                <MaterialCommunityIcons
                  name={point === item.point ? item.icon : iconOutlined}
                  size={55}
                  color={item.color}
                />
                <Text
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
          onPress={onSaveStory}
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

export default AddStory;
