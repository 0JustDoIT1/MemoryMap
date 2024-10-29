import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {TouchableOpacity, View} from 'react-native';
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
import useKoreaMap from 'src/hook/useKoreaMap';

interface MapSheet extends Omit<MapProps, 'route'> {
  navigation: NativeStackNavigationProp<StackParamList, 'Map'>;
  close: () => void;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  snapPoints: string[];
  handleClosePress: () => void;
  renderBackdrop: (props: any) => React.JSX.Element;
  id: string;
  title: string;
  tag: string[];
}

const MapSheet = ({
  navigation,
  close,
  bottomSheetModalRef,
  snapPoints,
  handleClosePress,
  renderBackdrop,
  id,
  title,
  tag,
}: MapSheet) => {
  const {visible, showModal, hideModal} = useModal();
  const {getMapDataById} = useKoreaMap();

  const regionData = getMapDataById(id);

  const onImagePicker = async () => {
    await launchImageLibrary({
      mediaType: 'photo',
    }).then(res => {
      if (res.assets) {
        close();
        navigation.navigate('CropImage', {
          title: title,
          image: res.assets[0].uri as string,
        });
      }
    });
  };

  return (
    <React.Fragment>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}>
        <BottomSheetView className="flex-1 items-center">
          <View className="flex justify-center items-center w-full py-6 px-8">
            <View className="flex-row justify-between items-center w-full mb-2">
              <Text className="text-xl text-black">{title}</Text>
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
                  <Text className="py-1 px-2 mr-1 mb-8 text-xs text-outline text-center border border-outline rounded-xl">
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
        contents={<ColorPickerModal {...regionData} />}
      />
    </React.Fragment>
  );
};

export default MapSheet;
