import {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {returnedResults} from 'reanimated-color-picker';
import CustomColorPannel from 'src/components/colorPannel';
import CustomColorSwatch from 'src/components/colorSwatch';
import {customStyle} from 'src/style/customStyle';
import {KoreaRegionData} from 'src/types/koreaMap';

interface ColorPickerModal {
  data: KoreaRegionData;
  hideModal: () => void;
  closeSheet: () => void;
}

const ColorPickerModal = ({data, hideModal, closeSheet}: ColorPickerModal) => {
  const [mode, setMode] = useState<boolean>(false);
  const [hex, setHex] = useState<string>(data.background);

  const onChangeMode = () => {
    setMode(!mode);
  };

  const onColorSelect = (color: returnedResults) => {
    setHex(color.hex);
  };
  const onSelectColor = () => {
    hideModal();
    closeSheet();
    const update = {...data, background: hex, type: 'color'};
  };

  return (
    <View>
      <Text className="text-lg mb-4">색상 선택</Text>
      {mode ? (
        <CustomColorPannel value={data.background} onChange={onColorSelect} />
      ) : (
        <CustomColorSwatch value={data.background} onChange={onColorSelect} />
      )}
      <View className="flex-row border border-black mt-4">
        <Text
          className="w-1/2 text-center py-1"
          style={customStyle({color: data.background}).colorPickerPreview}>
          {data.background}
        </Text>
        <Text
          className="w-1/2 text-center py-1"
          style={customStyle({color: hex}).colorPickerPreview}>
          {hex}
        </Text>
      </View>

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
    </View>
  );
};
export default ColorPickerModal;
