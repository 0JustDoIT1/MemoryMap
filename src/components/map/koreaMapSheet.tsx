import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {View} from 'react-native';
import React, {useMemo} from 'react';
import {BOTTOM_SHEET_DEFAULT_INDEX} from 'src/constants/bottomSheet';
import KoreaMapSheetHeader from './koreaMapSheetHeader';
import KoreaMapSheetTagList from './koreaMapSheetTagList';
import KoreaMapSheetButtons from './koreaMapSheetButtons';
import KoreaMapSheetOverlays from './koreaMapSheetOverlay';
import {IKoreaRegionData} from 'src/types/koreaMap';
import useKoreaMapSheet from 'src/hook/mapSheet/useKoreaMapSheet';

interface KoreaMapSheetProps {
  mapSheetModalRef: React.RefObject<BottomSheetModal | null>;
  regionData: IKoreaRegionData;
}

const KoreaMapSheet = ({mapSheetModalRef, regionData}: KoreaMapSheetProps) => {
  // Bottom Sheet height setting [index0, index1]
  const snapPoints = useMemo(() => ['30%', '40%'], []);

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

  const {
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
  } = useKoreaMapSheet(regionData, mapSheetModalRef);

  return (
    <React.Fragment>
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
              isDisabled={isDisabled}
              showDialog={showDialog}
              handleClosePress={handleClosePress}
            />
            <KoreaMapSheetTagList regionData={regionData} />
            <KoreaMapSheetButtons
              onImagePicker={onImagePicker}
              showModal={showModal}
              isDisabled={isDisabled}
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
        isDisabled={isDisabled}
        zoom={zoom}
        setZoom={setZoom}
        onLoading={onLoading}
        handleClosePress={handleClosePress}
      />
    </React.Fragment>
  );
};

export default KoreaMapSheet;
