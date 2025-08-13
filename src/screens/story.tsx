import React from 'react';
import {FlatList, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import NotFound from 'src/components/view/notFound';
import {staticStyles} from 'src/style/staticStyles';
import {TStory} from 'src/types/stack';
import {customColor} from 'src/style/customColor';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomModal from 'src/components/modal/modal';
import useModal from 'src/hook/common/useModal';
import {useStoryListQuery} from 'src/hook/story/useStoryListQuery';
import StoryCard from 'src/components/story/storyCard';
import useExitApp from 'src/hook/common/useExitApp';
import LoadingScreen from './loadingOverlay';
import StoryFilterItem from 'src/components/story/storyFilterItem';
import {useStoryRegionListQuery} from 'src/hook/story/useStoryRegionListQuery';
import {useStoryPagination} from 'src/hook/story/useStoryPagination';
import StoryHeader from 'src/components/story/storyHeader';

const StoryScreen = ({navigation}: TStory) => {
  const {pagination, toggleSort, selectFilter} = useStoryPagination();
  const {visible, showModal, hideModal} = useModal();

  const {
    data: storyData,
    isSuccess: isStorySuccess,
    isLoading: isStoryLoading,
    isError: isStoryError,
    onLoadMoreStory,
  } = useStoryListQuery(pagination);

  const {
    data: listData,
    isSuccess: isListSuccess,
    isLoading: isListLoading,
    isError: isListError,
  } = useStoryRegionListQuery();

  useExitApp();

  const isStoryEmpty = !storyData?.pages?.[0]?.totalCount;

  if (isStoryError || isListError) {
    return null;
  }

  if (isStoryLoading || isListLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView
      className="flex-1 justify-center items-center bg-white px-6"
      edges={['top', 'bottom', 'left', 'right']}>
      <View className="flex-1 w-full">
        <StoryHeader
          pagination={pagination}
          isStoryEmpty={isStoryEmpty}
          onToggleSort={toggleSort}
          onShowFilter={showModal}
          onClearFilter={() => selectFilter('')}
        />
        <FlatList
          className="flex-1"
          contentContainerStyle={staticStyles.storyFlatListContainer}
          data={storyData?.pages.map(page => page.doc).flat()}
          keyExtractor={item => item.id ?? item.createdAt}
          onEndReached={onLoadMoreStory}
          onEndReachedThreshold={0.7}
          renderItem={({item}) => (
            <StoryCard item={item} navigation={navigation} />
          )}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-10">
              <NotFound
                icon={
                  <MaterialCommunityIcons
                    name="file-search-outline"
                    size={90}
                    color={customColor.blackOpacity}
                  />
                }
                title="작성한 스토리가 없습니다."
              />
            </View>
          }
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <CustomModal
        visible={visible}
        hideModal={hideModal}
        contents={
          <View className="w-56 max-h-full">
            <FlatList
              data={listData}
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={({item}) => (
                <StoryFilterItem
                  item={item}
                  onSelect={selectFilter}
                  onClose={hideModal}
                />
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default StoryScreen;
