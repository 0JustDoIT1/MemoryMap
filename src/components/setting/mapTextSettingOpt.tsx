import React from 'react';
import {Pressable} from 'react-native';
import {Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {IShowRegionName} from 'src/types/koreaMap';
import {useDynamicStyle} from 'src/hook/common/useDynamicStyle';
import {useAppTheme} from 'src/style/paperTheme';

interface IMapTextSettingOpt {
  value: IShowRegionName;
  label: string;
  selected: IShowRegionName;
  onSelect: (val: IShowRegionName) => void;
  isDisabled: boolean;
}

const MapTextSettingOpt = ({
  value,
  label,
  selected,
  onSelect,
  isDisabled,
}: IMapTextSettingOpt) => {
  const theme = useAppTheme();

  const active = selected === value;

  const activeBG = theme.colors.brandLight;
  const inactiveBG = theme.colors.white;
  const activeText = theme.colors.white;
  const inactiveText = theme.colors.brandLight;

  const containerStyle = useDynamicStyle({
    bgColor: active ? activeBG : inactiveBG,
  }).mapTextSettingSelect;

  const textStyle = useDynamicStyle({
    color: active ? activeText : inactiveText,
  }).mapTextSettingText;

  return (
    <Pressable
      className="flex-row justify-between items-center w-full p-4 border-y border-y-gray-300"
      style={containerStyle}
      onPress={() => onSelect(value)}
      disabled={isDisabled}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityState={{selected: active}}>
      <Text className="text-left text-lg" style={textStyle}>
        {label}
      </Text>
      {active && (
        <MaterialCommunityIcons
          name="check-bold"
          size={24}
          color={theme.colors.white}
        />
      )}
    </Pressable>
  );
};

export default MapTextSettingOpt;
