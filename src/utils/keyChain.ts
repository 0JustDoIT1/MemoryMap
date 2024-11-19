import Keychain, {
  ACCESS_CONTROL,
  ACCESSIBLE,
  STORAGE_TYPE,
} from 'react-native-keychain';

export const getSecureValue = async () => {
  const credentials = await Keychain.getGenericPassword();
  if (credentials) {
    return credentials;
  }
  return null;
};

export const setSecureValue = async (key: string, value: string) => {
  await Keychain.setGenericPassword(key, value, {
    accessControl: ACCESS_CONTROL.BIOMETRY_ANY,
    accessible: ACCESSIBLE.WHEN_UNLOCKED,
    storage: STORAGE_TYPE.AES_GCM_NO_AUTH,
  });
};

export const removeSecureValue = async () => {
  await Keychain.resetGenericPassword();
};
