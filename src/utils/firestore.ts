import firestore from '@react-native-firebase/firestore';
import {AppStory} from 'src/types/story';

const collection = firestore().collection('users');

export const _setCollection = async (data: AppStory) => {
  await collection.doc(data.uid).set(data);
};

export const _getCollection = async (uid: string) => {
  console.log('몇번?');
  const doc = await collection.doc(uid).get();

  return doc.data();
};
