import storage from '@react-native-firebase/storage';

interface Download {
  uid: string;
  id: string;
}

interface Upload extends Download {
  uri: string;
}

const reference = storage();

export const _upload = async ({uid, id, uri}: Upload) => {
  return await reference.ref(`${uid}/korea/${id}.png`).putFile(uri);
};

export const _download = async ({uid, id}: Download) => {
  return await reference.ref(`${uid}/korea/${id}.png`).getDownloadURL();
};
