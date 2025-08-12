import {Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {staticStyles} from 'src/style/staticStyles';

interface IBottomSheetTitle {
  className?: string;
  title?: string;
  onPress: () => void;
}

const BottomSheetTitle = ({
  className = '',
  title = '',
  onPress,
}: IBottomSheetTitle) => {
  const viewClassName = `flex-row justify-center items-center w-full ${className}`;

  return (
    <View className={viewClassName}>
      <Text className="text-xl text-outline">{title}</Text>
      <Pressable className="absolute top-0 right-0" onPress={onPress}>
        <MaterialCommunityIcons
          name="window-close"
          size={32}
          style={staticStyles.bottomSheetIcon}
        />
      </Pressable>
    </View>
  );
};

export default BottomSheetTitle;
