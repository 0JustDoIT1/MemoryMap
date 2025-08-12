import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {IStat} from 'src/types/dashboard';

const DashboardCard = ({title, value, region, others, unit}: IStat) => (
  <View className="flex justify-start items-start w-full p-4 my-2 rounded-lg bg-white shadow-md shadow-black">
    <View className="flex-row items-end">
      <Text className="text-base text-brandMain">{title}</Text>
      {value > 0 && (
        <Text className="text-base text-gray-500">
          &nbsp;({value}
          {unit})
        </Text>
      )}
    </View>
    <View className="flex-row items-end mt-4">
      <Text className="text-2xl text-gray-500">{region}</Text>

      {others > 0 && (
        <View className="flex-row items-end">
          <Text className="text-sm leading-7 text-gray-500 ml-1">
            외
            <Text className="text-lg leading-7 text-gray-500 ml-2">
              &nbsp;{others}&nbsp;
            </Text>
            지역
          </Text>
        </View>
      )}
    </View>
  </View>
);

export default DashboardCard;
