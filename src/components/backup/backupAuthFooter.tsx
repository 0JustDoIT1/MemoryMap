import React, {memo} from 'react';
import {View} from 'react-native';
import BackupButton from './backupButton';

interface IBackupAuthFooter {
  disabled: boolean;
  isSignedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const BackupAuthFooter = ({
  disabled,
  isSignedIn,
  onLogin,
  onLogout,
}: IBackupAuthFooter) => {
  return (
    <View className="w-full h-[8%] flex-row justify-between items-center border-t border-t-gray-300">
      <BackupButton
        iconName={isSignedIn ? 'logout' : 'login'}
        label={isSignedIn ? '로그아웃' : '로그인'}
        onPress={isSignedIn ? onLogout : onLogin}
        disabled={disabled}
        buttonClassName="w-full flex-row justify-center items-center"
      />
    </View>
  );
};

export default memo(BackupAuthFooter);
