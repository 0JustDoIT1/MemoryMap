import {firebase} from '@react-native-firebase/database';
import {FireBaseDataBase} from '@env';
import {AppData} from 'src/types/account';

const reference = firebase.app().database(FireBaseDataBase);

export const _setRealtime = (data: AppData) => {
  return reference.ref(`/users/${data.uid}`).set(data);
};

export const _updateRealtime = (data: AppData) => {
  return reference.ref(`/users/${data.uid}`).update(data);
};

export const _readRealtime = (uid: string) => {
  return reference.ref(`/users/${uid}`).once('value');
};

export const _deleteRealtime = (uid: string) => {
  return reference.ref(`/users/${uid}`).remove();
};
