import React, {useEffect, useMemo, useState} from 'react';
import {Keyboard, Pressable, View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import useKoreaMap from 'src/hook/useKoreaMap';
import {useAppTheme} from 'src/style/paperTheme';
import {AddStoryProps} from 'src/types/stack';
import useCustomBottomSheet from 'src/hook/useBottomSheet';
import CustomBottomSheet from 'src/components/bottomSheet';
import BrandCalendar from 'src/components/calendar';
import {BrandDynamicButton} from 'src/components/button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRecoilState} from 'recoil';
import {storyState} from 'src/recoil/atom';
import {Story} from 'src/types/story';
import {DateType} from 'react-native-ui-datepicker';
import {dateToFormatString} from 'src/utils/dateFormat';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {storyPointIcon} from 'src/constants/storyPoint';
import {customStyle} from 'src/style/customStyle';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const AddStory = ({navigation, route}: AddStoryProps) => {
  const theme = useAppTheme();

  const [story, setStory] = useRecoilState(storyState);

  const {koreaMapData, getColorRegionList} = useKoreaMap();

  const regionMain = useMemo(
    () => Object.keys(getColorRegionList()),
    [koreaMapData],
  );

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

  const [regionId, setRegionId] = useState<string>('');
  const [regionTitle, setRegionTitle] = useState<string>('');

  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');
  const [selectedStartDate, selectedSetStartDate] = useState<DateType>(null);
  const [selectedEndDate, selectedSetEndDate] = useState<DateType>(null);
  const [point, setPoint] = useState<number>(0);

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  // 날짜 선택 시 bottomSheet open
  const onPressDate = () => {
    Keyboard.dismiss();
    handlePresentModalPress({
      contents: (
        <BrandCalendar
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
    });

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
  const onSaveStory = () => {
    if (
      regionId === '' ||
      !selectedStartDate ||
      !selectedEndDate ||
      title === '' ||
      contents === '' ||
      point === 0
    )
      return false;

    const storyData: Story = {
      id: regionId,
      startDate: selectedStartDate as Date,
      endDate: selectedEndDate as Date,
      title: title,
      contents: contents,
      point: point,
      createdAt: new Date(),
    };

    setStory([...story!, storyData]);
  };

  console.log('###', story);

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
              activeOutlineColor={theme.colors.brandMain}
              multiline={true}
              value={contents}
              onChangeText={setContents}
            />
          </View>
        </React.Fragment>
      ) : (
        <View className="w-full h-full flex justify-center items-center">
          <Text>색칠된 지역이 없습니다.</Text>
        </View>
      )}
      <View className="mt-8">
        <Text className="text-md ml-2">여행은 즐거우셨나요?</Text>
        <View className="w-full mt-2 flex-row justify-between items-center">
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
            selectedStartDate === '' ||
            selectedEndDate === '' ||
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
