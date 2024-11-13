// React-Native-Paper Component에는 Nativewind의 ClassName이 부분적으로
// 작동이 잘 안되서 Inline Style로 적용

import {StyleSheet} from 'react-native';

interface CustomStyle {
  bgColor?: string;
  color?: string;
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
  excite: '#41C450',
  happy: '#9ACD32',
  neutral: '#41C4AE',
  sad: '#FF7224',
  dead: '#FF4343',
};

export const customStyle = (props?: CustomStyle) =>
  StyleSheet.create({
    brandOutlinedButton: {
      borderColor: colors.brandMain,
    },
    helperText: {
      color: props?.color,
    },
    socialLoginLabel: {
      color: props?.color,
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
    mapBottomSheetPhotoIcon: {
      color: '#ffffff',
    },
    mapBottomSheetIcon: {
      color: '#000000',
    },
    mapBottomSheetCircle: {
      backgroundColor: props?.bgColor,
    },
    modal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#ffffff',
      padding: 20,
      margin: 40,
    },
    colorPickerPreview: {
      backgroundColor: props?.bgColor,
      color: props?.color,
    },
    viewShot: {
      width: '100%',
      height: '100%',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    },
    sliderContainer: {
      width: '100%',
    },
    sliderTrack: {height: 10, borderRadius: 50},
    sliderMinimumTrack: {
      backgroundColor: props?.bgColor ? props.bgColor : colors.brandMain,
    },
    fab: {
      borderRadius: 100,
      backgroundColor: colors.brandMain,
    },
    fabContainer: {
      marginRight: 8,
    },
    alert: {backgroundColor: '#F9F9F9'},
    calendarNextTitleStyle: {
      marginHorizontal: 20,
      fontSize: 20,
    },
    calendarPreviousTitleStyle: {
      marginHorizontal: 20,
      fontSize: 20,
    },
    calendarMonthTitleStyle: {
      fontSize: 20,
    },
    calendarYearTitleStyle: {
      fontSize: 20,
    },
    calendarTextStyle: {
      fontFamily: 'GmarketSansMedium',
      color: '#000000',
    },
  });
