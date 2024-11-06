import storage from '@react-native-firebase/storage';

const reference = storage();

export const _upload = async (uid: string, id: string, uri: string) => {
  return await reference.ref(`${uid}/korea/${id}`).putFile(uri);
};

export const _download = async (uid: string, id: string) => {
  return await reference.ref(`${uid}/korea/${id}`).getDownloadURL();
};

export const _delete = async (uid: string, id: string) => {
  return await reference.ref(`${uid}/korea/${id}`).delete();
};

export const _deleteAll = async (uid: string) => {
  return await reference
    .ref(`${uid}/korea/`)
    .listAll()
    .then(res => {
      const promises = res.items.map(file => file.delete());
      Promise.all(promises);
    });
};
