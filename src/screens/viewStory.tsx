import React, {useRef} from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {storyPoint} from 'src/constants/point';
import {customStyle} from 'src/style/customStyle';
import {TViewStory} from 'src/types/stack';
import useDialog from 'src/hook/useDialog';
import ViewShot from 'react-native-view-shot';
import {onCaptureAndSave, onCaptureAndShare} from 'src/utils/screenshot';
import CustomAlert from 'src/components/alert/alert';
import {getRegionTitleById} from 'src/utils/koreaMap.util';
import useBackButton from 'src/hook/useBackButton';
import LoadingScreen from './loadingScreen';
import {useDeleteStory} from 'src/hook/story/useDeleteStory';
import {useStoryView} from 'src/hook/story/useStoryView';
import StoryViewHeader from 'src/components/story/storyViewHeader';
import StoryViewContent from 'src/components/story/storyViewContent';
import StoryViewActionBar from 'src/components/story/storyViewActionBar';

const ViewStoryScreen = ({navigation, route}: TViewStory) => {
  const viewShotRef = useRef<ViewShot>(null);

  const storyId = route.params.storyId;

  const {visibleDialog, showDialog, hideDialog} = useDialog();
  const {isSuccess, isLoading, isError, data} = useStoryView(storyId);
  const {deleteStory, isDisabled} = useDeleteStory(() => navigation.goBack());

  useBackButton(() => navigation.goBack());

  if (isError) {
    return null;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView
      className="flex-1 justify-start items-center bg-white p-6"
      edges={['top', 'bottom', 'left', 'right']}>
      <View className="w-full h-[90%]">
        <ViewShot
          ref={viewShotRef}
          style={customStyle().storyViewShot}
          options={{fileName: 'MemoryMap', format: 'jpg', quality: 1}}>
          <StoryViewHeader
            regionId={data.regionId}
            startDate={data.startDate}
            endDate={data.endDate}
            bgColor={storyPoint[data.point].color}
          />
          <StoryViewContent
            image={storyPoint[data.point].image}
            title={data.title}
            contents={data.contents}
          />
        </ViewShot>

        <StoryViewActionBar
          onEdit={() => navigation.navigate('EditStory', {story: data})}
          onSave={() => onCaptureAndSave(viewShotRef)}
          onShare={() =>
            onCaptureAndShare(
              viewShotRef,
              `${getRegionTitleById(data.regionId)} 여행 스토리`,
            )
          }
          onDelete={showDialog}
        />
      </View>

      <CustomAlert
        visible={visibleDialog}
        title="스토리를 삭제하시겠습니까?"
        buttonText="삭제"
        isDisabled={isDisabled}
        buttonOnPress={() => deleteStory(data.id, data.regionId)}
        hideAlert={hideDialog}
      />
    </SafeAreaView>
  );
};

export default ViewStoryScreen;
