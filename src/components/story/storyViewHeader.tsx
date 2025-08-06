import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {customStyle} from 'src/style/customStyle';
import {dateToFormatString} from 'src/utils/dateFormat';
import {getRegionTitleById} from 'src/utils/koreaMap.util';

interface IStoryViewHeader {
  regionId: string;
  startDate: string;
  endDate: string;
  bgColor: string;
}

const StoryViewHeader = ({
  regionId,
  startDate,
  endDate,
  bgColor,
}: IStoryViewHeader) => {
  return (
    <View
      className="w-full h-1/5 flex justify-center items-center p-4 border border-b-0 border-gray-400 rounded-t-lg"
      style={customStyle({bgColor}).storyPointView}>
      <Text className="text-xl text-white">{getRegionTitleById(regionId)}</Text>
      <Text className="text-sm text-white mt-1">{`${dateToFormatString(
        startDate,
        'YYYY.MM.DD (ddd)',
      )} ~ ${dateToFormatString(endDate, 'YYYY.MM.DD (ddd)')}`}</Text>
    </View>
  );
};

export default StoryViewHeader;
