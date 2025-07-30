import {Pressable, View} from 'react-native';
import {IKoreaRegionData} from 'src/types/koreaMap';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppTheme} from 'src/style/paperTheme';
import {customStyle} from 'src/style/customStyle';
import {Text} from 'react-native-paper';

interface IKoreaMapSheetHeader {
  regionData: IKoreaRegionData;
  setZoom: (zoom: boolean) => void;
  isDisabled: boolean;
  showDialog: () => void;
  handleClosePress: () => void;
}

const KoreaMapSheetHeader = ({
  regionData,
  setZoom,
  isDisabled,
  showDialog,
  handleClosePress,
}: IKoreaMapSheetHeader) => {
  const theme = useAppTheme();
  return (
    <View className="flex-row justify-between items-center w-full mb-2">
      <View className="flex-row justify-start items-center">
        {regionData && regionData.type === 'photo' && (
          <>
            <View className="w-5 h-5 mr-1 mb-[2] rounded-full flex justify-center items-center bg-brandMain">
              <MaterialCommunityIcons
                name="file-image-outline"
                size={17}
                color={theme.colors.white}
              />
            </View>
          </>
        )}
        {regionData && regionData.type === 'color' && (
          <View
            className="w-5 h-5 mr-1 mb-[2] rounded-full"
            style={
              customStyle({bgColor: regionData.background}).mapBottomSheetCircle
            }
          />
        )}
        <Text className="text-xl text-black">{regionData.title}</Text>

        {regionData.type === 'photo' && (
          <Pressable
            className="ml-2 mb-[2]"
            onPress={() => setZoom(true)}
            disabled={isDisabled}>
            <MaterialCommunityIcons
              name="magnify-plus-outline"
              size={22}
              color={theme.colors.darkGray}
            />
          </Pressable>
        )}
        {regionData.type !== 'init' && (
          <Pressable
            className="ml-2 mb-[2]"
            onPress={showDialog}
            disabled={isDisabled}>
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={22}
              color={theme.colors.darkGray}
            />
          </Pressable>
        )}
      </View>
      <Pressable onPress={handleClosePress} disabled={isDisabled}>
        <MaterialCommunityIcons
          name="window-close"
          size={32}
          color={theme.colors.black}
        />
      </Pressable>
    </View>
  );
};

export default KoreaMapSheetHeader;
