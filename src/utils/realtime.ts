import {firebase} from '@react-native-firebase/database';
import {FireBaseDataBase} from '@env';
import {AppKoreaMapData} from 'src/types/koreaMap';
import {AppRegionCount} from 'src/types/regionCount';

const reference = firebase.app().database(FireBaseDataBase);

export const _setRealtime = async (
  data: AppKoreaMapData | AppRegionCount,
  path: 'map' | 'count',
) => {
  console.log('리얼타임 생성');
  return await reference.ref(`/users/${data.uid}/${path}`).set(data);
};

export const _updateRealtime = async (
  data: AppKoreaMapData | AppRegionCount,
  path: 'map' | 'count',
) => {
  console.log('리얼타임 업데이트');
  return await reference.ref(`/users/${data.uid}/${path}`).update(data);
};

export const _readRealtime = async (uid: string, path: 'map' | 'count') => {
  console.log('리얼타임 읽기');
  return await reference.ref(`/users/${uid}/${path}`).once('value');
};

export const _deleteRealtime = async (uid: string, path: 'map' | 'count') => {
  console.log('리얼타임 삭제');
  return await reference.ref(`/users/${uid}/${path}`).remove();
};
