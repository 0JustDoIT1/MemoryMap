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
  tag: string[];
}

const MapBottomSheet = ({
  bottomSheetModalRef,
  snapPoints,
  handleClosePress,
  renderBackdrop,
  title,
  tag,
}: MapBottomSheet) => {
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}>
      <BottomSheetView className="flex-1 items-center">
        <View className="flex justify-center items-center w-full py-6 px-8">
          <View className="flex-row justify-between items-center w-full mb-2">
            <Text className="text-xl text-black">{title}</Text>
            <TouchableOpacity onPress={handleClosePress}>
              <AntDesign
                name="close"
                size={32}
                style={customStyle().mapBottomSheetIcon}
              />
            </TouchableOpacity>
          </View>
          <View className="w-full flex-row justify-start items-center">
            {tag.length > 0 &&
              tag.map(item => (
                <Text className="py-1 px-2 mr-1 mb-8 text-xs text-outline text-center border border-outline rounded-xl">
                  {item}
                </Text>
              ))}
            <Text className="py-1 px-2 mr-1 mb-8 text-xs text-outline text-center border border-outline rounded-xl">
              # 스토리 0건
            </Text>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default MapBottomSheet;
