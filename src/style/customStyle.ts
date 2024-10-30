// React-Native-Paper Component에는 Nativewind의 ClassName이 부분적으로
// 작동이 잘 안되서 Inline Style로 적용

import {StyleSheet} from 'react-native';

interface CustomStyle {
  color?: string;
  disabled?: boolean;
}

const colors = {
  brandLight: '#FF7C6C',
  brandMain: '#FF624F',
  brandDark: '#FF4832',
  brandBase: '#FF9A8E',
  brandAccent: '#FF290F',
  success: '#22bb33',
  error: '#ff0000',
  info: '#5bc0de',
  backdrop: 'rgba(51, 47, 55, 0.4)',
  outline: '#968e98',
  blur: '#9CA3AF',
};

export const customStyle = (props?: CustomStyle) =>
  StyleSheet.create({
    brandOutlinedButton: {
      borderColor: colors.brandMain,
    },
    helperText: {
      color: props?.color,
    },
    socialLoginButton: {
      backgroundColor: props?.disabled ? props?.color : props?.color,
    },
    socialLoginLabel: {
      color: props?.disabled ? props?.color : props?.color,
    },
    successToast: {
      backgroundColor: colors.success,
      borderLeftColor: colors.success,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 10,
    },
    errorToast: {
      backgroundColor: colors.error,
      borderLeftColor: colors.error,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 10,
    },
    infoToast: {
      backgroundColor: colors.info,
      borderLeftColor: colors.info,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 10,
    },
    toastContent: {paddingHorizontal: 5},
    toastText1: {
      color: '#ffffff',
    },
    bottomSheetIcon: {
      color: colors.outline,
    },
    mapBox: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    mapBottomSheetIcon: {
      color: '#000000',
    },
    modalStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContentStyle: {
      backgroundColor: '#ffffff',
      padding: 20,
      margin: 40,
    },
    colorPickerPreview: {
      backgroundColor: props?.color,
    },
  });
