import storage from '@react-native-firebase/storage';

const reference = storage();

export const _upload = async (uid: string, id: string, uri: string) => {
  return await reference.ref(`${uid}/korea/${id}`).putFile(uri);
};

export const _download = async (uid: string, id: string) => {
  return await reference.ref(`${uid}/korea/${id}`).getDownloadURL();
};
