import {
  get,
  getDatabase,
  ref,
  remove,
  set,
  update,
} from '@react-native-firebase/database';
import {FirebaseRealtime} from '@env';
import {getApp} from '@react-native-firebase/app';

const app = getApp();
const db = getDatabase(app, FirebaseRealtime);
const dbRef = (uid: string) => ref(db, 'users/' + uid);

interface IRealtimeData {
  data: string;
  date: string;
}

export const setRealtime = async (uid: string, data: IRealtimeData) => {
  try {
    await set(dbRef(uid), data);
  } catch (err) {
    console.error('setRealtime error', err);
    throw err;
  }
};

export const updateRealtime = async (uid: string, data: IRealtimeData) => {
  try {
    await update(dbRef(uid), data);
  } catch (err) {
    console.error('updateRealtime error', err);
    throw err;
  }
};

export const readRealtime = async (uid: string) => {
  try {
    const snapshot = await get(dbRef(uid));
    return snapshot.val() as IRealtimeData | null;
  } catch (err) {
    console.error('readRealtime error', err);
    throw err;
  }
};

export const readRealtimeDate = async (uid: string) => {
  try {
    const snapshot = await get(ref(db, `users/${uid}/date`));
    return (snapshot.val() as string | null) ?? null;
  } catch (err) {
    console.error('readRealtimeDate error', err);
    throw err;
  }
};

export const deleteRealtime = async (uid: string) => {
  try {
    await remove(dbRef(uid));
  } catch (err) {
    console.error('deleteRealtime error', err);
    throw err;
  }
};
