import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {View} from 'react-native';
import {forwardRef, useCallback, useMemo} from 'react';
import useBottomSheetBackHandler from 'src/hook/bottomSheet/useBottomSheetBackHandler';
import BottomSheetTitle from './bottomSheetTitle';
import BottomSheetDesc from './bottomSheetDesc';

interface CustomBottomSheet {
  snap: string;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

const CustomBottomSheet = forwardRef<BottomSheetModal, CustomBottomSheet>(
  ({snap, title, description, children}, ref) => {
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

    const {handleSheetPositionChange} = useBottomSheetBackHandler(ref);

    const hasTitle = !!title?.trim();
    const hasDesc = !!description?.trim();
    const titleMarginBottom = hasDesc ? 'mb-4' : 'mb-8';

    return (
      <BottomSheetModal
        ref={ref}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        onChange={handleSheetPositionChange}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize">
        <BottomSheetView className="flex-1 items-center">
          <View className="flex justify-center items-center w-full py-6 px-8">
            {hasTitle && (
              <BottomSheetTitle
                className={titleMarginBottom}
                title={title}
                onPress={handleClosePress}
              />
            )}
            {hasDesc && <BottomSheetDesc description={description} />}
            <View className="w-full pb-4">{children}</View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default CustomBottomSheet;
