import {useCallback} from 'react';
import {showBottomToast} from 'src/utils/ui/showToast';
import {useActionLock} from 'src/hook/common/useActionLock';
import {useAdGate} from 'src/hook/ad/useAdGate';
import {adShowCategory} from 'src/constants/ad';
import useKoreaMapMutation from 'src/hook/map/useKoreaMapMutation';
import useDialog from '../common/useDialog';

export const useSettingResetMap = () => {
  const {isDisabled, wrap} = useActionLock();
  const {runWithAdGate} = useAdGate();
  const {visibleDialog, showDialog, hideDialog} = useDialog();
  const {resetMapMutation} = useKoreaMapMutation();

  const onResetMapSuccess = useCallback(() => {
    hideDialog();
    showBottomToast('info', '지도를 새로 채워보세요!');
  }, [hideDialog]);

  // Reset Map & RegionCount
  const onResetMap = wrap(async () => {
    await runWithAdGate(
      adShowCategory.reset,
      () => resetMapMutation.mutateAsync(),
      onResetMapSuccess,
    );
  });

  return {
    isDisabled,
    visibleDialog,
    showDialog,
    hideDialog,
    onResetMap,
  };
};
