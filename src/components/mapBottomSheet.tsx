import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {customStyle} from 'src/style/customStyle';

interface MapBottomSheet {
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  snapPoints: string[];
  handleClosePress: () => void;
  renderBackdrop: (props: any) => React.JSX.Element;
  title: string;
  tag?: [string, string];
  code: string;
}

const MapBottomSheet = ({
  bottomSheetModalRef,
  snapPoints,
  handleClosePress,
  renderBackdrop,
  title,
  tag,
  code,
}: MapBottomSheet) => {
  const titleMarginBottom = tag ? 'mb-4' : 'mb-8';

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}>
      <BottomSheetView className="flex-1 items-center">
        <View className="flex justify-center items-center w-full py-6 px-8">
          <View
            className={`flex-row justify-center items-center w-full ${titleMarginBottom}`}>
            <Text className="text-xl text-outline">{title}</Text>
            <TouchableOpacity
              className="absolute top-50 right-0"
              onPress={handleClosePress}>
              <AntDesign
                name="close"
                size={32}
                style={customStyle().bottomSheetIcon}
              />
            </TouchableOpacity>
          </View>
          {tag && (
            <Text className="text-xs text-outline text-center mb-8">{tag}</Text>
          )}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default MapBottomSheet;
