import {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import Animated, {useSharedValue} from 'react-native-reanimated';
import {returnedResults} from 'reanimated-color-picker';
import CustomColorPannel from 'src/components/colorPannel';
import CustomColorSwatch from 'src/components/colorSwatch';
import {KoreaRegionData} from 'src/types/koreaMap';

const ColorPickerModal = ({background}: KoreaRegionData) => {
  const [mode, setMode] = useState<boolean>(false);

  const selectedColor = useSharedValue(background);

  const onChangeMode = () => {
    setMode(!mode);
  };

  const onColorSelect = (color: returnedResults) => {
    'worklet';
    selectedColor.value = color.hex;
  };
  const onSelectColor = () => {};

  return (
    <Animated.View>
      <Text className="text-lg mb-4">색상 선택</Text>
      {mode ? (
        <CustomColorPannel value={background} onChange={onColorSelect} />
      ) : (
        <CustomColorSwatch value={background} onChange={onColorSelect} />
      )}
      <View className="mt-4 flex-row justify-between items-center">
        <TouchableOpacity activeOpacity={0.8} onPress={onChangeMode}>
          <Text className="text-brandMain">
            {mode ? '기본 색상' : '더 많은 색상'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={onSelectColor}>
          <Text className="text-brandMain">선택</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};
export default ColorPickerModal;
