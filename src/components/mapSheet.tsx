import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {Pressable, View} from 'react-native';
import {Portal, Text} from 'react-native-paper';
import {customStyle} from 'src/style/customStyle';
import {BrandContainedButton, BrandOutlinedButton} from './button';
import useModal from 'src/hook/useModal';
import React, {useCallback, useMemo, useState} from 'react';
import CustomModal from './modal';
import ColorPickerModal from 'src/components/colorPickerModal';
import {showBottomToast} from 'src/utils/showToast';
import useDialog from 'src/hook/useDialog';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {KoreaRegionData} from 'src/types/koreaMap';
import {getRegionTitle} from 'src/utils/koreaMap.util';
import CustomAlert from './alert';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteMapDataById, updateMapPhotoById} from 'src/utils/koreaMap.db';
import ImagePicker from 'react-native-image-crop-picker';
import ZoomImage from './zoomImage';
import {useAppTheme} from 'src/style/paperTheme';
import LoadingScreen from 'src/screens/loadingScreen';
import {koreaMapSvgData} from 'src/constants/koreaMapData';

interface MapSheet {
  mapSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  uid: string;
  regionData: KoreaRegionData;
}

const MapSheet = ({mapSheetModalRef, uid, regionData}: MapSheet) => {
  const theme = useAppTheme();
  // Bottom Sheet height setting [index0, index1]
  const snapPoints = useMemo(() => ['30%', '40%'], []);

  // Bottom Sheet close event
  const handleClosePress = () => mapSheetModalRef.current?.close();

  // Bottom Sheet close event when background touch
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" />,
    [],
  );

  const {visible, showModal, hideModal} = useModal();
  const {visibleDialog, showDialog, hideDialog} = useDialog();

  const [zoom, setZoom] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Access the client
  const queryClient = useQueryClient();

  // React-Query Mutation
  const deleteMapMutation = useMutation({
    mutationFn: ({uid, data}: {uid: string; data: KoreaRegionData}) =>
      deleteMapDataById(uid, data),
  });
  const updateMapMutation = useMutation({
    mutationFn: ({
      uid,
      data,
      uri,
      imageStyle,
    }: {
      uid: string;
      data: KoreaRegionData;
      uri: string;
      imageStyle: {width: number; height: number};
    }) => updateMapPhotoById(uid, data, uri, imageStyle),
  });

  // KoreaMapData tag list
  const tagList =
    regionData.title === regionData.main
      ? []
      : [regionData.main, regionData.title];

  // Select Image
  const onImagePicker = async () => {
    try {
      const cropW = koreaMapSvgData[regionData.id].mapSvgStyle.width * 5;
      const cropH = koreaMapSvgData[regionData.id].mapSvgStyle.height * 5;

      const cropImage = await ImagePicker.openPicker({
        width: cropW,
        height: cropH,
        cropping: true,
        mediaType: 'photo',
        // freeStyleCropEnabled: true,
        compressImageQuality: 0.8,
        cropperToolbarTitle: getRegionTitle(regionData),
      });
      await onUploadPhoto(cropImage.path, cropImage.width, cropImage.height);
    } catch (error) {
      return;
    }
  };

  // Upload photo to map
  const onUploadPhoto = async (path: string, width: number, height: number) => {
    setIsLoading(true);
    try {
      await updateMapMutation.mutateAsync({
        uid: uid,
        data: regionData,
        uri: path,
        imageStyle: {width: width, height: height},
      });

      await queryClient.invalidateQueries({queryKey: ['koreaMapData', uid]});
      await queryClient.invalidateQueries({
        queryKey: ['addStory', uid],
      });

      onUploadPhotoSuccess();
    } catch (error) {
      setIsLoading(false);
      return;
    }
  };

  const onUploadPhotoSuccess = () => {
    const text = `${getRegionTitle(regionData)} 사진 추가!`;
    setIsLoading(false);
    handleClosePress();
    showBottomToast('success', text);
  };

  // Delete map background
  const onDeleteBackground = async () => {
    try {
      await deleteMapMutation.mutateAsync({
        uid: uid,
        data: regionData,
      });

      await queryClient.invalidateQueries({queryKey: ['koreaMapData', uid]});
      await queryClient.invalidateQueries({
        queryKey: ['addStory', uid],
      });

      onDeleteBackgroundSuccess();
    } catch (error) {
      onDeleteBackgroundError(error);
    }
  };

  const onDeleteBackgroundSuccess = () => {
    hideDialog();
    hideModal();
    handleClosePress();
  };

  const onDeleteBackgroundError = (error: any) => {
    hideModal();
    handleClosePress();
  };

  return (
    <React.Fragment>
      <BottomSheetModal
        ref={mapSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}>
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
                    onPress={() => setZoom(true)}>
                    <MaterialCommunityIcons
                      name="magnify-plus-outline"
                      size={22}
                      color={theme.colors.darkGray}
                    />
                  </Pressable>
                )}
                {regionData && regionData.type !== 'init' && (
                  <Pressable className="ml-2 mb-[2]" onPress={showDialog}>
                    <MaterialCommunityIcons
                      name="trash-can-outline"
                      size={22}
                      color={theme.colors.darkGray}
                    />
                  </Pressable>
                )}
              </View>
              <Pressable onPress={handleClosePress}>
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
              <BrandContainedButton text="사진 넣기" onPress={onImagePicker} />
              <BrandOutlinedButton
                text="색칠 하기"
                classes="mt-1"
                onPress={showModal}
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
            uid={uid}
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
        buttonOnPress={onDeleteBackground}
        hideAlert={hideDialog}
      />
      {zoom && <ZoomImage data={regionData} setZoom={setZoom} />}
      {isLoading && (
        <Portal>
          <LoadingScreen />
        </Portal>
      )}
    </React.Fragment>
  );
};

export default MapSheet;
