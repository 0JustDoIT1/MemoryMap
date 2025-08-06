import {Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {customColor} from 'src/style/customColor';
import {IPagination} from 'src/types/story';
import {getRegionMainTitleById} from 'src/utils/koreaMap.util';

interface IStoryHeader {
  pagination: IPagination;
  isStoryEmpty: boolean;
  onToggleSort: () => void;
  onShowFilter: () => void;
  onClearFilter: () => void;
}

const StoryHeader = ({
  pagination,
  isStoryEmpty,
  onToggleSort,
  onShowFilter,
  onClearFilter,
}: IStoryHeader) => {
  return (
    <View className="h-[8%] flex-row justify-between items-center">
      <View className="flex-row">
        <Pressable
          className="flex-row justify-between items-center p-2 mr-2 border border-brandMain rounded-md"
          onPress={() => !isStoryEmpty && onShowFilter()}>
          <Text className="text-sm text-brandMain mx-1">필터</Text>
          <MaterialCommunityIcons
            name="filter-outline"
            size={15}
            color={customColor.brandMain}
          />
        </Pressable>
        <Pressable
          className="flex-row justify-between items-center p-2 mr-2 border border-brandMain rounded-md"
          onPress={() => !isStoryEmpty && onToggleSort()}>
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
          onPress={onClearFilter}>
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
  );
};

export default StoryHeader;
