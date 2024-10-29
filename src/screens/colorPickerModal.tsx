import {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {returnedResults} from 'reanimated-color-picker';
import CustomColorPannel from 'src/components/colorPannel';
import CustomColorSwatch from 'src/components/colorSwatch';
import {KoreaRegionData} from 'src/types/koreaMap';

const ColorPickerModal = ({background}: KoreaRegionData) => {
  const [more, setMore] = useState<boolean>(false);
  const [hex, setHex] = useState<string>(background);

  const onPickerColor = (color: returnedResults) => {
    setHex(color.hex);
  };
  const onSelectColor = () => {
    console.log('###', hex);
  };
  return (
    <View>
      <Text className="text-lg mb-4">색상 선택</Text>
      {more ? (
        <CustomColorPannel value={background} onComplete={onPickerColor} />
      ) : (
        <CustomColorSwatch value={background} onComplete={onPickerColor} />
      )}
      <View className="mt-4 flex-row justify-between items-center">
        <TouchableOpacity activeOpacity={0.8} onPress={() => setMore(!more)}>
          <Text className="text-brandMain">
            {more ? '기본 색상' : '더 많은 색상'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={onSelectColor}>
          <Text className="text-brandMain">선택</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ColorPickerModal;
