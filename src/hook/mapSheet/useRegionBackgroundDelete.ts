import useKoreaMapMutation from '../map/useKoreaMapMutation';
import {useActionLock} from '../common/useActionLock';
import {IKoreaRegionData} from 'src/types/koreaMap';
import useDialog from '../useDialog';

export const useRegionBackgroundDelete = (
  regionData: IKoreaRegionData,
  closeSheet: () => void,
) => {
  const {visibleDialog, showDialog, hideDialog} = useDialog();
  const {deleteMapMutation} = useKoreaMapMutation();
  const {isDisabled, onLoading, wrap} = useActionLock();

  const onDeleteBackground = wrap(async () => {
    await deleteMapMutation.mutateAsync(regionData);
    hideDialog();
    closeSheet();
  });

  return {
    visibleDialog,
    showDialog,
    hideDialog,
    isDisabled,
    onLoading,
    onDeleteBackground,
  };
};
