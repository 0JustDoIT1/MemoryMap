import {useMemo, useRef} from 'react';
import {Image, Pressable, ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {storyPoint} from 'src/constants/storyPoint';
import useKoreaMap from 'src/hook/useKoreaMap';
import {customStyle} from 'src/style/customStyle';
import {ViewStoryProps} from 'src/types/stack';
import {dateToFormatString, timestampToDate} from 'src/utils/dateFormat';
import {StoryData} from 'src/types/story';
import MemoizedCustomAlert from 'src/components/alert';
import useDialog from 'src/hook/useDialog';
import useStory from 'src/hook/useStory';
import {showBottomToast} from 'src/utils/showToast';
import ViewShot from 'react-native-view-shot';
import {onCaptureMap} from 'src/utils/screenshot';
import {getRegionTitleById} from 'src/utils/koreaMap';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useRegionCount from 'src/hook/useRegionCount';

const ViewStoryScreen = ({navigation, route}: ViewStoryProps) => {
  const viewShotRef = useRef<ViewShot>(null);

  const {koreaMapData, updateKoreaMapDataStory} = useKoreaMap();
  const {deleteStoryById, getStoryById} = useStory();
  const {updateRegionCountById} = useRegionCount();
  const {visibleDialog, showDialog, hideDialog} = useDialog();

  const story = useMemo<StoryData>(
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

  const point = storyPoint[story.point];

  // 스토리 제거
  const onDeleteStory = async () => {
    try {
      await deleteStoryById(story._id);
      await updateKoreaMapDataStory(story.regionId, -1);
      await updateRegionCountById(story.regionId, 'story', -1);

      onDeleteStorySuccess();
    } catch (error) {
      onDeleteStoryError(error);
    }
  };

  const onDeleteStorySuccess = () => {
    navigation.goBack();
    showBottomToast('info', '해당 스토리를 삭제했습니다.');
  };

  const onDeleteStoryError = (error: any) => {
    showBottomToast('error', '스토리 삭제에 실패했습니다.');
  };

  return (
    <SafeAreaView
      className="flex-1 justify-start items-center bg-white p-6"
      edges={['top', 'bottom', 'left', 'right']}>
      <View className="w-full h-[90%]">
        <ViewShot
          ref={viewShotRef}
          style={customStyle().storyViewShot}
          options={{fileName: 'MemoryMap', format: 'jpg', quality: 1}}>
          <View
            className="w-full h-1/5 flex justify-center items-center p-4 border border-b-0 border-gray-400 rounded-t-lg"
            style={
              customStyle({
                bgColor: point.color,
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
                <View className="w-[180px] h-[180px] bg-white rounded-full">
                  <Image
                    style={{width: 180, height: 180}}
                    source={point.image}
                  />
                </View>
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
                storyId: story._id,
              })
            }>
            <MaterialCommunityIcons
              name="square-edit-outline"
              size={25}
              color="#000000"
            />
          </Pressable>
          <Pressable className="mx-2" onPress={showDialog}>
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={25}
              color="#000000"
            />
          </Pressable>
          <Pressable className="ml-2" onPress={() => onCaptureMap(viewShotRef)}>
            <MaterialCommunityIcons
              name="file-download-outline"
              size={25}
              color="#000000"
            />
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
