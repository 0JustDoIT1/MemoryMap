import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useCallback, useMemo} from 'react';
import useBottomSheetBackHandler from '../bottomSheet/useBottomSheetBackHandler';

export const useKoreaMapSheetControl = (
  mapSheetModalRef: React.RefObject<BottomSheetModal | null>,
) => {
  const snapPoints = useMemo(() => ['30%', '40%'], []);

  const handleClosePress = useCallback(
    () => mapSheetModalRef.current?.close(),
    [mapSheetModalRef],
  );
  const {handleSheetPositionChange} =
    useBottomSheetBackHandler(mapSheetModalRef);

  return {snapPoints, handleClosePress, handleSheetPositionChange};
};
