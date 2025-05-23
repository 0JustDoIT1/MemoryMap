import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Image, Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';
import {storyPoint} from 'src/constants/point';
import {customStyle} from 'src/style/customStyle';
import {StackParamList} from 'src/types/stack';
import {Story} from 'src/types/story';
import {dateToFormatString} from 'src/utils/dateFormat';
import {getRegionTitleById} from 'src/utils/koreaMap.util';

// Story Card
const StoryCard = (
  item: Story,
  navigation: NativeStackNavigationProp<StackParamList, 'Story', undefined>,
) => {
  const title = getRegionTitleById(item.regionId);
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

export default StoryCard;
