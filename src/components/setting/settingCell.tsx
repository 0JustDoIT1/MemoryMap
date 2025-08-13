import React from 'react';
import {Cell} from 'react-native-tableview-simple';
import {useAppTheme} from 'src/style/paperTheme';
import {staticStyles} from 'src/style/staticStyles';

interface ISettingCell extends React.ComponentProps<typeof Cell> {
  disabled?: boolean;
  onPress?: () => void;
}

const SettingCell = ({disabled, onPress, ...rest}: ISettingCell) => {
  const theme = useAppTheme();

  return (
    <Cell
      cellStyle="RightDetail"
      hideSeparator
      titleTextStyle={staticStyles.settingTableCellTitle}
      titleTextColor={theme.colors.darkGray}
      onPress={disabled ? undefined : onPress}
      {...rest}
    />
  );
};

export default SettingCell;
