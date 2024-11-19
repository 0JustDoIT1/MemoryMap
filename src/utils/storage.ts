import storage from '@react-native-firebase/storage';

const reference = storage();

export const _uploadStorage = async (uid: string, id: string, uri: string) => {
  return await reference.ref(`${uid}/korea/${id}`).putFile(uri);
};

export const _downloadStorage = async (uid: string, id: string) => {
  return await reference.ref(`${uid}/korea/${id}`).getDownloadURL();
};

export const _deleteStorage = async (uid: string, id: string) => {
  return await reference.ref(`${uid}/korea/${id}`).delete();
};

export const _deleteAllStorage = async (uid: string) => {
  return await reference
    .ref(`${uid}/korea/`)
    .listAll()
    .then(res => {
      const promises = res.items.map(file => file.delete());
      Promise.all(promises);
    });
};
