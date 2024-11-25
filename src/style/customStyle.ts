// React-Native-Paper Component에는 Nativewind의 ClassName이 부분적으로
// 작동이 잘 안되서 Inline Style로 적용

import {DimensionValue, StyleSheet} from 'react-native';
import {customColor} from './customColor';

interface CustomStyle {
  width?: DimensionValue;
  bgColor?: string;
  color?: string;
  margin?: {
    marginLeft?: DimensionValue;
    marginRight?: DimensionValue;
  };
}

export const customStyle = (props?: CustomStyle) =>
  StyleSheet.create({
    brandOutlinedButton: {
      borderColor: customColor.brandMain,
    },
    helperText: {
      color: props?.color,
    },
    socialLoginLabel: {
      color: props?.color,
    },
    successToast: {
      backgroundColor: customColor.success,
      borderLeftColor: customColor.success,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 10,
    },
    errorToast: {
      backgroundColor: customColor.error,
      borderLeftColor: customColor.error,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 10,
    },
    infoToast: {
      backgroundColor: customColor.info,
      borderLeftColor: customColor.info,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 10,
    },
    toastContent: {paddingHorizontal: 5},
    toastText1: {
      color: customColor.white,
    },
    bottomSheetIcon: {
      color: customColor.outline,
    },
    mapBox: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    mapBottomSheetPhotoIcon: {
      color: customColor.white,
    },
    mapBottomSheetIcon: {
      color: customColor.black,
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
      backgroundColor: customColor.white,
      padding: 20,
      margin: 40,
    },
    colorPickerPreview: {
      backgroundColor: props?.bgColor,
      color: props?.color,
    },
    mapViewShot: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: customColor.white,
    },
    sliderContainer: {
      width: '100%',
    },
    sliderTrack: {height: 10, borderRadius: 50},
    sliderMinimumTrack: {
      backgroundColor: props?.bgColor ? props.bgColor : customColor.brandMain,
    },
    fab: {
      borderRadius: 100,
      backgroundColor: customColor.brandMain,
    },
    fabContainer: {
      marginRight: 8,
    },
    alert: {backgroundColor: '#F9F9F9', borderRadius: 10},
    calendarText: {
      fontFamily: 'GmarketSansMedium',
      color: customColor.gray,
    },
    calendarHeaderText: {
      fontFamily: 'GmarketSansMedium',
      color: customColor.gray,
    },
    calendarSelectedText: {
      color: customColor.white,
      fontFamily: 'GmarketSansMedium',
    },
    storyPointIconText: {
      color: props?.color,
    },
    storyPointIcon: {
      textShadowColor: props?.color,
      shadowOpacity: 0.7,
      textShadowRadius: 2,
    },
    storyPointView: {
      backgroundColor: props?.bgColor,
    },
    storyFlatListContainer: {
      gap: 8,
    },
    storyViewShot: {
      width: '100%',
      height: '100%',
      backgroundColor: customColor.white,
    },
    progressBar: {
      width: '100%',
      height: 17,
      backgroundColor: props?.bgColor,
      borderTopLeftRadius: 50,
      borderBottomLeftRadius: 50,
      borderTopRightRadius: 50,
      borderBottomRightRadius: 50,
    },
    progressBarFill: {
      height: 17,
      backgroundColor: props?.bgColor,
      borderTopLeftRadius: 50,
      borderBottomLeftRadius: 50,
      borderTopRightRadius: props?.width === '100%' ? 50 : 0,
      borderBottomRightRadius: props?.width === '100%' ? 50 : 0,
    },
    progressBarTitle: {
      fontSize: 15,
      marginRight: 'auto',
      marginBottom: 8,
      color: props?.color,
    },
    progressBarText: {
      ...props?.margin,
      fontSize: 10,
      marginTop: 5,
      color: props?.color,
    },
    dashboardRound: {
      backgroundColor: `${props?.bgColor}50`,
    },
    pinCodeSwitch: {},
    pinCodeTopContainer: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: customColor.brandLight,
    },
  });
