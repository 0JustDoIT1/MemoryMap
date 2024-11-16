import {useState} from 'react';
import {Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';
import {returnedResults} from 'reanimated-color-picker';
import CustomColorPannel from 'src/components/colorPannel';
import CustomColorSwatch from 'src/components/colorSwatch';
import useKoreaMap from 'src/hook/useKoreaMap';
import {customStyle} from 'src/style/customStyle';
import {getTextColorByBackgroundColor} from 'src/utils/getTextColorByBackgroundColor';
import {showBottomToast} from 'src/utils/showToast';

interface ColorPickerModal {
  id: string;
  hideModal: () => void;
  handleClosePress: () => void;
}

const ColorPickerModal = ({
  id,
  hideModal,
  handleClosePress,
}: ColorPickerModal) => {
  const {koreaMapData, getRegionTitleById, updateMapColorById} = useKoreaMap();

  const [mode, setMode] = useState<boolean>(false);
  const [hex, setHex] = useState<string>(
    koreaMapData[id].type === 'color' ? koreaMapData[id].background : '#ffffff',
  );

  const onChangeMode = () => {
    setMode(!mode);
  };

  const onColorSelect = (color: returnedResults) => {
    setHex(color.hex);
  };

  const onSettingColor = async () => {
    await updateMapColorById(id, hex)
      .then(() => onSettingColorSuccess())
      .catch(error => onSettingColorError(error));
  };

  const onSettingColorSuccess = () => {
    const text = `${getRegionTitleById(id)} 색칠 완료!`;

    showBottomToast('success', text);
    hideModal();
    handleClosePress();
  };

  const onSettingColorError = (error: any) => {
    showBottomToast('error', '색칠에 실패했습니다.');
  };

  return (
    <View>
      <Text className="text-lg mb-4">색상 선택</Text>
      {mode ? (
        <CustomColorPannel
          value={
            koreaMapData[id].type === 'color'
              ? koreaMapData[id].background
              : '#ffffff'
          }
          onChange={onColorSelect}
        />
      ) : (
        <CustomColorSwatch
          value={
            koreaMapData[id].type === 'color'
              ? koreaMapData[id].background
              : '#ffffff'
          }
          onChange={onColorSelect}
        />
      )}
      <View className="flex-row border border-black mt-4">
        <Text
          className="w-1/2 text-center py-1"
          style={
            customStyle({
              bgColor:
                koreaMapData[id].type === 'color'
                  ? koreaMapData[id].background
                  : '#ffffff',
              color: getTextColorByBackgroundColor(
                koreaMapData[id].type === 'color'
                  ? koreaMapData[id].background
                  : '#ffffff',
              ),
            }).colorPickerPreview
          }>
          {koreaMapData[id].type === 'color'
            ? koreaMapData[id].background
            : '#ffffff'}
        </Text>
        <Text
          className="w-1/2 text-center py-1"
          style={
            customStyle({
              bgColor: hex,
              color: getTextColorByBackgroundColor(hex),
            }).colorPickerPreview
          }>
          {hex}
        </Text>
      </View>

      <View className="mt-4 flex-row justify-between items-center">
        <Pressable onPress={onChangeMode}>
          <Text className="text-brandMain">
            {mode ? '기본 색상' : '더 많은 색상'}
          </Text>
        </Pressable>
        <Pressable onPress={onSettingColor}>
          <Text className="text-brandMain">색칠하기</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default ColorPickerModal;
