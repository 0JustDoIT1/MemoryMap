import {FileSystem} from 'react-native-file-access';

// 안전한 base64 쓰기: 항상 unlink 이후 생성
export const writeBase64Retry = async (path?: string, b64?: string) => {
  if (!path || !b64) return;
  try {
    await FileSystem.unlink(path);
  } catch {} // 존재 안 해도 OK
  await FileSystem.writeFile(path, b64, 'base64');
};
