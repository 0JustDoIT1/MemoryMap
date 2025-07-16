import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ColorValue, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StackParamList} from 'src/types/stack';

interface BackButton {
  navigation: NativeStackNavigationProp<StackParamList, any, undefined>;
  color: number | ColorValue | undefined;
}

const BackButton = ({navigation, color}: BackButton) => {
  return (
    <Pressable onPress={() => navigation.goBack()}>
      <MaterialCommunityIcons name="chevron-left" size={35} color={color} />
    </Pressable>
  );
};

export default BackButton;
