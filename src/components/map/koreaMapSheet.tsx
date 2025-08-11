import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {BOTTOM_SHEET_DEFAULT_INDEX} from 'src/constants/bottomSheet';
import KoreaMapSheetHeader from './koreaMapSheetHeader';
import KoreaMapSheetTagList from './koreaMapSheetTagList';
import KoreaMapSheetButtons from './koreaMapSheetButtons';
import KoreaMapSheetOverlays from './koreaMapSheetOverlay';
import {IKoreaRegionData} from 'src/types/koreaMap';
import {useKoreaMapSheetControl} from 'src/hook/mapSheet/useKoreaMapSheetControl';
import {useRegionImageUpload} from 'src/hook/mapSheet/useRegionImageUpload';
import {useRegionBackgroundDelete} from 'src/hook/mapSheet/useRegionBackgroundDelete';
import useModal from 'src/hook/useModal';

interface KoreaMapSheetProps {
  mapSheetModalRef: React.RefObject<BottomSheetModal | null>;
  regionData: IKoreaRegionData;
}

const KoreaMapSheet = ({mapSheetModalRef, regionData}: KoreaMapSheetProps) => {
  // Bottom Sheet close event when background touch
  const renderBackdrop = useMemo(
    () => (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
        pressBehavior="close"
      />
    ),
    [],
  );

  const {visible, showModal, hideModal} = useModal();
  const {snapPoints, handleClosePress, handleSheetPositionChange} =
    useKoreaMapSheetControl(mapSheetModalRef);
  const {
    isDisabled: isUploadDisabled,
    onLoading: onUploadLoading,
    onImagePicker,
  } = useRegionImageUpload(regionData, handleClosePress);

  const {
    visibleDialog,
    showDialog,
    hideDialog,
    isDisabled: isDeleteDisabled,
    onLoading: onDeleteLoading,
    onDeleteBackground,
  } = useRegionBackgroundDelete(regionData, handleClosePress);

  const [zoom, setZoom] = useState<boolean>(false);

  return (
    <>
      <BottomSheetModal
        ref={mapSheetModalRef}
        index={BOTTOM_SHEET_DEFAULT_INDEX}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        onChange={handleSheetPositionChange}>
        <BottomSheetView className="flex-1 items-center">
          <View className="flex justify-center items-center w-full py-6 px-8">
            <KoreaMapSheetHeader
              regionData={regionData}
              setZoom={setZoom}
              isDisabled={isUploadDisabled || isDeleteDisabled}
              showDialog={showDialog}
              handleClosePress={handleClosePress}
            />
            <KoreaMapSheetTagList regionData={regionData} />
            <KoreaMapSheetButtons
              onImagePicker={onImagePicker}
              showModal={showModal}
              isDisabled={isUploadDisabled}
            />
          </View>
        </BottomSheetView>
      </BottomSheetModal>

      <KoreaMapSheetOverlays
        regionData={regionData}
        visible={visible}
        hideModal={hideModal}
        visibleDialog={visibleDialog}
        hideDialog={hideDialog}
        onDeleteBackground={onDeleteBackground}
        isDisabled={isDeleteDisabled}
        zoom={zoom}
        setZoom={setZoom}
        onLoading={onUploadLoading || onDeleteLoading}
        handleClosePress={handleClosePress}
      />
    </>
  );
};

export default KoreaMapSheet;
