import React, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import NotFound from 'src/components/notFound';
import {storyPoint} from 'src/constants/storyPoint';
import useKoreaMap from 'src/hook/useKoreaMap';
import useStory from 'src/hook/useStory';
import {customStyle} from 'src/style/customStyle';
import {StoryProps} from 'src/types/stack';
import {StoryData} from 'src/types/story';
import {dateToFormatString, timestampToDate} from 'src/utils/dateFormat';
import {sorting} from 'src/utils/sort';
import {customColor} from 'src/style/customColor';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomModal from 'src/components/modal';
import useModal from 'src/hook/useModal';
import MemoizedAccordion from 'src/components/accordion';
import {getRegionTitleById} from 'src/utils/koreaMap';
import CustomActivityIndicator from 'src/components/activityIndicator';

const StoryScreen = ({navigation}: StoryProps) => {
  const {story} = useStory();
  const {koreaMapData, regionList, regionMain} = useKoreaMap();
  const {visible, showModal, hideModal} = useModal();

  const limit = 10;
  const [storyList, setStoryList] = useState<StoryData[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [filter, setFilter] = useState<string>('');
  const [sort, setSort] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Refresh List when focus screen
  useEffect(() => {
    const focusScreen = navigation.addListener('focus', () => {
      onRefreshList();
    });
    return focusScreen;
  }, [navigation]);

  // Setting All Story List By Filter
  const settingAllStoryList = () => {
    if (story) {
      let newArr: StoryData[];
      const storyArr = Object.values(story);

      if (filter === '') newArr = storyArr;
      else newArr = storyArr.filter(item => item.regionId === filter);

      newArr = newArr.sort((a, b) => sorting(a, b, sort, 'createdAt'));

      setStoryList(storyList.concat(newArr!.splice(index, index + limit)));
      setIndex(index + limit);
    } else {
      setStoryList([]);
    }
    setRefreshing(false);
  };

  // Init Story List Setting
  useEffect(() => {
    if (index === 0 && storyList.length === 0 && isLoading) {
      settingAllStoryList();
      setIsLoading(false);
    }
  }, [index, storyList, isLoading]);

  // 리스트 옵션 초기화
  const onRefreshList = () => {
    setIndex(0);
    setStoryList([]);
    setIsLoading(true);
    setRefreshing(true);
  };

  // 필터 버튼 클릭
  const onPressFilter = () => {
    if (!story || JSON.stringify(story) === '{}') return;
    showModal();
  };

  // 리스트 정렬
  const onSortList = () => {
    if (!story || JSON.stringify(story) === '{}') return;
    setSort(sort * -1);
    onRefreshList();
  };

  // 리스트 필터에서 지역선택
  const onSelectFilter = (value: string) => {
    hideModal();
    setFilter(value);
    onRefreshList();
  };

  // Redering Component
  const renderItem = (item: StoryData) => {
    const startDateString = dateToFormatString(
      timestampToDate(item.startDate),
      'YYYY.MM.DD (ddd)',
    );
    const endDateString = dateToFormatString(
      timestampToDate(item.endDate),
      'YYYY.MM.DD (ddd)',
    );

    const point = storyPoint[item.point];

    const onDetailList = () => {
      navigation.navigate('ViewStory', {storyId: item._id});
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
            <Text className="text-white">
              {getRegionTitleById(koreaMapData, item.regionId)}
            </Text>
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
    <SafeAreaView className="flex-1 justify-center items-center w-screen h-screen bg-white p-4">
      {isLoading ? (
        <CustomActivityIndicator />
      ) : (
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
                onPress={onSortList}>
                <Text className="text-sm text-brandMain mx-1">
                  {sort === -1 ? '최신순' : '날짜순'}
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
                  if (filter !== '') onSelectFilter('');
                }}>
                <Text className="text-sm text-white mx-1">
                  {filter === ''
                    ? '전체'
                    : getRegionTitleById(koreaMapData, filter)}
                </Text>
                {filter !== '' && (
                  <MaterialCommunityIcons
                    name="window-close"
                    size={15}
                    color={customColor.white}
                  />
                )}
              </Pressable>
            </View>
          </View>
          {storyList.length >= 1 ? (
            <FlatList
              className="w-full h-[90%]"
              contentContainerStyle={customStyle().storyFlatListContainer}
              data={storyList}
              keyExtractor={item => item.createdAt?.toString()!}
              onEndReached={settingAllStoryList}
              onEndReachedThreshold={0.5}
              renderItem={({item}) => renderItem(item)}
              refreshing={refreshing}
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

      <CustomModal
        visible={visible}
        hideModal={hideModal}
        contents={
          <View className="w-56 max-h-full">
            <FlatList
              data={regionMain}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <MemoizedAccordion
                  title={item}
                  item={regionList}
                  onSelect={onSelectFilter}
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
