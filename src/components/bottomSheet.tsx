import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';
import {customStyle} from 'src/style/customStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {forwardRef, useCallback, useMemo} from 'react';

interface CustomBottomSheet {
  snap: string;
  title?: string;
  description?: string;
  contents: React.JSX.Element;
}

const CustomBottomSheet = forwardRef<BottomSheetModal, CustomBottomSheet>(
  ({snap, title, description, contents}, ref) => {
    // Bottom Sheet height setting [index0, index1]
    const snapPoints = useMemo(() => ['40%', snap], [snap]);

    // Bottom Sheet close event
    const handleClosePress = () => {
      if (ref && typeof ref !== 'function') return ref.current?.close();
    };

    // Bottom Sheet close event when background touch
    const renderBackdrop = useCallback(
      (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" />,
      [],
    );

    const titleMarginBottom = description ? 'mb-4' : 'mb-8';

    return (
      <BottomSheetModal
        ref={ref}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize">
        <BottomSheetView className="flex-1 items-center">
          <View className="flex justify-center items-center w-full py-6 px-8">
            {title && title !== '' && (
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
            {description && description !== '' && (
              <Text className="text-xs text-outline text-center mb-8">
                {description}
              </Text>
            )}
            <View className="w-full pb-4">{contents}</View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default CustomBottomSheet;
