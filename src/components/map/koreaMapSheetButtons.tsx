// components/map/koreaMapSheetButtons.tsx
import React from 'react';
import {View} from 'react-native';
import {BrandContainedButton, BrandOutlinedButton} from '../common/button';

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
  );
};

export default KoreaMapSheetButtons;
