import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {Pressable, View} from 'react-native';
import {Portal, Text} from 'react-native-paper';
import {customStyle} from 'src/style/customStyle';
import useModal from 'src/hook/useModal';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import ColorPickerModal from 'src/components/modal/colorPickerModal';
import {showBottomToast} from 'src/utils/showToast';
import useDialog from 'src/hook/useDialog';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {KoreaRegionData} from 'src/types/koreaMap';
import {getRegionTitle} from 'src/utils/koreaMap.util';
import ImagePicker from 'react-native-image-crop-picker';
import {useAppTheme} from 'src/style/paperTheme';
import LoadingScreen from 'src/screens/loadingScreen';
import {koreaMapSvgData} from 'src/constants/koreaMapData';
import useButton from 'src/hook/useButton';
import useKoreaMapMutation from 'src/hook/useKoreaMapMutation';
import useLoading from 'src/hook/useLoading';
import useAd from 'src/hook/useAd';
import useBottomSheetBackHandler from 'src/hook/useBottomSheetBackHandler';
import {BrandContainedButton, BrandOutlinedButton} from '../common/button';
import CustomAlert from '../alert/alert';
import CustomModal from '../modal/modal';
import ZoomImage from '../view/zoomImage';

interface KoreaMapSheet {
  mapSheetModalRef: React.RefObject<BottomSheetModal | null>;
  regionData: KoreaRegionData;
}

const KoreaMapSheet = ({mapSheetModalRef, regionData}: KoreaMapSheet) => {
  const theme = useAppTheme();
  // Bottom Sheet height setting [index0, index1]
  const snapPoints = useMemo(() => ['30%', '40%'], []);

  // Bottom Sheet close event
  const handleClosePress = () => mapSheetModalRef.current?.close();

  // Bottom Sheet close event when background touch
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
        pressBehavior="close"
      />
    ),
    [],
  );

  // KoreaMapData tag list
  const tagList =
    regionData.title === regionData.main
      ? []
      : [regionData.main, regionData.title];

  const {isDisabled, disabledButton, abledButton} = useButton();
  const {onLoading, startLoading, endLoading} = useLoading();
  const {visible, showModal, hideModal} = useModal();
  const {visibleDialog, showDialog, hideDialog} = useDialog();
  const {deleteMapMutation, updateMapByPhotoMutation} = useKoreaMapMutation();
  const {load, show, isClosed, checkAdShow} = useAd();
  const {handleSheetPositionChange} =
    useBottomSheetBackHandler(mapSheetModalRef);

  const [zoom, setZoom] = useState<boolean>(false);

  useEffect(() => {
    load();
    if (isClosed) {
      onUploadPhotoSuccess();
      load();
    }
  }, [load, isClosed]);

  // Select Image
  const onImagePicker = async () => {
    try {
      const imageWidth = koreaMapSvgData[regionData.id].regionSvgStyle.width;
      const imageHeight = koreaMapSvgData[regionData.id].regionSvgStyle.height;

      const pickerImage = await ImagePicker.openPicker({
        width: imageWidth,
        height: imageHeight,
        cropping: true,
        mediaType: 'photo',
        compressImageQuality: 0.9,
        cropperToolbarTitle: getRegionTitle(regionData),
      });
      await onUploadPhoto(pickerImage.path);
    } catch (error) {
      return;
    }
  };

  // Upload photo to map
  const onUploadPhoto = async (path: string) => {
    try {
      disabledButton();
      startLoading();
      const adShow = await checkAdShow('map');
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
      return;
    }
  };

  const onUploadingPhoto = async (path: string) => {
    await updateMapByPhotoMutation.mutateAsync({
      data: regionData,
      uri: path,
    });
  };

  const onUploadPhotoSuccess = () => {
    endLoading();
    abledButton();
    handleClosePress();
    showBottomToast('success', `${getRegionTitle(regionData)} 사진 추가!`);
  };

  // Delete map background
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
      return;
    }
  };

  return (
    <React.Fragment>
      <BottomSheetModal
        ref={mapSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        onChange={handleSheetPositionChange}>
        <BottomSheetView className="flex-1 items-center">
          <View className="flex justify-center items-center w-full py-6 px-8">
            <View className="flex-row justify-between items-center w-full mb-2">
              <View className="flex-row justify-start items-center">
                {regionData && regionData.type === 'photo' && (
                  <React.Fragment>
                    <View className="w-5 h-5 mr-1 mb-[2] rounded-full flex justify-center items-center bg-brandMain">
                      <MaterialCommunityIcons
                        name="file-image-outline"
                        size={17}
                        color={theme.colors.white}
                      />
                    </View>
                  </React.Fragment>
                )}
                {regionData && regionData.type === 'color' && (
                  <View
                    className="w-5 h-5 mr-1 mb-[2] rounded-full"
                    style={
                      customStyle({bgColor: regionData.background})
                        .mapBottomSheetCircle
                    }
                  />
                )}
                <Text className="text-xl text-black">{regionData.title}</Text>

                {regionData && regionData.type === 'photo' && (
                  <Pressable
                    className="ml-2 mb-[2]"
                    onPress={() => setZoom(true)}
                    disabled={isDisabled}>
                    <MaterialCommunityIcons
                      name="magnify-plus-outline"
                      size={22}
                      color={theme.colors.darkGray}
                    />
                  </Pressable>
                )}
                {regionData && regionData.type !== 'init' && (
                  <Pressable
                    className="ml-2 mb-[2]"
                    onPress={showDialog}
                    disabled={isDisabled}>
                    <MaterialCommunityIcons
                      name="trash-can-outline"
                      size={22}
                      color={theme.colors.darkGray}
                    />
                  </Pressable>
                )}
              </View>
              <Pressable onPress={handleClosePress} disabled={isDisabled}>
                <MaterialCommunityIcons
                  name="window-close"
                  size={32}
                  color={theme.colors.black}
                />
              </Pressable>
            </View>
            <View className="w-full flex-row justify-start items-center mb-8">
              {tagList.length > 0 &&
                tagList.map(item => (
                  <Text
                    key={item}
                    className="py-1 px-2 mr-1 text-xs text-outline text-center border border-outline rounded-xl">
                    {item}
                  </Text>
                ))}
              {regionData && regionData.type !== 'init' && (
                <Text className="py-1 px-2 mr-1 text-xs text-outline text-center border border-outline rounded-xl">
                  # 스토리 {regionData.story}건
                </Text>
              )}
            </View>
            <View className="w-full pb-4">
              <BrandContainedButton
                text="사진 넣기"
                onPress={onImagePicker}
                isDisabled={isDisabled}
              />
              <BrandOutlinedButton
                text="색칠 하기"
                classes="mt-1"
                onPress={showModal}
                isDisabled={isDisabled}
              />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
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
      {zoom && <ZoomImage data={regionData} setZoom={setZoom} />}
      {onLoading && (
        <Portal>
          <LoadingScreen />
        </Portal>
      )}
    </React.Fragment>
  );
};

export default KoreaMapSheet;
