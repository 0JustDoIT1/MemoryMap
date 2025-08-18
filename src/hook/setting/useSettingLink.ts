import {useCallback} from 'react';
import DeviceInfo from 'react-native-device-info';
import {safeOpen} from 'src/utils/platform/openLink';
import {
  LinkingEmail,
  TERM_PRIVACY_URL,
  TERM_SERVICE_URL,
} from 'src/constants/linking';

export const useSettingLink = () => {
  const appVersion = DeviceInfo.getVersion();

  // Email Contact us
  const onPressContactUs = useCallback(async () => {
    const deviceName = await DeviceInfo.getDeviceName();
    await safeOpen(LinkingEmail(deviceName, appVersion));
  }, [appVersion]);

  // Term link
  const onPressTermPrivacyUrl = useCallback(
    () => safeOpen(TERM_PRIVACY_URL),
    [],
  );
  const onPressTermServiceUrl = useCallback(
    () => safeOpen(TERM_SERVICE_URL),
    [],
  );

  return {
    appVersion,
    onPressContactUs,
    onPressTermPrivacyUrl,
    onPressTermServiceUrl,
  };
};
