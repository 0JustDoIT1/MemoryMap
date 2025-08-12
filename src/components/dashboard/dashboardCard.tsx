import {View} from 'react-native';
import {Text} from 'react-native-paper';

const DashboardCard = ({
  label,
  value,
  region,
  othersCount, // “외 N 지역”의 N
}: {
  label: string;
  value: number;
  region: string;
  othersCount: number;
}) => (
  <View className="flex justify-start items-start w-full p-4 my-2 rounded-lg bg-white shadow-md shadow-black">
    <View className="flex-row items-end">
      <Text className="text-base text-brandMain">{label}</Text>
      {value > 0 && (
        <Text className="text-base text-gray-500">&nbsp;({value}개)</Text>
      )}
    </View>
    <View className="flex-row items-end mt-4">
      <Text className="text-2xl text-gray-500">{region}</Text>

      {othersCount > 0 && (
        <View className="flex-row items-end">
          <Text className="text-sm leading-7 text-gray-500 ml-1">
            외
            <Text className="text-lg leading-7 text-gray-500 ml-2">
              &nbsp;{othersCount}&nbsp;
            </Text>
            지역
          </Text>
        </View>
      )}
    </View>
  </View>
);

export default DashboardCard;
