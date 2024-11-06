import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {Alert, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {customStyle} from 'src/style/customStyle';
import {BrandContainedButton, BrandOutlinedButton} from './button';
import {launchImageLibrary} from 'react-native-image-picker';
import {MapProps, StackParamList} from 'src/types/stack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useModal from 'src/hook/useModal';
import React, {useState} from 'react';
import CustomModal from './modal';
import ColorPickerModal from 'src/screens/colorPickerModal';
import useKoreaMap from 'src/hook/useKoreaMap';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {showBottomToast} from 'src/utils/showToast';
import CustomAlert from './alert';
import useDialog from 'src/hook/useDialog';

interface MapSheet extends Omit<MapProps, 'route'> {
  navigation: NativeStackNavigationProp<StackParamList, 'Map'>;
  mapSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  snapPoints: string[];
  handleClosePress: () => void;
  renderBackdrop: (props: any) => React.JSX.Element;
  id: string;
  title: string;
  tag: string[];
}

const MapSheet = ({
  navigation,
  mapSheetModalRef,
  snapPoints,
  handleClosePress,
  renderBackdrop,
  id,
  title,
  tag,
}: MapSheet) => {
  const {visible, showModal, hideModal} = useModal();
  const {visibleDialog, showDialog, hideDialog} = useDialog();
  const {getMapDataById, getSvgDataById, deleteMapDataById} = useKoreaMap();
  const regionData = getMapDataById(id);
  const svgData = getSvgDataById(id);

  const {updateMapPhotoById} = useKoreaMap();

  const onUploadPhotoSuccess = () => {
    showBottomToast('success', '색칠 성공!');
    navigation.navigate('Map');
  };

  const onImagePicker = async () => {
    // ImageCropPicker.openPicker({
    //   width: 300,
    //   height: 300,
    //   cropping: true,
    //   mediaType: 'photo',
    // }).then(async image => {
    //   if (image) {
    //     console.log('!!!', image.width, image.height);
    //     handleClosePress();
    //     await updateMapPhotoById(id, image.path).then(() =>
    //       onUploadPhotoSuccess(),
    //     );
    //   }
    // });
    await launchImageLibrary({
      mediaType: 'photo',
    }).then(async res => {
      if (res.assets) {
        handleClosePress();
        // await updateMapPhotoById(id, res.assets[0].uri as string).then(() =>
        //   onUploadPhotoSuccess(),
        // );
        navigation.navigate('CropImage', {
          id: id,
          title: title,
          image: res.assets[0].uri as string,
          width: res.assets[0].width as number,
          height: res.assets[0].height as number,
          svgStyle: svgData.svgStyle,
          svgPolygon: svgData.svgPolygon as string,
        });
      }
    });
  };

  const onDeleteBackground = async () => {
    await deleteMapDataById(id).then(() => onDeleteBackgroundSuccess());
    hideDialog();
  };

  const onDeleteBackgroundSuccess = () => {
    showBottomToast('info', '색칠 제거!');
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
                <Text className="text-xl text-black">{title}</Text>
                {regionData && regionData.type === 'photo' && (
                  <View className="w-5 h-5 mx-2 rounded-full flex justify-center items-center bg-brandDark">
                    <FontAwesome
                      name="photo"
                      size={12}
                      style={customStyle().mapBottomSheetPhotoIcon}
                    />
                  </View>
                )}
                {regionData && regionData.type === 'color' && (
                  <View
                    className="w-5 h-5 mx-2 rounded-full"
                    style={
                      customStyle({bgColor: regionData?.background})
                        .mapBottomSheetCircle
                    }></View>
                )}
                {regionData && regionData.type !== 'init' && (
                  <TouchableOpacity onPress={showDialog}>
                    <FontAwesome6
                      name="eraser"
                      size={20}
                      style={customStyle().mapBottomSheetIcon}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <TouchableOpacity onPress={handleClosePress}>
                <AntDesign
                  name="close"
                  size={32}
                  style={customStyle().mapBottomSheetIcon}
                />
              </TouchableOpacity>
            </View>
            <View className="w-full flex-row justify-start items-center">
              {tag.length > 0 &&
                tag.map(item => (
                  <Text
                    key={item}
                    className="py-1 px-2 mr-1 mb-8 text-xs text-outline text-center border border-outline rounded-xl">
                    {item}
                  </Text>
                ))}
              <Text className="py-1 px-2 mr-1 mb-8 text-xs text-outline text-center border border-outline rounded-xl">
                # 스토리 0건
              </Text>
            </View>
            <View className="w-full">
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
            id={id}
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
    </React.Fragment>
  );
};

export default MapSheet;
