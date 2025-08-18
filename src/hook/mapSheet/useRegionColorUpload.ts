import {useCallback} from 'react';
import {IKoreaRegionData} from 'src/types/koreaMap';
import useKoreaMapMutation from 'src/hook/map/useKoreaMapMutation';
import {useAdGate} from 'src/hook/ad/useAdGate';
import {useActionLock} from 'src/hook/common/useActionLock';
import {getRegionTitle} from 'src/utils/screen/koreaMap.util';
import {showBottomToast} from 'src/utils/ui/showToast';
import {adShowCategory} from 'src/constants/ad';

interface IUseRegionColorUpload {
  regionData: IKoreaRegionData;
  hex: string;
  hideModal: () => void;
  handleClosePress: () => void;
}

export const useRegionColorUpload = ({
  regionData,
  hex,
  hideModal,
  handleClosePress,
}: IUseRegionColorUpload) => {
  const {updateMapByColorMutation} = useKoreaMapMutation();
  const {runWithAdGate} = useAdGate();
  const {isDisabled, onLoading, wrap} = useActionLock();

  const onUploadingColor = useCallback(async () => {
    await updateMapByColorMutation.mutateAsync({data: regionData, color: hex});
  }, [updateMapByColorMutation, regionData, hex]);

  const onUploadColorSuccess = useCallback(() => {
    hideModal();
    handleClosePress();
    showBottomToast('success', `${getRegionTitle(regionData)} 색칠 완료!`);
  }, [hideModal, handleClosePress, regionData]);

  // 외부에서 바로 쓸 최종 핸들러
  const onUploadColor = wrap(async () => {
    await runWithAdGate(
      adShowCategory.map,
      onUploadingColor,
      onUploadColorSuccess,
    );
  });

  return {isDisabled, onLoading, onUploadColor};
};
