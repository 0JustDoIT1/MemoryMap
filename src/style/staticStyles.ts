import {StyleSheet} from 'react-native';
import {customColor} from './customColor';

export const staticStyles = StyleSheet.create({
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
  storyFlatListContainer: {
    flexGrow: 1,
    gap: 8,
  },
  storyViewShot: {
    width: '100%',
    height: '100%',
    backgroundColor: customColor.white,
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
  settingTableSectionTitle: {
    fontFamily: 'GmarketSansMedium',
    fontSize: 12,
  },
  settingTableCellTitle: {
    fontFamily: 'GmarketSansMedium',
    fontSize: 16,
  },
});
