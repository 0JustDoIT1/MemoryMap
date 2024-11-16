import firestore from '@react-native-firebase/firestore';
import {AppStory} from 'src/types/story';

const collection = firestore().collection('users');

export const _setDoc = async (data: AppStory) => {
  await collection.doc(data.uid).set(data);
};

export const _getDoc = async (uid: string) => {
  console.log('몇번?');
  const doc = await collection.doc(uid).get();

  return doc.data();
};

export const _deleteDoc = async (uid: string) => {
  await collection.doc(uid).delete();
};
