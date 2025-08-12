import {useCallback} from 'react';
import {getRegionTitle} from 'src/utils/koreaMap.util';
import useBackButton from 'src/hook/common/useBackButton';
import {onCaptureAndSave, onCaptureAndShare} from 'src/utils/screenshot';
import type ViewShot from 'react-native-view-shot';
import type {IKoreaRegionData} from 'src/types/koreaMap';

const useZoomImageControl = (
  data: IKoreaRegionData,
  setZoom: (v: boolean) => void,
  viewShotRef: React.RefObject<ViewShot | null>,
) => {
  const handleSave = useCallback(
    () => onCaptureAndSave(viewShotRef),
    [viewShotRef],
  );
  const handleShare = useCallback(
    () => onCaptureAndShare(viewShotRef, `나만의 ${getRegionTitle(data)}`),
    [viewShotRef, data],
  );
  const handleClose = useCallback(() => setZoom(false), [setZoom]);

  useBackButton(handleClose);

  return {handleSave, handleShare, handleClose};
};

export default useZoomImageControl;
