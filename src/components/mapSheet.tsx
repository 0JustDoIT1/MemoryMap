import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {customStyle} from 'src/style/customStyle';
import {BrandContainedButton, BrandOutlinedButton} from './button';
import {launchImageLibrary} from 'react-native-image-picker';
import {MapProps, StackParamList} from 'src/types/stack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useModal from 'src/hook/useModal';
import React from 'react';
import CustomModal from './modal';
import ColorPickerModal from 'src/screens/colorPickerModal';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {showBottomToast} from 'src/utils/showToast';
import useDialog from 'src/hook/useDialog';
import useKoreaMap from 'src/hook/useKoreaMap';
import MemoizedCustomAlert from './alert';

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
  const {koreaMapData, deleteMapDataById} = useKoreaMap();

  // 사진 선택
  const onImagePicker = async () => {
    await launchImageLibrary({
      maxWidth: 250,
      maxHeight: 250,
      mediaType: 'photo',
      quality: 0.7,
    }).then(async res => {
      if (res.assets) {
        handleClosePress();
        navigation.navigate('CropImage', {
          id: id,
          title: title,
          image: res.assets[0].uri!,
        });
      }
    });
  };

  // 배경 제거
  const onDeleteBackground = async () => {
    await deleteMapDataById(id)
      .then(() => onDeleteBackgroundSuccess())
      .catch(error => onDeleteBackgroundError(error));
    hideDialog();
  };

  const onDeleteBackgroundSuccess = () => {
    showBottomToast('info', '색칠 제거!');
    hideModal();
    handleClosePress();
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
          <View className="flex justify-center items-center w-full py-6 px-8">
            <View className="flex-row justify-between items-center w-full mb-2">
              <View className="flex-row justify-start items-center">
                <Text className="text-xl text-black">{title}</Text>
                {koreaMapData[id] && koreaMapData[id].type === 'photo' && (
                  <View className="w-5 h-5 mx-2 rounded-full flex justify-center items-center bg-brandDark">
                    <FontAwesome
                      name="photo"
                      size={12}
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
                    <FontAwesome6
                      name="eraser"
                      size={20}
                      style={customStyle().mapBottomSheetIcon}
                    />
                  </Pressable>
                )}
              </View>
              <Pressable onPress={handleClosePress}>
                <AntDesign
                  name="close"
                  size={32}
                  style={customStyle().mapBottomSheetIcon}
                />
              </Pressable>
            </View>
            <View className="w-full flex-row justify-start items-center mb-8">
              {tag.length > 0 &&
                tag.map(item => (
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
      <MemoizedCustomAlert
        visible={visibleDialog}
        title="배경을 제거하시겠습니까?"
        buttonText="삭제"
        buttonOnPress={onDeleteBackground}
        hideAlert={hideDialog}
      />
    </React.Fragment>
  );
};

const MemoizedMapSheet = React.memo(MapSheet);

export default MemoizedMapSheet;
