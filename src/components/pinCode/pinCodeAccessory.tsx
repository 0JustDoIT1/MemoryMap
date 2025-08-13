import React from 'react';
import {View, Pressable} from 'react-native';
import {Switch} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {customColor} from 'src/style/customColor';

const PinCodeAccessory = ({
  appPinCode,
  isDisabled,
  onReset,
  onToggle,
}: {
  appPinCode: boolean;
  isDisabled: boolean;
  onReset: () => void;
  onToggle: () => void;
}) => (
  <View className="w-1/2 flex-row justify-end items-center">
    {appPinCode && (
      <Pressable
        className="mx-2"
        onPress={onReset}
        disabled={isDisabled}
        hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
        accessibilityRole="button"
        accessibilityLabel="암호 초기화"
        accessibilityHint="현재 설정된 잠금 암호를 초기화합니다">
        <MaterialCommunityIcons
          name="lock-reset"
          size={30}
          color={customColor.gray}
        />
      </Pressable>
    )}
    <Switch
      color={customColor.brandMain}
      value={appPinCode}
      onValueChange={onToggle}
      disabled={isDisabled}
      accessibilityLabel={appPinCode ? '암호 잠금 켜짐' : '암호 잠금 꺼짐'}
      accessibilityHint="암호 잠금 설정 화면으로 이동합니다"
    />
  </View>
);

export default PinCodeAccessory;
