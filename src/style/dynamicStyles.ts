import {DimensionValue, TextStyle, ViewStyle} from 'react-native';
import {customColor} from './customColor';

export interface IDynamicStyle {
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

interface IReturnStyles {
  mapBottomSheetCircle: ViewStyle;
  colorPickerPreview: ViewStyle & TextStyle;
  storyPointIconText: TextStyle;
  storyPointIcon: TextStyle;
  storyPointView: ViewStyle;

  progressBar: ViewStyle;
  progressBarFill: ViewStyle;

  progressBarTitle: TextStyle;
  progressBarText: TextStyle;

  settingTableCell: ViewStyle;
  mapTextSettingSelect: ViewStyle;
  mapTextSettingText: TextStyle;
}

export const dynamicStyle = (props?: IDynamicStyle): IReturnStyles => ({
  mapBottomSheetCircle: {
    backgroundColor: props?.bgColor,
  },

  colorPickerPreview: {
    backgroundColor: props?.bgColor,
    color: props?.color,
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

  progressBar: {
    width: '100%' as DimensionValue,
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
    marginBottom: 8,
    color: props?.color,
  },
  progressBarText: {
    ...props?.margin,
    fontSize: 10,
    marginTop: 5,
    color: props?.color,
  },

  settingTableCell: {
    paddingTop: 3,
    paddingBottom: 3,
    borderBottomWidth: props?.border?.bottom ?? 0,
    borderBottomColor: customColor.backdrop,
  },

  mapTextSettingSelect: {
    backgroundColor: props?.bgColor,
  },
  mapTextSettingText: {
    color: props?.color,
  },
});
