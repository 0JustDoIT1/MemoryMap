import {FileSystem} from 'react-native-file-access';

// 안전한 base64 쓰기: 항상 unlink 이후 생성
export const writeBase64Retry = async (path?: string, b64?: string) => {
  if (!path || !b64) return;
  try {
    await FileSystem.unlink(path);
  } catch {} // 존재 안 해도 OK
  await FileSystem.writeFile(path, b64, 'base64');
};

// 삭제 유틸 (파일 없으면 무시, 삭제 실패는 에러)
export const safeUnlink = async (path?: string | null) => {
  if (!path) return; // 경로 없으면 무시

  const exists = await FileSystem.exists(path);
  if (!exists) return; // 파일이 없으면 무시

  // 존재한다고 확인됐는데 삭제 실패하면 반드시 throw
  await FileSystem.unlink(path);
};
