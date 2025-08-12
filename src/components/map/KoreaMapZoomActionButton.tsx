import {Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const KoreaMapZoomActionButton = ({
  icon,
  size = 28,
  label,
  color,
  onPress,
}: {
  icon: string;
  size?: number;
  label: string;
  color: string;
  onPress: () => void;
}) => {
  return (
    <View className="flex items-center">
      <Pressable
        className="w-12 h-12 rounded-full mx-6 bg-white flex justify-center items-center"
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={label}>
        <MaterialCommunityIcons name={icon} size={size} color={color} />
      </Pressable>
      <Text className="mt-1 text-xs text-darkGray">{label}</Text>
    </View>
  );
};

export default KoreaMapZoomActionButton;
