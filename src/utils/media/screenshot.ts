import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {Platform} from 'react-native';
import ViewShot from 'react-native-view-shot';
import {appName} from 'src/constants/app';
import {hasAndroidPermission} from 'src/utils/platform/getCheckPermission';
import {showBottomToast} from 'src/utils/ui/showToast';
import Share from 'react-native-share';

// Capture screen
const onCaptureMap = async (
  viewShotRef: React.RefObject<ViewShot | null>,
): Promise<string | undefined> => {
  try {
    const uri = await viewShotRef.current?.capture?.();
    if (!uri) throw new Error('캡처 실패');

    return uri;
  } catch (error) {
    showBottomToast('error', '캡처에 실패했습니다.');
    return;
  }
};

// Save image to gallery
const onSaveScreenShot = async (uri: string) => {
  if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
    showBottomToast('error', '갤러리 접근 권한을 허용해주세요.');
    return;
  }

  try {
    await CameraRoll.saveAsset(uri, {type: 'photo'});
    showBottomToast('success', '갤러리에 저장되었습니다.');
  } catch (error) {
    showBottomToast('error', '저장에 실패했습니다.');
    return;
  }
};

// Share link
const onShareLink = async (uri: string, message: string) => {
  try {
    await Share.open({title: appName, message: message, url: uri});
  } catch (error) {
    // 사용자가 공유창에서 취소했을 경우도 여기로 들어오므로 silent 처리
    return;
  }
};

// Capture screen and save gallery
export const onCaptureAndSave = async (
  viewShotRef: React.RefObject<ViewShot | null>,
) => {
  const uri = await onCaptureMap(viewShotRef);
  if (uri) {
    await onSaveScreenShot(uri);
  }
};

// Capture screen and share
export const onCaptureAndShare = async (
  viewShotRef: React.RefObject<ViewShot | null>,
  message: string,
) => {
  const uri = await onCaptureMap(viewShotRef);
  if (uri) {
    await onShareLink(uri, message);
  }
};
