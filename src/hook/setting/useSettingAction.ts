import {useCallback} from 'react';
import DeviceInfo from 'react-native-device-info';
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
import {TStackParamList} from 'src/types/stack';
import {safeOpen} from 'src/utils/openLink';
import useDialog from '../common/useDialog';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export const useSettingAction = (
  navigation: NativeStackNavigationProp<TStackParamList, 'Setting', undefined>,
) => {
  const appVersion = DeviceInfo.getVersion();

  const {isDisabled, wrap} = useActionLock();
  const {runWithAdGate} = useAdGate();
  const {resetMapMutation} = useKoreaMapMutation();
  const {visibleDialog, showDialog, hideDialog} = useDialog();

  // Map Text show
  const onPressMapText = useCallback(() => {
    navigation.navigate('MapTextSetting');
  }, [navigation]);

  // Pincode(lock screen) on/off
  const onPressPinCodeSetting = useCallback(
    (hasPin: boolean) => {
      if (hasPin) navigation.navigate('PinCodeEnter', {route: 'Setting'});
      else navigation.navigate('PinCodeSetting');
    },
    [navigation],
  );

  // Pincode(lock screen) reset
  const onPressPinCodeReset = useCallback(() => {
    navigation.navigate('PinCodeEnter', {route: 'PinCodeSetting'});
  }, [navigation]);

  // Email Contact us
  const onPressContactUs = useCallback(async () => {
    const deviceName = await DeviceInfo.getDeviceName();
    await safeOpen(LinkingEmail(deviceName, appVersion));
  }, []);

  // Term link
  const onPressTermPrivacyUrl = useCallback(() => safeOpen(TermPrivacyUrl), []);
  const onPressTermServiceUrl = useCallback(() => safeOpen(TermServiceUrl), []);

  const onResetMapSuccess = useCallback(() => {
    hideDialog();
    showBottomToast('info', '지도를 새로 채워보세요!');
  }, [hideDialog]);

  // Reset Map & RegionCount
  const onResetMap = wrap(async () => {
    await runWithAdGate(
      adShowCategory.reset,
      () => resetMapMutation.mutateAsync(),
      onResetMapSuccess,
    );
  });

  return {
    appVersion,
    isDisabled,
    visibleDialog,
    showDialog,
    hideDialog,
    onPressMapText,
    onPressPinCodeSetting,
    onPressPinCodeReset,
    onPressContactUs,
    onPressTermPrivacyUrl,
    onPressTermServiceUrl,
    onResetMap,
  };
};
