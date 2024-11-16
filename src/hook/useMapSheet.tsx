import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {useCallback, useMemo, useRef} from 'react';

const useMapSheet = () => {
  const mapSheetModalRef = useRef<BottomSheetModal>(null);

  // Bottom Sheet height setting [index0, index1]
  const snapPoints = useMemo(() => ['30%', '40%'], []);

  const handlePresentPress = useCallback(() => {
    mapSheetModalRef.current?.present();
  }, []);

  // Bottom Sheet close event
  const handleClosePress = () => mapSheetModalRef.current?.close();

  // Bottom Sheet close event when background touch
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" />,
    [],
  );

  return {
    mapSheetModalRef,
    snapPoints,
    handlePresentPress,
    handleClosePress,
    renderBackdrop,
  };
};

export default useMapSheet;
