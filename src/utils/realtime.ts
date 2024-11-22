import {firebase} from '@react-native-firebase/database';
import {FireBaseDataBase} from '@env';
import {AppData} from 'src/types/account';

const reference = firebase.app().database(FireBaseDataBase);

export const _setRealtime = (data: AppData) => {
  console.log('리얼타임 생성');
  return reference.ref(`/users/${data.uid}`).set(data);
};

export const _updateRealtime = (data: AppData) => {
  console.log('리얼타임 업데이트');
  return reference.ref(`/users/${data.uid}`).update(data);
};

export const _readRealtime = (uid: string) => {
  console.log('리얼타임 읽기');
  return reference.ref(`/users/${uid}`).once('value');
};

export const _deleteRealtime = (uid: string) => {
  console.log('리얼타임 삭제');
  return reference.ref(`/users/${uid}`).remove();
};
