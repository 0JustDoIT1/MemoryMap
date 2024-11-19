import {useMemo, useRef} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {storyPointEmoji} from 'src/constants/storyPoint';
import useKoreaMap from 'src/hook/useKoreaMap';
import {customStyle} from 'src/style/customStyle';
import {ViewStoryProps} from 'src/types/stack';
import {dateToFormatString, timestampToDate} from 'src/utils/dateFormat';
import {randomNumber} from 'src/utils/math';
import Feather from 'react-native-vector-icons/Feather';
import {Story} from 'src/types/story';
import MemoizedCustomAlert from 'src/components/alert';
import useDialog from 'src/hook/useDialog';
import useStory from 'src/hook/useStory';
import {showBottomToast} from 'src/utils/showToast';
import ViewShot from 'react-native-view-shot';
import {onCaptureMap} from 'src/utils/screenshot';
import {getRegionTitleById} from 'src/utils/koreaMap';

const ViewStoryScreen = ({navigation, route}: ViewStoryProps) => {
  const viewShotRef = useRef<ViewShot>(null);

  const {koreaMapData} = useKoreaMap();
  const {deleteStoryById, getStoryById} = useStory();
  const {visibleDialog, showDialog, hideDialog} = useDialog();

  const story = useMemo<Story>(
    () => getStoryById(route.params.storyId),
    [route.params.storyId],
  );

  const startDateString = dateToFormatString(
    timestampToDate(story.startDate),
    'YYYY.MM.DD (ddd)',
  );
  const endDateString = dateToFormatString(
    timestampToDate(story.endDate),
    'YYYY.MM.DD (ddd)',
  );

  const emoji = storyPointEmoji[story.point];

  // 스토리 제거
  const onDeleteStory = async () => {
    await deleteStoryById(story.regionId, story._id)
      .then(() => onDeleteStorySuccess())
      .catch(error => onDeleteStoryError(error));
  };

  const onDeleteStorySuccess = () => {
    navigation.goBack();
    showBottomToast('info', '스토리를 삭제했습니다.');
  };

  const onDeleteStoryError = (error: any) => {
    showBottomToast('error', '스토리 삭제에 실패했습니다.');
  };

  return (
    <SafeAreaView className="flex-1 justify-start items-center w-screen h-screen bg-white p-6">
      <View className="w-full h-[90%]">
        <ViewShot
          ref={viewShotRef}
          style={customStyle().storyViewShot}
          options={{fileName: 'MemoryMap', format: 'jpg', quality: 1}}>
          <View
            className="w-full h-1/5 flex justify-center items-center p-4 border border-b-0 border-gray-400 rounded-t-lg"
            style={
              customStyle({
                bgColor: emoji.color,
              }).storyPointView
            }>
            <Text className="text-xl text-white">
              {getRegionTitleById(koreaMapData, story.regionId)}
            </Text>
            <Text className="text-sm text-white mt-1">{`${startDateString} ~ ${endDateString}`}</Text>
          </View>
          <View className="w-full h-4/5 flex items-center border border-t-0 border-gray-400 rounded-b-lg">
            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="flex items-center mt-8 mx-4">
                <Text className="text-9xl pt-4">
                  {emoji.icon[randomNumber(0, 2)]}
                </Text>
                <Text
                  className="text-base px-5 py-1 rounded-lg"
                  style={
                    customStyle({
                      bgColor: emoji.color,
                    }).storyPointText
                  }>
                  {emoji.text}
                </Text>
              </View>

              <View className="flex items-center my-8 mx-4">
                <Text className="text-lg">{story.title}</Text>
                <Text className="text-center text-gray-500 mt-2 leading-6">
                  {story.contents}
                </Text>
              </View>
            </ScrollView>
          </View>
        </ViewShot>

        <View className="w-full flex-row justify-end items-center mt-2">
          <Pressable
            className="mx-2"
            onPress={() =>
              navigation.navigate('EditStory', {
                title: '스토리 수정',
                story: JSON.stringify(story),
              })
            }>
            <Feather name="edit" size={25} color="#000000" />
          </Pressable>
          <Pressable className="mx-2" onPress={showDialog}>
            <Feather name="trash-2" size={25} color="#000000" />
          </Pressable>
          <Pressable className="ml-2" onPress={() => onCaptureMap(viewShotRef)}>
            <Feather name="download" size={25} color="#000000" />
          </Pressable>
        </View>
      </View>

      <MemoizedCustomAlert
        visible={visibleDialog}
        title="스토리를 삭제하시겠습니까?"
        buttonText="삭제"
        buttonOnPress={onDeleteStory}
        hideAlert={hideDialog}
      />
    </SafeAreaView>
  );
};

export default ViewStoryScreen;
