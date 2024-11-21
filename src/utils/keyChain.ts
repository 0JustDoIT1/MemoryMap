import Keychain, {
  ACCESS_CONTROL,
  ACCESSIBLE,
  STORAGE_TYPE,
} from 'react-native-keychain';
import {showBottomToast} from './showToast';

export const getSecureValue = async (server: string) => {
  try {
    const credentials = await Keychain.getInternetCredentials(server);
    if (credentials) {
      return credentials;
    }
    return null;
  } catch (error) {
    showBottomToast('error', '키체인 가져오기 에러');
  }
};

export const setSecureValue = async (
  server: string,
  key: string,
  value: string,
) => {
  try {
    await Keychain.setInternetCredentials(server, key, value, {
      accessControl: ACCESS_CONTROL.BIOMETRY_ANY,
      accessible: ACCESSIBLE.WHEN_UNLOCKED,
      storage: STORAGE_TYPE.AES_GCM_NO_AUTH,
    });
  } catch (error) {
    showBottomToast('error', '키체인 설정 에러');
  }
};

export const removeSecureValue = async (server: string) => {
  try {
    await Keychain.resetInternetCredentials({server});
  } catch (error) {
    showBottomToast('error', '키체인 제거 에러');
  }
};
