import {useEffect, useState} from 'react';
import {Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';
import ColorPicker, {
  HueSlider,
  Panel1,
  returnedResults,
  Swatches,
} from 'reanimated-color-picker';
import useAd from 'src/hook/useAd';
import useButton from 'src/hook/useButton';
import useKoreaMapMutation from 'src/hook/map/useKoreaMapMutation';
import {customStyle} from 'src/style/customStyle';
import {IKoreaRegionData} from 'src/types/koreaMap';
import {getTextColorByBackgroundColor} from 'src/utils/getTextColorByBackgroundColor';
import {getRegionTitle} from 'src/utils/koreaMap.util';
import {showBottomToast} from 'src/utils/showToast';
import {adShowType} from 'src/constants/app';

interface ColorPickerModal {
  regionData: IKoreaRegionData;
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
  const {load, show, isClosed, checkAdShow} = useAd();

  const [mode, setMode] = useState<boolean>(false);
  const [hex, setHex] = useState<string>(
    regionData.type === 'color' ? regionData.background : '#ffffff',
  );

  useEffect(() => {
    load();
    if (isClosed) {
      onUploadColorSuccess();
      load();
    }
  }, [load, isClosed]);

  // Change ColorPicker mode(swatch <=> pannel)
  const onChangeMode = () => {
    setMode(!mode);
  };

  // Select Color
  const onColorSelect = (color: returnedResults) => {
    setHex(color.hex);
  };

  // Color the map with hex
  const onUploadColor = async () => {
    try {
      disabledButton();
      const adShow = await checkAdShow(adShowType.map);
      if (adShow) {
        show();
        await onUploadingColor();
      } else {
        await onUploadingColor();
        onUploadColorSuccess();
      }
    } catch (error) {
      abledButton();
      return;
    }
  };

  const onUploadingColor = async () => {
    await updateMapByColorMutation.mutateAsync({
      data: regionData,
      color: hex,
    });
  };

  const onUploadColorSuccess = () => {
    abledButton();
    hideModal();
    handleClosePress();
    showBottomToast('success', `${getRegionTitle(regionData)} 색칠 완료!`);
  };

  return (
    <View>
      <Text className="text-lg mb-4">색상 선택</Text>
      {mode ? (
        <ColorPicker
          value={
            regionData.type === 'color' ? regionData.background : '#ffffff'
          }
          onChange={onColorSelect}>
          <View className="flex-row justify-between">
            <Panel1 style={{width: '85%'}} thumbSize={15} />
            <HueSlider vertical thumbShape="pill" thumbColor="#000000" />
          </View>
        </ColorPicker>
      ) : (
        <ColorPicker
          value={
            regionData.type === 'color' ? regionData.background : '#ffffff'
          }
          onChange={onColorSelect}>
          <Swatches />
        </ColorPicker>
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
        <Pressable onPress={onUploadColor} disabled={isDisabled}>
          <Text className="text-brandMain">색칠하기</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default ColorPickerModal;
