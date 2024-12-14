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
  border?: {
    bottom?: number;
  };
}

export const customStyle = (props?: CustomStyle) =>
  StyleSheet.create({
    brandOutlinedButton: {
      borderColor: customColor.brandMain,
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
    blackOpacityToast: {
      height: 50,
      width: '80%',
      backgroundColor: customColor.blackOpacity,
      borderLeftColor: customColor.blackOpacity,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 5,
      borderRadius: 100,
    },
    toastContent: {
      paddingHorizontal: 5,
    },
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
    pinCodeTopContainer: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: customColor.brandLight,
    },
    blurScreen: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    blurViewShot: {
      width: '100%',
      height: '100%',
    },
    settingTable: {
      width: '100%',
    },
    settingTableCell: {
      backgroundColor: 'inherit',
      paddingTop: 3,
      paddingBottom: 3,
      borderBottomWidth: props?.border?.bottom ? props?.border?.bottom : 0,
      borderBottomColor: customColor.backdrop,
    },
    settingTableSectionTitle: {
      fontFamily: 'GmarketSansMedium',
      fontSize: 12,
    },
    settingTableCellTitle: {
      fontFamily: 'GmarketSansMedium',
      fontSize: 16,
    },
    mapTextSettingSelect: {
      backgroundColor: props?.bgColor,
    },
    mapTextSettingText: {
      color: props?.color,
    },
  });
