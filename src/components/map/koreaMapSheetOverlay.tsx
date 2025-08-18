// components/map/koreaMapSheetOverlays.tsx
import React from 'react';
import {Portal} from 'react-native-paper';
import CustomModal from '../modal/modal';
import CustomAlert from '../alert/alert';
import LoadingOverlay from 'src/components/feedback/loadingOverlay';
import KoreaMapZoom from './koreaMapZoom';
import ColorPickerModal from '../modal/colorPickerModal';
import {IRegionData} from 'src/types/koreaMap';

interface IKoreaMapSheetOverlays {
  regionData: IRegionData;
  visible: boolean;
  hideModal: () => void;
  visibleDialog: boolean;
  hideDialog: () => void;
  onDeleteBackground: () => void;
  isDisabled: boolean;
  zoom: boolean;
  setZoom: React.Dispatch<React.SetStateAction<boolean>>;
  onLoading: boolean;
  handleClosePress: () => void;
}

const KoreaMapSheetOverlays = ({
  regionData,
  visible,
  hideModal,
  visibleDialog,
  hideDialog,
  onDeleteBackground,
  isDisabled,
  zoom,
  setZoom,
  onLoading,
  handleClosePress,
}: IKoreaMapSheetOverlays) => {
  return (
    <>
      <CustomModal
        visible={visible}
        hideModal={hideModal}
        contents={
          <ColorPickerModal
            regionData={regionData}
            hideModal={hideModal}
            handleClosePress={handleClosePress}
          />
        }
      />
      <CustomAlert
        visible={visibleDialog}
        title="배경을 제거하시겠습니까?"
        buttonText="삭제"
        isDisabled={isDisabled}
        buttonOnPress={onDeleteBackground}
        hideAlert={hideDialog}
      />
      {zoom && <KoreaMapZoom data={regionData} setZoom={setZoom} />}
      <LoadingOverlay visible={onLoading} />
    </>
  );
};

export default KoreaMapSheetOverlays;
