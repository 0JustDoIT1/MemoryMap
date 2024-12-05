import {useRef} from 'react';
import {Image, Pressable, ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {storyPoint} from 'src/constants/point';
import {customStyle} from 'src/style/customStyle';
import {ViewStoryProps} from 'src/types/stack';
import {dateToFormatString} from 'src/utils/dateFormat';
import useDialog from 'src/hook/useDialog';
import {showBottomToast} from 'src/utils/showToast';
import ViewShot from 'react-native-view-shot';
import {onCaptureAndSave, onCaptureAndShare} from 'src/utils/screenshot';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useAuth from 'src/hook/useAuth';
import CustomAlert from 'src/components/alert';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {deleteStoryById, getOneStoryById} from 'src/utils/story.db';
import {updateKoreaMapDataStory} from 'src/utils/koreaMap.db';
import {getRegionTitleByList} from 'src/utils/koreaMap.util';

const ViewStoryScreen = ({navigation, route}: ViewStoryProps) => {
  const viewShotRef = useRef<ViewShot>(null);

  const {appUser} = useAuth();
  const uid = appUser?.uid!;
  const storyId = route.params.storyId;

  const {visibleDialog, showDialog, hideDialog} = useDialog();

  // Access the client
  const queryClient = useQueryClient();

  // React-Query Query
  const {isSuccess, data} = useQuery({
    queryKey: ['viewStory', storyId],
    queryFn: () => getOneStoryById(storyId),
    enabled: !!uid,
    retry: false,
  });

  // React-Query Mutation
  const deleteStoryMutation = useMutation({
    mutationFn: deleteStoryById,
  });
  const updateMapMutation = useMutation({
    mutationFn: ({uid, id, count}: {uid: string; id: string; count: number}) =>
      updateKoreaMapDataStory(uid, id, count),
  });

  // 스토리 제거
  const onDeleteStory = async () => {
    try {
      if (isSuccess) {
        await deleteStoryMutation.mutateAsync(data.id);
        await updateMapMutation.mutateAsync({
          uid: uid,
          id: data.regionId,
          count: -1,
        });

        await queryClient.invalidateQueries({queryKey: ['story']});
        await queryClient.invalidateQueries({queryKey: ['koreaMapData', uid]});
        await queryClient.invalidateQueries({
          queryKey: ['storyRegionList', uid],
        });

        onDeleteStorySuccess();
      }
    } catch (error) {
      onDeleteStoryError(error);
    }
  };

  const onDeleteStorySuccess = () => {
    showBottomToast('info', '해당 스토리를 삭제했습니다.');
    navigation.goBack();
  };

  const onDeleteStoryError = (error: any) => {
    showBottomToast('error', '스토리 삭제에 실패했습니다.');
  };

  return (
    <SafeAreaView
      className="flex-1 justify-start items-center bg-white p-6"
      edges={['top', 'bottom', 'left', 'right']}>
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
                {getRegionTitleByList(data.regionId)}
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
                  `${getRegionTitleByList(data.regionId)} 여행 스토리`,
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
        buttonOnPress={onDeleteStory}
        hideAlert={hideDialog}
      />
    </SafeAreaView>
  );
};

export default ViewStoryScreen;
