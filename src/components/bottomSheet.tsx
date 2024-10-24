import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {customStyle} from 'src/style/customStyle';

interface CustomBottomSheet {
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  snapPoints: string[];
  handleClosePress: () => void;
  renderBackdrop: (props: any) => React.JSX.Element;
  title: string;
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
    <BottomSheetModalProvider>
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
            {description && (
              <Text className="text-xs text-outline text-center mb-8">
                {description}
              </Text>
            )}
            {contents}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default CustomBottomSheet;
