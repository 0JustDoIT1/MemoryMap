import React, {useEffect, useState} from 'react';
import {FlatList, Pressable, View} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import NotFound from 'src/components/notFound';
import {storyPointEmoji} from 'src/constants/storyPoint';
import useKoreaMap from 'src/hook/useKoreaMap';
import useStory from 'src/hook/useStory';
import {customStyle} from 'src/style/customStyle';
import {StoryProps} from 'src/types/stack';
import {Story} from 'src/types/story';
import {dateToFormatString} from 'src/utils/dateFormat';
import {sorting} from 'src/utils/sort';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppTheme} from 'src/style/paperTheme';
import {randomNumber} from 'src/utils/math';

const StoryScreen = ({navigation}: StoryProps) => {
  const theme = useAppTheme();

  const {story} = useStory();
  const {koreaMapData} = useKoreaMap();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const limit = 10;
  const [storyAll, setStoryAll] = useState<Story[]>([]);
  const [storyList, setStoryList] = useState<Story[]>([]);
  const [index, setIndex] = useState<number>(0);

  // All State Init
  useEffect(() => {
    const focusScreen = navigation.addListener('focus', () => {
      setIsLoading(true);
      setIndex(0);
      setStoryList([]);
    });
    return focusScreen;
  }, [navigation]);

  // Init List Setting
  useEffect(() => {
    if (story)
      setStoryAll(
        Object.values(story).sort((a, b) => sorting(a, b, 'createdAt')),
      );
    if (index === 0 && storyList.length === 0) {
      onAddStoryList();
      setIsLoading(false);
    }
  }, [index, storyList, story]);

  // Add Story when reached end flatlist
  const onAddStoryList = () => {
    setStoryList(storyList.concat(storyAll!.splice(index, index + limit)));
    setIndex(index + limit);
  };

  // Redering Component
  const renderItem = (item: Story) => {
    let region = koreaMapData[item.regionId].value[0];
    if (koreaMapData[item.regionId].value.length > 1)
      region += ` ${koreaMapData[item.regionId].value[1]}`;

    const startDateString = dateToFormatString(
      item.startDate,
      'YYYY.MM.DD (ddd)',
    );
    const endDateString = dateToFormatString(item.endDate, 'YYYY.MM.DD (ddd)');

    const emoji = storyPointEmoji[item.point];

    const onDetailList = () => {
      navigation.navigate('ViewStory', {story: JSON.stringify(item)});
    };

    return (
      <Pressable onPress={onDetailList}>
        <View
          className="flex-row justify-between items-start p-3 border border-b-0 border-gray-400 rounded-t-lg shadow-sm shadow-black"
          style={
            customStyle({
              bgColor: emoji.color,
            }).storyPointView
          }>
          <View>
            <Text className="text-white">{region}</Text>
            <Text className="text-white text-[10px] mt-1">{`${startDateString} ~ ${endDateString}`}</Text>
          </View>
          <Text className="text-2xl">{emoji.icon[randomNumber(0, 2)]}</Text>
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
        <ActivityIndicator animating={true} color={theme.colors.brandMain} />
      ) : storyList.length >= 1 ? (
        <FlatList
          className="w-full"
          contentContainerStyle={customStyle().storyFlatListContainer}
          data={storyList}
          keyExtractor={item => item.createdAt?.toString()!}
          onEndReached={onAddStoryList}
          onEndReachedThreshold={0.5}
          renderItem={({item}) => renderItem(item)}
        />
      ) : (
        <NotFound
          icon={
            <MaterialCommunityIcons
              name="file-search-outline"
              size={90}
              color={theme.colors.outline}
            />
          }
          title="스토리가 없습니다."
          description="지도에서 색칠한 후에 스토리를 작성해 주세요."
        />
      )}
    </SafeAreaView>
  );
};

export default StoryScreen;
