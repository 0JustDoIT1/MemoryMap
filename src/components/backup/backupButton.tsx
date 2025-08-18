import React, {memo} from 'react';
import {Pressable} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IBackupButton {
  iconName: string;
  label: string;
  onPress: () => void;
  disabled: boolean;
  buttonClassName: string;
}

const BackupButton = ({
  iconName,
  label,
  onPress,
  disabled,
  buttonClassName,
}: IBackupButton) => {
  const theme = useTheme();

  return (
    <Pressable
      className={buttonClassName}
      accessibilityRole="button"
      accessibilityState={{disabled: !!disabled}}
      disabled={disabled}
      onPress={onPress}>
      <MaterialCommunityIcons
        name={iconName}
        size={24}
        color={theme.colors.onSurface}
      />
      <Text className="ml-2 text-base">{label}</Text>
    </Pressable>
  );
};

export default memo(BackupButton);
