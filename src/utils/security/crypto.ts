import CryptoJS from 'react-native-crypto-js';
import {CryptoSecretKey} from '@env';

export const encryptData = (data: string) => {
  return CryptoJS.AES.encrypt(data, CryptoSecretKey).toString();
};

export const decryptData = (data: string) => {
  return CryptoJS.AES.decrypt(data, CryptoSecretKey).toString(
    CryptoJS.enc.Utf8,
  );
};
