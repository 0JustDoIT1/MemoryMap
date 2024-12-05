import React, {useState} from 'react';
import {FlatList, Image, Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import NotFound from 'src/components/notFound';
import {storyPoint} from 'src/constants/point';
import {customStyle} from 'src/style/customStyle';
import {StoryProps} from 'src/types/stack';
import {dateToFormatString} from 'src/utils/dateFormat';
import {customColor} from 'src/style/customColor';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomModal from 'src/components/modal';
import useModal from 'src/hook/useModal';
import useAuth from 'src/hook/useAuth';
import CustomAccordion from 'src/components/accordion';
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import {Story} from 'src/types/story';
import {getStoryPagination, getStoryRegionList} from 'src/utils/story.db';
import {getRegionTitleByList} from 'src/utils/koreaMap.util';
import SkeletonStory from 'src/skeleton/skeletonStory';

interface Pagination {
  limit: number;
  filter: string;
  order: string;
  sort: string;
}

const StoryScreen = ({navigation}: StoryProps) => {
  const {visible, showModal, hideModal} = useModal();
  const {appUser} = useAuth();
  const uid = appUser?.uid!;

  const initPagination = {
    limit: 10,
    filter: '',
    order: 'createdAt',
    sort: 'DESC',
  };

  const [pagination, setPagination] = useState<Pagination>(initPagination);

  // React-Query Query
  const {
    isSuccess: isStorySuccess,
    isLoading: isStoryLoading,
    isError: isStoryError,
    hasNextPage,
    fetchNextPage,
    data: storyData,
  } = useInfiniteQuery({
    queryKey: ['story', pagination],
    queryFn: ({pageParam}) => getStoryPagination(uid, pageParam, pagination),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      const nextPage = lastPage.currentPage + 1;
      return nextPage > lastPage.totalPage ? null : nextPage;
    },
    placeholderData: keepPreviousData,
  });
  const {
    isSuccess: isListSuccess,
    isLoading: isListLoading,
    isError: isListError,
    data: listData,
  } = useQuery({
    queryKey: ['story', uid],
    queryFn: () => getStoryRegionList(uid),
    enabled: !!uid,
    retry: false,
  });

  // Loading story data when flatlist reach end
  const onLoadMoreStory = () => {
    if (hasNextPage) fetchNextPage();
  };

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

  // Redering Component
  const renderItem = (item: Story) => {
    const title = getRegionTitleByList(item.regionId);
    const startDateString = dateToFormatString(
      item.startDate,
      'YYYY.MM.DD (ddd)',
    );
    const endDateString = dateToFormatString(item.endDate, 'YYYY.MM.DD (ddd)');
    const point = storyPoint[item.point];

    const onDetailList = () => {
      navigation.navigate('ViewStory', {storyId: item.id});
    };

    return (
      <Pressable onPress={onDetailList}>
        <View
          className="flex-row justify-between items-start p-3 border border-b-0 border-gray-400 rounded-t-lg shadow-sm shadow-black"
          style={
            customStyle({
              bgColor: point.color,
            }).storyPointView
          }>
          <View>
            <Text className="text-white">{title}</Text>
            <Text className="text-white text-[10px] mt-1">{`${startDateString} ~ ${endDateString}`}</Text>
          </View>
          <View className="w-[40px] h-[40px] bg-white rounded-full shadow-sm shadow-black">
            <Image style={{width: 40, height: 40}} source={point.image} />
          </View>
        </View>
        <View className="p-3 border border-t-0 border-gray-400 rounded-b-lg bg-white shadow-sm shadow-black">
          <Text className="text-black">{item.title}</Text>
          <Text className="text-gray-400 mt-2 truncate" numberOfLines={1}>
            {item.contents}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView
      className="flex-1 justify-center items-center bg-white pb-6 px-6"
      edges={['bottom', 'left', 'right']}>
      {(isStoryError || isListError) && <></>}
      {(isStoryLoading || isListLoading) && (
        <View className="w-full h-full items-start">
          <SkeletonStory />
        </View>
      )}
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
                    : getRegionTitleByList(pagination.filter)}
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
              renderItem={({item}) => renderItem(item)}
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <View className="w-full h-[90%]">
              <NotFound
                icon={
                  <MaterialCommunityIcons
                    name="file-search-outline"
                    size={90}
                    color={customColor.outline}
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
                data={listData.main}
                keyExtractor={item => item}
                renderItem={({item}) => (
                  <CustomAccordion
                    title={item}
                    item={listData.all}
                    onSelect={onSelectFilter}
                  />
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
