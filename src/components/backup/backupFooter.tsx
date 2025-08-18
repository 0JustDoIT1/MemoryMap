import React, {memo} from 'react';
import {View} from 'react-native';
import BackupButton from './backupButton';

interface Props {
  disabled: boolean;
  onBackup: () => void;
  onRecover: () => void;
}

const BackupFooter = ({disabled, onBackup, onRecover}: Props) => {
  return (
    <View className="w-full h-[8%] flex-row justify-between items-center border-t border-t-gray-300">
      <BackupButton
        iconName="cloud-upload-outline"
        label="백업"
        onPress={onBackup}
        disabled={disabled}
        buttonClassName="w-1/2 flex-row justify-center items-center"
      />
      <View className="h-3/4 border-r-[0.5px] border-blur" />
      <BackupButton
        iconName="cloud-download-outline"
        label="복구"
        onPress={onRecover}
        disabled={disabled}
        buttonClassName="w-1/2 flex-row justify-center items-center"
      />
    </View>
  );
};

export default memo(BackupFooter);
