import {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {returnedResults} from 'reanimated-color-picker';
import {useRecoilState} from 'recoil';
import CustomColorPannel from 'src/components/colorPannel';
import CustomColorSwatch from 'src/components/colorSwatch';
import useKoreaMap from 'src/hook/useKoreaMap';
import {koreaMapDataState} from 'src/recoil/atom';
import {customStyle} from 'src/style/customStyle';
import {KoreaRegionData} from 'src/types/koreaMap';

interface ColorPickerModal {
  id: string;
  hideModal: () => void;
  closeSheet: () => void;
}

const ColorPickerModal = ({id, hideModal, closeSheet}: ColorPickerModal) => {
  const {getMapDataById} = useKoreaMap();
  const regionData = getMapDataById(id);

  const [mode, setMode] = useState<boolean>(false);
  const [hex, setHex] = useState<string>(regionData.background);

  const [koreaMapData, setKoreaMapData] = useRecoilState(koreaMapDataState);

  const onChangeMode = () => {
    setMode(!mode);
  };

  const onColorSelect = (color: returnedResults) => {
    setHex(color.hex);
  };
  const onSelectColor = () => {
    hideModal();
    closeSheet();
    const update: KoreaRegionData = {
      ...regionData,
      background: hex,
      type: 'color',
    };
    setKoreaMapData({...koreaMapData, [regionData.id]: update});
  };

  return (
    <View>
      <Text className="text-lg mb-4">색상 선택</Text>
      {mode ? (
        <CustomColorPannel
          value={regionData.background}
          onChange={onColorSelect}
        />
      ) : (
        <CustomColorSwatch
          value={regionData.background}
          onChange={onColorSelect}
        />
      )}
      <View className="flex-row border border-black mt-4">
        <Text
          className="w-1/2 text-center py-1"
          style={
            customStyle({color: regionData.background}).colorPickerPreview
          }>
          {regionData.background}
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
