import {useCallback, useEffect, useMemo, useState} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import {getRegionTitle} from 'src/utils/koreaMap.util';
import {koreaMapSvgData} from 'src/constants/koreaMapData';
import {showBottomToast} from 'src/utils/showToast';
import {IKoreaRegionData} from 'src/types/koreaMap';
import useLoading from '../useLoading';
import useModal from '../useModal';
import useButton from '../useButton';
import useKoreaMapMutation from '../map/useKoreaMapMutation';
import useDialog from '../useDialog';
import useBottomSheetBackHandler from '../useBottomSheetBackHandler';
import useAd from '../ad/useAd';
import {adShowType} from 'src/constants/app';

const useKoreaMapSheet = (
  regionData: IKoreaRegionData,
  mapSheetModalRef: React.RefObject<BottomSheetModal | null>,
) => {
  const [zoom, setZoom] = useState(false);

  const {isDisabled, disabledButton, abledButton} = useButton();
  const {onLoading, startLoading, endLoading} = useLoading();
  const {visible, showModal, hideModal} = useModal();
  const {visibleDialog, showDialog, hideDialog} = useDialog();
  const {deleteMapMutation, updateMapByPhotoMutation} = useKoreaMapMutation();
  const {load, show, isClosed, checkAdShow} = useAd();
  const {handleSheetPositionChange} =
    useBottomSheetBackHandler(mapSheetModalRef);

  const regionTitle = useMemo(() => getRegionTitle(regionData), [regionData]);

  const handleClosePress = () => mapSheetModalRef.current?.close();

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (isClosed) {
      onUploadPhotoSuccess();
    }
  }, [isClosed]);

  const onUploadPhotoSuccess = () => {
    endLoading();
    abledButton();
    handleClosePress();
    showBottomToast('success', `${regionTitle} 사진 추가!`);
    load();
  };

  const onUploadingPhoto = useCallback(
    async (path: string) => {
      await updateMapByPhotoMutation.mutateAsync({
        data: regionData,
        uri: path,
      });
    },
    [regionData],
  );

  const onUploadPhoto = useCallback(
    async (path: string) => {
      try {
        disabledButton();
        startLoading();
        const adShow = await checkAdShow(adShowType.map);
        if (adShow) {
          show();
          await onUploadingPhoto(path);
        } else {
          await onUploadingPhoto(path);
          onUploadPhotoSuccess();
        }
      } catch (error) {
        endLoading();
        abledButton();
      }
    },
    [checkAdShow, show, onUploadingPhoto],
  );

  const onImagePicker = useCallback(async () => {
    try {
      const {width, height} = koreaMapSvgData[regionData.id].regionSvgStyle;
      const pickerImage = await ImagePicker.openPicker({
        width,
        height,
        cropping: true,
        mediaType: 'photo',
        compressImageQuality: 0.9,
        cropperToolbarTitle: regionTitle,
      });
      await onUploadPhoto(pickerImage.path);
    } catch (error) {
      return;
    }
  }, [regionData, regionTitle, onUploadPhoto]);

  const onDeleteBackground = async () => {
    try {
      disabledButton();
      await deleteMapMutation.mutateAsync(regionData);
      abledButton();
      hideDialog();
      hideModal();
      handleClosePress();
    } catch (error) {
      abledButton();
      hideModal();
      handleClosePress();
    }
  };

  return {
    isDisabled,
    zoom,
    setZoom,
    visible,
    showModal,
    hideModal,
    visibleDialog,
    showDialog,
    hideDialog,
    onLoading,
    onImagePicker,
    onDeleteBackground,
    handleClosePress,
    handleSheetPositionChange,
  };
};

export default useKoreaMapSheet;
