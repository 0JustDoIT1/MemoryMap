// components/map/koreaMapSheetButtons.tsx
import React from 'react';
import {View} from 'react-native';
import BrandButton from '../common/button';

interface IKoreaMapSheetButtons {
  onImagePicker: () => void;
  showModal: () => void;
  isDisabled: boolean;
}

const KoreaMapSheetButtons = ({
  onImagePicker,
  showModal,
  isDisabled,
}: IKoreaMapSheetButtons) => {
  return (
    <View className="w-full pb-4">
      <BrandButton
        variant="contained"
        text="사진 넣기"
        onPress={onImagePicker}
        disabled={isDisabled}
      />
      <BrandButton
        variant="outlined"
        text="색칠 하기"
        className="mt-1"
        onPress={showModal}
        disabled={isDisabled}
      />
    </View>
  );
};

export default KoreaMapSheetButtons;
