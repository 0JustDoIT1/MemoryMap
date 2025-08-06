import {Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';
import {getRegionMainTitleById} from 'src/utils/koreaMap.util';

interface IStoryFilterItem {
  item: string;
  onSelect: (value: string) => void;
}

const StoryFilterItem = ({item, onSelect}: IStoryFilterItem) => (
  <View className="w-full bg-white rounded-md my-1 border">
    <Pressable
      className="flex-row justify-between items-center p-4"
      onPress={() => onSelect(item)}>
      <Text>{getRegionMainTitleById(item)}</Text>
    </Pressable>
  </View>
);

export default StoryFilterItem;
