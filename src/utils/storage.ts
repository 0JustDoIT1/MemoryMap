import storage from '@react-native-firebase/storage';

const reference = storage();

export const _uploadStorage = async (uid: string, id: string, uri: string) => {
  console.log('스토리지 생성');
  return await reference.ref(`${uid}/korea/${id}`).putFile(uri);
};

export const _downloadStorage = async (uid: string, id: string) => {
  console.log('스토리지 읽기');
  return await reference.ref(`${uid}/korea/${id}`).getDownloadURL();
};

export const _deleteStorage = async (uid: string, id: string) => {
  console.log('스토리지 삭제');
  return await reference.ref(`${uid}/korea/${id}`).delete();
};

export const _deleteAllStorage = async (uid: string) => {
  console.log('스토리지 전부 삭제');
  return await reference
    .ref(`${uid}/korea/`)
    .listAll()
    .then(res => {
      const promises = res.items.map(file => file.delete());
      Promise.all(promises);
    });
};
