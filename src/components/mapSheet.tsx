import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';
import {customStyle} from 'src/style/customStyle';
import {BrandContainedButton, BrandOutlinedButton} from './button';
import {launchImageLibrary} from 'react-native-image-picker';
import {MapProps, StackParamList} from 'src/types/stack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useModal from 'src/hook/useModal';
import React, {useCallback, useMemo} from 'react';
import CustomModal from './modal';
import ColorPickerModal from 'src/screens/colorPickerModal';
import {showBottomToast} from 'src/utils/showToast';
import useDialog from 'src/hook/useDialog';
import useKoreaMap from 'src/hook/useKoreaMap';
import MemoizedCustomAlert from './alert';
import {getDataToBottomSheet, getRegionTitleById} from 'src/utils/koreaMap';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useRegionCount from 'src/hook/useRegionCount';
import useStory from 'src/hook/useStory';

interface MapSheet extends Omit<MapProps, 'route'> {
  navigation: NativeStackNavigationProp<StackParamList, 'Map'>;
  mapSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  id: string;
}

const MapSheet = ({navigation, mapSheetModalRef, id}: MapSheet) => {
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
  const {koreaMapData, deleteMapDataById} = useKoreaMap();
  const {deleteRegionCountById} = useRegionCount();
  const {getDeleteStoryCount, deleteStoryByRegionId} = useStory();

  const regionData = getDataToBottomSheet(id);

  // 사진 선택
  const onImagePicker = async () => {
    await launchImageLibrary({
      maxWidth: 250,
      maxHeight: 250,
      mediaType: 'photo',
      quality: 0.7,
    }).then(res => {
      if (res.assets) {
        handleClosePress();
        navigation.navigate('CropImage', {
          id: id,
          title: regionData!.title,
          image: res.assets[0].uri!,
        });
      }
    });
  };

  // 배경 제거
  const onDeleteBackground = async () => {
    try {
      const deleteColorNum = -1;
      const deleteStoryNum = getDeleteStoryCount(id);

      await deleteMapDataById(id);
      await deleteRegionCountById(id, deleteColorNum, deleteStoryNum);
      await deleteStoryByRegionId(id);

      onDeleteBackgroundSuccess();
    } catch (error) {
      onDeleteBackgroundError(error);
    }
  };

  const onDeleteBackgroundSuccess = () => {
    const text = `${getRegionTitleById(koreaMapData, id)} 색칠 제거!`;

    hideDialog();
    hideModal();
    handleClosePress();
    showBottomToast('info', text);
  };

  const onDeleteBackgroundError = (error: any) => {
    showBottomToast('error', '색칠 제거에 실패했습니다.');
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
          {regionData && (
            <View className="flex justify-center items-center w-full py-6 px-8">
              <View className="flex-row justify-between items-center w-full mb-2">
                <View className="flex-row justify-start items-center">
                  <Text className="text-xl text-black">
                    {regionData?.title}
                  </Text>
                  {koreaMapData[id] && koreaMapData[id].type === 'photo' && (
                    <View className="w-5 h-5 mx-2 rounded-full flex justify-center items-center bg-brandDark">
                      <MaterialCommunityIcons
                        name="file-image-outline"
                        size={15}
                        style={customStyle().mapBottomSheetPhotoIcon}
                      />
                    </View>
                  )}
                  {koreaMapData[id] && koreaMapData[id].type === 'color' && (
                    <View
                      className="w-5 h-5 mx-2 rounded-full"
                      style={
                        customStyle({bgColor: koreaMapData[id]?.background})
                          .mapBottomSheetCircle
                      }></View>
                  )}
                  {koreaMapData[id] && koreaMapData[id].type !== 'init' && (
                    <Pressable onPress={showDialog}>
                      <MaterialCommunityIcons
                        name="trash-can-outline"
                        size={20}
                        style={customStyle().mapBottomSheetIcon}
                      />
                    </Pressable>
                  )}
                </View>
                <Pressable onPress={handleClosePress}>
                  <MaterialCommunityIcons
                    name="window-close"
                    size={32}
                    style={customStyle().mapBottomSheetIcon}
                  />
                </Pressable>
              </View>
              <View className="w-full flex-row justify-start items-center mb-8">
                {regionData?.tagList.length > 0 &&
                  regionData?.tagList.map(item => (
                    <Text
                      key={item}
                      className="py-1 px-2 mr-1 text-xs text-outline text-center border border-outline rounded-xl">
                      {item}
                    </Text>
                  ))}
                {koreaMapData[id].type !== 'init' && (
                  <Text className="py-1 px-2 mr-1 text-xs text-outline text-center border border-outline rounded-xl">
                    # 스토리 {koreaMapData[id].story}건
                  </Text>
                )}
              </View>
              <View className="w-full pb-4">
                <BrandContainedButton
                  text="사진 넣기"
                  onPress={onImagePicker}
                />
                <BrandOutlinedButton
                  text="색칠 하기"
                  classes="mt-1"
                  onPress={showModal}
                />
              </View>
            </View>
          )}
        </BottomSheetView>
      </BottomSheetModal>
      <CustomModal
        visible={visible}
        hideModal={hideModal}
        contents={
          <ColorPickerModal
            id={id}
            hideModal={hideModal}
            handleClosePress={handleClosePress}
          />
        }
      />
      <MemoizedCustomAlert
        visible={visibleDialog}
        title="배경을 제거하시겠습니까?"
        description="해당 지역 스토리도 전부 삭제됩니다."
        buttonText="삭제"
        buttonOnPress={onDeleteBackground}
        hideAlert={hideDialog}
      />
    </React.Fragment>
  );
};

export default MapSheet;
