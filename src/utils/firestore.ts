import firestore from '@react-native-firebase/firestore';
import {AppStory} from 'src/types/story';

const collection = firestore().collection('users');

export const _setDoc = async (data: AppStory) => {
  console.log('파이어스토어 생성');
  await collection.doc(data.uid).set(data);
};

export const _getDoc = async (uid: string) => {
  console.log('파이어스토어 읽기');
  const doc = await collection.doc(uid).get();

  return doc.data();
};

export const _deleteDoc = async (uid: string) => {
  console.log('파이어스토어 삭제');
  await collection.doc(uid).delete();
};
