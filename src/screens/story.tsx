import React from 'react';
import {FlatList, Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import NotFound from 'src/components/view/notFound';
import {customStyle} from 'src/style/customStyle';
import {StoryProps} from 'src/types/stack';
import {customColor} from 'src/style/customColor';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomModal from 'src/components/modal/modal';
import useModal from 'src/hook/useModal';
import {getRegionMainTitleById} from 'src/utils/koreaMap.util';
import useStoryQuery from 'src/hook/useStoryQuery';
import StoryCard from 'src/components/view/storyCard';
import useExitApp from 'src/hook/useExitApp';

const StoryScreen = ({navigation}: StoryProps) => {
  const {visible, showModal, hideModal} = useModal();
  const {
    initPagination,
    pagination,
    setPagination,
    isStorySuccess,
    isStoryLoading,
    isStoryError,
    storyData,
    isListSuccess,
    isListLoading,
    isListError,
    listData,
    onLoadMoreStory,
  } = useStoryQuery();
  useExitApp();

  // Story data sorting
  const onPressOrderBy = () => {
    if (!storyData || storyData.pages[0].totalCount === 0) return;
    setPagination({
      ...initPagination,
      filter: pagination.filter,
      order: pagination.order,
      sort: pagination.sort === 'ASC' ? 'DESC' : 'ASC',
    });
  };

  // Press filter button
  const onPressFilter = () => {
    if (!storyData || storyData.pages[0].totalCount === 0) return;
    showModal();
  };

  // Story data filtering
  const onSelectFilter = (value: string) => {
    hideModal();
    setPagination({
      ...pagination,
      filter: value,
      order: pagination.order,
      sort: pagination.sort,
    });
  };

  return (
    <SafeAreaView
      className="flex-1 justify-center items-center bg-white pb-6 px-6"
      edges={['bottom', 'left', 'right']}>
      {(isStoryError || isListError) && <></>}
      {(isStoryLoading || isListLoading) && <></>}
      {isStorySuccess && isListSuccess && (
        <View className="w-full h-full">
          <View className="w-full h-[8%] flex-row justify-between items-center">
            <View className="flex-row">
              <Pressable
                className="flex-row justify-between items-center p-2 mr-2 border border-brandMain rounded-md"
                onPress={onPressFilter}>
                <Text className="text-sm text-brandMain mx-1">필터</Text>
                <MaterialCommunityIcons
                  name="filter-outline"
                  size={15}
                  color={customColor.brandMain}
                />
              </Pressable>
              <Pressable
                className="flex-row justify-between items-center p-2 mr-2 border border-brandMain rounded-md"
                onPress={onPressOrderBy}>
                <Text className="text-sm text-brandMain mx-1">
                  {pagination.sort === 'DESC' ? '최신순' : '날짜순'}
                </Text>
                <MaterialCommunityIcons
                  name="filter-variant"
                  size={15}
                  color={customColor.brandMain}
                />
              </Pressable>
            </View>
            <View className="flex-row">
              <Pressable
                className="flex-row justify-between items-center p-2 bg-brandLight rounded-md"
                onPress={() => {
                  if (pagination.filter !== '') onSelectFilter('');
                }}>
                <Text className="text-sm text-white mx-1">
                  {pagination.filter === ''
                    ? '전체'
                    : getRegionMainTitleById(pagination.filter)}
                </Text>
                {pagination.filter !== '' && (
                  <MaterialCommunityIcons
                    name="window-close"
                    size={15}
                    color={customColor.white}
                  />
                )}
              </Pressable>
            </View>
          </View>
          {storyData && storyData.pages[0].totalCount >= 1 ? (
            <FlatList
              className="w-full h-[90%] mt-1"
              contentContainerStyle={customStyle().storyFlatListContainer}
              data={storyData?.pages.map(page => page.doc).flat()}
              keyExtractor={item => item.createdAt}
              onEndReached={onLoadMoreStory}
              onEndReachedThreshold={0.7}
              renderItem={({item}) => StoryCard(item, navigation)}
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <View className="w-full h-[90%]">
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
          )}
        </View>
      )}
      {isListSuccess && (
        <CustomModal
          visible={visible}
          hideModal={hideModal}
          contents={
            <View className="w-56 max-h-full">
              <FlatList
                data={listData}
                keyExtractor={item => item}
                renderItem={({item}) => (
                  <View className="w-full bg-white rounded-md my-1 border">
                    <Pressable
                      className="flex-row justify-between items-center p-4"
                      onPress={() => onSelectFilter(item)}>
                      <Text>{getRegionMainTitleById(item)}</Text>
                    </Pressable>
                  </View>
                )}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default StoryScreen;
