import {useCallback, useMemo} from 'react';
import {getRegionTitle} from 'src/utils/screen/koreaMap.util';
import {showBottomToast} from 'src/utils/ui/showToast';
import useKoreaMapMutation from '../map/useKoreaMapMutation';
import {useActionLock} from '../common/useActionLock';
import {useAdGate} from '../ad/useAdGate';
import {AD_SHOW_CATEGORY} from 'src/constants/ad';
import {useRegionImagePicker} from './useRegionImagePicker';
import {IRegionData} from 'src/types/koreaMap';

export const useRegionImageUpload = (
  regionData: IRegionData,
  closeSheet: () => void,
) => {
  const title = useMemo(() => getRegionTitle(regionData), [regionData]);
  const {updateMapByPhotoMutation} = useKoreaMapMutation();
  const {isDisabled, onLoading, wrap} = useActionLock();
  const {runWithAdGate} = useAdGate();
  const {pick} = useRegionImagePicker(regionData.id, title);

  const onUploadPhotoSuccess = () => {
    closeSheet();
    showBottomToast('success', `${title} 사진 추가!`);
  };

  const onUploadPhoto = useCallback(
    async (path: string) => {
      await updateMapByPhotoMutation.mutateAsync({data: regionData, uri: path});
    },
    [updateMapByPhotoMutation, regionData],
  );

  const onImagePicker = wrap(async () => {
    const path = await pick();
    await runWithAdGate(
      AD_SHOW_CATEGORY.map,
      () => onUploadPhoto(path),
      onUploadPhotoSuccess,
    );
  });

  return {isDisabled, onLoading, onImagePicker};
};
