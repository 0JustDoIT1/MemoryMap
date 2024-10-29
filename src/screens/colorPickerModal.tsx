import {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import ColorPicker, {
  Preview,
  PreviewText,
  returnedResults,
  Swatches,
} from 'reanimated-color-picker';
import CustomColorPicker from 'src/components/colorPicker';

const ColorPickerModal = () => {
  const [more, setMore] = useState<boolean>(false);
  const [hex, setHex] = useState<string>('#ff0000');
  const onPickerColor = (colors: returnedResults) => {
    console.log('###', colors.hex);
    setHex(colors.hex);
  };

  const onSelectColor = () => {};

  return (
    <View>
      <Text className="text-lg mb-4">색상 선택</Text>
      {more ? (
        <CustomColorPicker value="red" onComplete={onPickerColor} />
      ) : (
        <ColorPicker value="red" onComplete={onPickerColor}>
          <Swatches />
          <Preview style={{marginTop: 20}} colorFormat="hex" />
        </ColorPicker>
      )}
      <View className="mt-4 flex-row justify-between items-center">
        <TouchableOpacity onPress={() => setMore(!more)}>
          <Text className="text-brandMain">다른 색상</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSelectColor}>
          <Text className="text-brandMain">선택</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ColorPickerModal;
