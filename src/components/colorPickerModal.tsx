import {useState} from 'react';
import {Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';
import {returnedResults} from 'reanimated-color-picker';
import CustomColorPannel from 'src/components/colorPannel';
import CustomColorSwatch from 'src/components/colorSwatch';
import useButton from 'src/hook/useButton';
import useKoreaMapMutation from 'src/hook/useKoreaMapMutation';
import {customStyle} from 'src/style/customStyle';
import {KoreaRegionData} from 'src/types/koreaMap';
import {getTextColorByBackgroundColor} from 'src/utils/getTextColorByBackgroundColor';
import {getRegionTitle} from 'src/utils/koreaMap.util';
import {showBottomToast} from 'src/utils/showToast';

interface ColorPickerModal {
  regionData: KoreaRegionData;
  hideModal: () => void;
  handleClosePress: () => void;
}

const ColorPickerModal = ({
  regionData,
  hideModal,
  handleClosePress,
}: ColorPickerModal) => {
  const {isDisabled, disabledButton, abledButton} = useButton();
  const {updateMapByColorMutation} = useKoreaMapMutation();

  const [mode, setMode] = useState<boolean>(false);
  const [hex, setHex] = useState<string>(
    regionData.type === 'color' ? regionData.background : '#ffffff',
  );

  // Change ColorPicker mode(swatch <=> pannel)
  const onChangeMode = () => {
    setMode(!mode);
  };

  // Select Color
  const onColorSelect = (color: returnedResults) => {
    setHex(color.hex);
  };

  // Color the map with hex
  const onSettingColor = async () => {
    try {
      disabledButton();
      await updateMapByColorMutation.mutateAsync({
        data: regionData,
        color: hex,
      });

      abledButton();
      hideModal();
      handleClosePress();
      showBottomToast('success', `${getRegionTitle(regionData)} 색칠 완료!`);
    } catch (error) {
      abledButton();
      return;
    }
  };

  return (
    <View>
      <Text className="text-lg mb-4">색상 선택</Text>
      {mode ? (
        <CustomColorPannel
          value={
            regionData.type === 'color' ? regionData.background : '#ffffff'
          }
          onChange={onColorSelect}
        />
      ) : (
        <CustomColorSwatch
          value={
            regionData.type === 'color' ? regionData.background : '#ffffff'
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
                regionData.type === 'color' ? regionData.background : '#ffffff',
              color: getTextColorByBackgroundColor(
                regionData.type === 'color' ? regionData.background : '#ffffff',
              ),
            }).colorPickerPreview
          }>
          {regionData.type === 'color' ? regionData.background : '#ffffff'}
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
        <Pressable onPress={onChangeMode} disabled={isDisabled}>
          <Text className="text-brandMain">
            {mode ? '기본 색상' : '더 많은 색상'}
          </Text>
        </Pressable>
        <Pressable onPress={onSettingColor} disabled={isDisabled}>
          <Text className="text-brandMain">색칠하기</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default ColorPickerModal;
