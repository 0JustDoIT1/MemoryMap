import useKoreaMapMutation from '../map/useKoreaMapMutation';
import {useActionLock} from '../common/useActionLock';
import {IRegionData} from 'src/types/koreaMap';
import useDialog from '../common/useDialog';

export const useRegionBackgroundDelete = (
  regionData: IRegionData,
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
