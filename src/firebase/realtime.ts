import {firebase} from '@react-native-firebase/database';
import {FireBaseDataBase} from '@env';
import {User} from 'src/types/account';
import {KoreaMapDataObject} from 'src/types/koreaMap';

const reference = firebase.app().database(FireBaseDataBase);

export const setRealtime = async (
  uid: string,
  data: User | KoreaMapDataObject,
  path: 'auth' | 'map',
) => {
  console.log('리얼타임 생성');
  return await reference.ref(`/users/${uid}/${path}`).set(data);
};

export const updateRealtime = async (
  uid: string,
  data: User | KoreaMapDataObject,
  path: 'auth' | 'map',
) => {
  console.log('리얼타임 업데이트');
  return await reference.ref(`/users/${uid}/${path}`).update(data);
};

export const readRealtime = async (uid: string, path: 'auth' | 'map') => {
  console.log('리얼타임 읽기');
  return await reference.ref(`/users/${uid}/${path}`).once('value');
};

export const deleteRealtime = async (uid: string, path: 'auth' | 'map') => {
  console.log('리얼타임 삭제');
  return await reference.ref(`/users/${uid}/${path}`).remove();
};
