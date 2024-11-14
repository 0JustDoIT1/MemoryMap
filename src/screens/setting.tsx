import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BrandContainedButton} from 'src/components/button';
import useEmailAndPasswordAuth from 'src/hook/useEmailAndPasswordAuth';
import {SettingProps} from 'src/types/stack';
import {showBottomToast} from 'src/utils/showToast';

const SettingScreen = ({navigation}: SettingProps) => {
  const {onSignOut} = useEmailAndPasswordAuth();

  const onSignOutAuth = async () => {
    await onSignOut()
      .then(() => navigation.replace('Auth'))
      .catch(error => onSignOutAuthError(error));
  };

  const onSignOutAuthError = (error: any) => {
    showBottomToast('error', '로그아웃에 실패했습니다.');
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center w-screen h-screen bg-white p-2">
      <BrandContainedButton text="로그아웃" onPress={onSignOutAuth} />
    </SafeAreaView>
  );
};

export default SettingScreen;
