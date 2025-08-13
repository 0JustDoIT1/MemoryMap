import {Pressable, View} from 'react-native';
import {Portal, Text} from 'react-native-paper';
import ColorPicker, {
  HueSlider,
  Panel1,
  Swatches,
} from 'reanimated-color-picker';
import {IKoreaRegionData} from 'src/types/koreaMap';
import LoadingOverlay from 'src/screens/loadingOverlay';
import {useRegionColorPicker} from 'src/hook/mapSheet/useRegionColorPicker';
import {useRegionColorUpload} from 'src/hook/mapSheet/useRegionColorUpload';

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
  // 색상/모드 상태 훅
  const {
    mode,
    hex,
    initialHex,
    prevLeftStyle,
    prevRightStyle,
    onChangeMode,
    onColorSelect,
  } = useRegionColorPicker(regionData);

  // 업로드 훅
  const {isDisabled, onLoading, onUploadColor} = useRegionColorUpload({
    regionData,
    hex,
    hideModal,
    handleClosePress,
  });

  return (
    <>
      <Text className="text-lg mb-4">색상 선택</Text>
      {mode ? (
        <ColorPicker value={initialHex} onChange={onColorSelect}>
          <View className="flex-row justify-between">
            <Panel1 style={{width: '85%'}} thumbSize={15} />
            <HueSlider vertical thumbShape="pill" thumbColor="#000000" />
          </View>
        </ColorPicker>
      ) : (
        <ColorPicker value={initialHex} onChange={onColorSelect}>
          <Swatches />
        </ColorPicker>
      )}
      <View className="flex-row border border-black mt-4">
        <Text className="w-1/2 text-center py-1" style={prevLeftStyle}>
          {initialHex}
        </Text>
        <Text className="w-1/2 text-center py-1" style={prevRightStyle}>
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
      <LoadingOverlay visible={onLoading} />
    </>
  );
};
export default ColorPickerModal;
