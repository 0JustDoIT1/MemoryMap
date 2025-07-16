import React, {useRef} from 'react';
import {Image, Pressable, ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {storyPoint} from 'src/constants/point';
import {customStyle} from 'src/style/customStyle';
import {ViewStoryProps} from 'src/types/stack';
import {dateToFormatString} from 'src/utils/dateFormat';
import useDialog from 'src/hook/useDialog';
import ViewShot from 'react-native-view-shot';
import {onCaptureAndSave, onCaptureAndShare} from 'src/utils/screenshot';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomAlert from 'src/components/alert/alert';
import {getRegionTitleById} from 'src/utils/koreaMap.util';
import useButton from 'src/hook/useButton';
import useStoryView from 'src/hook/useStoryView';
import useBackButton from 'src/hook/useBackButton';

const ViewStoryScreen = ({navigation, route}: ViewStoryProps) => {
  const viewShotRef = useRef<ViewShot>(null);

  const storyId = route.params.storyId;

  const {visibleDialog, showDialog, hideDialog} = useDialog();
  const {isDisabled, disabledButton, abledButton} = useButton();

  const {
    isSuccess,
    isLoading,
    isError,
    data,
    deleteStoryMutation,
    updateMapMutation,
  } = useStoryView(storyId);

  useBackButton(() => navigation.goBack());

  // 스토리 제거
  const onDeleteStory = async () => {
    try {
      if (isSuccess) {
        disabledButton();
        await deleteStoryMutation.mutateAsync(data.id);
        await updateMapMutation.mutateAsync({
          id: data.regionId,
          count: -1,
        });

        abledButton();
        navigation.goBack();
      }
    } catch (error) {
      abledButton();
      return;
    }
  };

  return (
    <SafeAreaView
      className="flex-1 justify-start items-center bg-white p-6"
      edges={['top', 'bottom', 'left', 'right']}>
      {isError && <></>}
      {isLoading && <></>}
      {isSuccess && (
        <View className="w-full h-[90%]">
          <ViewShot
            ref={viewShotRef}
            style={customStyle().storyViewShot}
            options={{fileName: 'MemoryMap', format: 'jpg', quality: 1}}>
            <View
              className="w-full h-1/5 flex justify-center items-center p-4 border border-b-0 border-gray-400 rounded-t-lg"
              style={
                customStyle({
                  bgColor: storyPoint[data.point].color,
                }).storyPointView
              }>
              <Text className="text-xl text-white">
                {getRegionTitleById(data.regionId)}
              </Text>
              <Text className="text-sm text-white mt-1">{`${dateToFormatString(
                data.startDate,
                'YYYY.MM.DD (ddd)',
              )} ~ ${dateToFormatString(
                data.endDate,
                'YYYY.MM.DD (ddd)',
              )}`}</Text>
            </View>
            <View className="w-full h-4/5 flex items-center border border-t-0 border-gray-400 rounded-b-lg">
              <ScrollView showsVerticalScrollIndicator={false}>
                <View className="flex items-center mt-8 mx-4">
                  <View className="w-[180px] h-[180px] bg-white rounded-full">
                    <Image
                      style={{width: 180, height: 180}}
                      source={storyPoint[data.point].image}
                    />
                  </View>
                </View>

                <View className="flex items-center my-8 mx-4">
                  <Text className="text-lg">{data.title}</Text>
                  <Text className="text-center text-gray-500 mt-2 leading-6">
                    {data.contents}
                  </Text>
                </View>
              </ScrollView>
            </View>
          </ViewShot>

          <View className="w-full flex-row justify-end items-center mt-2">
            <Pressable
              className="ml-4"
              onPress={() =>
                navigation.navigate('EditStory', {
                  story: data,
                })
              }>
              <MaterialCommunityIcons
                name="square-edit-outline"
                size={25}
                color="#000000"
              />
            </Pressable>
            <Pressable
              className="ml-4"
              onPress={() => onCaptureAndSave(viewShotRef)}>
              <MaterialCommunityIcons
                name="file-download-outline"
                size={25}
                color="#000000"
              />
            </Pressable>
            <Pressable
              className="ml-4"
              onPress={() =>
                onCaptureAndShare(
                  viewShotRef,
                  `${getRegionTitleById(data.regionId)} 여행 스토리`,
                )
              }>
              <MaterialCommunityIcons
                name="share-variant"
                size={23}
                color="#000000"
              />
            </Pressable>
            <Pressable className="ml-4" onPress={showDialog}>
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={25}
                color="#000000"
              />
            </Pressable>
          </View>
        </View>
      )}

      <CustomAlert
        visible={visibleDialog}
        title="스토리를 삭제하시겠습니까?"
        buttonText="삭제"
        isDisabled={isDisabled}
        buttonOnPress={onDeleteStory}
        hideAlert={hideDialog}
      />
    </SafeAreaView>
  );
};

export default ViewStoryScreen;
