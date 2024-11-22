import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';
import {customStyle} from 'src/style/customStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface CustomBottomSheet {
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  snapPoints: string[];
  handleClosePress: () => void;
  renderBackdrop: (props: any) => React.JSX.Element;
  title?: string;
  description?: string;
  contents: React.JSX.Element;
}

const CustomBottomSheet = ({
  bottomSheetModalRef,
  snapPoints,
  handleClosePress,
  renderBackdrop,
  title,
  description,
  contents,
}: CustomBottomSheet) => {
  const titleMarginBottom = description ? 'mb-4' : 'mb-8';

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}>
      <BottomSheetView className="flex-1 items-center">
        <View className="flex justify-center items-center w-full py-6 px-8">
          {title && (
            <View
              className={`flex-row justify-center items-center w-full ${titleMarginBottom}`}>
              <Text className="text-xl text-outline">{title}</Text>
              <Pressable
                className="absolute top-50 right-0"
                onPress={handleClosePress}>
                <MaterialCommunityIcons
                  name="window-close"
                  size={32}
                  style={customStyle().bottomSheetIcon}
                />
              </Pressable>
            </View>
          )}
          {description && (
            <Text className="text-xs text-outline text-center mb-8">
              {description}
            </Text>
          )}
          {contents}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default CustomBottomSheet;
