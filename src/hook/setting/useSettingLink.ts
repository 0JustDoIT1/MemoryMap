import {useCallback} from 'react';
import DeviceInfo from 'react-native-device-info';
import {safeOpen} from 'src/utils/openLink';
import {
  LinkingEmail,
  TermPrivacyUrl,
  TermServiceUrl,
} from 'src/constants/linking';

export const useSettingLink = () => {
  const appVersion = DeviceInfo.getVersion();

  // Email Contact us
  const onPressContactUs = useCallback(async () => {
    const deviceName = await DeviceInfo.getDeviceName();
    await safeOpen(LinkingEmail(deviceName, appVersion));
  }, [appVersion]);

  // Term link
  const onPressTermPrivacyUrl = useCallback(() => safeOpen(TermPrivacyUrl), []);
  const onPressTermServiceUrl = useCallback(() => safeOpen(TermServiceUrl), []);

  return {
    appVersion,
    onPressContactUs,
    onPressTermPrivacyUrl,
    onPressTermServiceUrl,
  };
};
