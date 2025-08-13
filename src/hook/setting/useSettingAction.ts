// src/hook/setting/useSettingActions.ts
import {useCallback} from 'react';
import DeviceInfo from 'react-native-device-info';
import {Linking} from 'react-native';
import {showBottomToast} from 'src/utils/showToast';
import {useActionLock} from 'src/hook/common/useActionLock';
import {useAdGate} from 'src/hook/ad/useAdGate';
import {adShowCategory} from 'src/constants/app';
import {
  LinkingEmail,
  TermPrivacyUrl,
  TermServiceUrl,
} from 'src/constants/linking';
import useKoreaMapMutation from 'src/hook/map/useKoreaMapMutation';
import {TSetting} from 'src/types/stack';

const safeOpen = async (url: string) => {
  const can = await Linking.canOpenURL(url);
  if (!can) {
    showBottomToast('error', '링크를 열 수 없습니다.');
    return;
  }
  await Linking.openURL(url);
};

export const useSettingActions = (
  navigation: TSetting['navigation'],
  hideDialog: () => void,
) => {
  const {wrap} = useActionLock();
  const {runWithAdGate} = useAdGate();
  const {resetMapMutation} = useKoreaMapMutation();

  const onPressMapText = useCallback(() => {
    navigation.navigate('MapTextSetting');
  }, [navigation]);

  const onPressPinCodeSetting = useCallback(
    (hasPin: boolean) => {
      if (hasPin) navigation.navigate('PinCodeEnter', {route: 'Setting'});
      else navigation.navigate('PinCodeSetting');
    },
    [navigation],
  );

  const onPressPinCodeReset = useCallback(() => {
    navigation.navigate('PinCodeEnter', {route: 'PinCodeSetting'});
  }, [navigation]);

  const onPressContactUs = useCallback(async () => {
    const appVersion = DeviceInfo.getVersion();
    const deviceName = await DeviceInfo.getDeviceName();
    await safeOpen(LinkingEmail(deviceName, appVersion));
  }, []);

  const onPressTermPrivacyUrl = useCallback(() => safeOpen(TermPrivacyUrl), []);
  const onPressTermServiceUrl = useCallback(() => safeOpen(TermServiceUrl), []);

  const onResetMapSuccess = useCallback(() => {
    hideDialog();
    showBottomToast('info', '지도를 새로 채워보세요!');
  }, [hideDialog]);

  const onResetMap = wrap(async () => {
    await runWithAdGate(
      adShowCategory.reset,
      () => resetMapMutation.mutateAsync(),
      onResetMapSuccess,
    );
  });

  return {
    onPressMapText,
    onPressPinCodeSetting,
    onPressPinCodeReset,
    onPressContactUs,
    onPressTermPrivacyUrl,
    onPressTermServiceUrl,
    onResetMap,
  };
};
