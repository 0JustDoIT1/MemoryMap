import {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {returnedResults} from 'reanimated-color-picker';
import {useRecoilState, useRecoilValue} from 'recoil';
import CustomColorPannel from 'src/components/colorPannel';
import CustomColorSwatch from 'src/components/colorSwatch';
import useKoreaMap from 'src/hook/useKoreaMap';
import {appUserState, koreaMapDataState} from 'src/recoil/atom';
import {customStyle} from 'src/style/customStyle';
import {AppData} from 'src/types/account';
import {KoreaMapData, KoreaRegionData} from 'src/types/koreaMap';
import {getTextColorByBackgroundColor} from 'src/utils/getTextColorByBackgroundColor';

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
  const {getMapDataById} = useKoreaMap();
  const regionData = getMapDataById(id);

  const [mode, setMode] = useState<boolean>(false);
  const [hex, setHex] = useState<string>(regionData.background);

  const appUser = useRecoilValue(appUserState);
  const [koreaMapData, setKoreaMapData] = useRecoilState(koreaMapDataState);

  const onChangeMode = () => {
    setMode(!mode);
  };

  const onColorSelect = (color: returnedResults) => {
    setHex(color.hex);
  };
  const onSelectColor = () => {
    hideModal();
    handleClosePress();
    const updateRegion: KoreaRegionData = {
      ...regionData,
      background: hex,
      type: 'color',
    };
    const upDateKorea: KoreaMapData = {
      ...koreaMapData,
      [regionData.id]: updateRegion,
    };
    setKoreaMapData(upDateKorea);

    const appData: AppData = {
      uid: appUser?.uid as string,
      email: appUser?.email as string,
      koreaMapData: upDateKorea,
    };
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
            customStyle({
              bgColor: regionData.background,
              color: getTextColorByBackgroundColor(regionData.background),
            }).colorPickerPreview
          }>
          {regionData.background}
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
