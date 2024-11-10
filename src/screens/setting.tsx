import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BrandContainedButton} from 'src/components/button';
import useEmailAndPasswordAuth from 'src/hook/useEmailAndPasswordAuth';
import {SettingProps} from 'src/types/stack';

const SettingScreen = ({navigation}: SettingProps) => {
  const {onSignOut} = useEmailAndPasswordAuth();

  const onSignOutAuth = async () => {
    await onSignOut().then(() => navigation.replace('Auth'));
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center w-screen h-screen bg-white p-2">
      <BrandContainedButton text="로그아웃" onPress={onSignOutAuth} />
    </SafeAreaView>
  );
};

export default SettingScreen;
