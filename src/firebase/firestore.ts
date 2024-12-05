import firestore, {deleteDoc} from '@react-native-firebase/firestore';
import {Story} from 'src/types/story';

const collection = firestore().collection('users');

export const setDoc = async (data: Story) => {
  console.log('파이어스토어 생성');
  await collection.doc(data.id).set(data);
};

export const getDocAll = async (uid: string) => {
  console.log('파이어스토어 전부 읽기');
  const doc = await collection
    .where('uid', '==', uid)
    .get()
    .then(value => value.docs);

  return doc;
};

// export const getDocOne = async (id: string) => {
//   console.log('파이어스토어 하나 읽기');
//   const doc = await collection.doc(id).get();

//   return doc.data();
// };

export const deleteDocAll = async (uid: string) => {
  console.log('파이어스토어 전부 삭제');
  await collection
    .where('uid', '==', uid)
    .get()
    .then(value => value.docs.forEach(doc => deleteDoc(doc.ref)));
};

export const deleteDocOne = async (id: string) => {
  console.log('파이어스토어 하나 삭제');
  await collection.doc(id).delete();
};
