import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {Platform} from 'react-native';
import ViewShot from 'react-native-view-shot';
import {appName} from 'src/constants/app';
import {hasAndroidPermission} from 'src/utils/getCheckPermission';
import {showBottomToast} from 'src/utils/showToast';
import Share from 'react-native-share';

// Capture screen
const onCaptureMap = async (viewShotRef: React.RefObject<ViewShot>) => {
  try {
    const viewShotUri = await viewShotRef.current?.capture?.();
    return viewShotUri;
  } catch (error) {
    showBottomToast('error', '지도 캡처에 실패했습니다.');
  }
};

// Save image to gallery
const onSaveScreenShot = async (uri: string) => {
  if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
    return showBottomToast('error', '갤러리 접근 권한을 허용해주세요.');
  }

  try {
    await CameraRoll.saveAsset(uri, {type: 'photo'});
    showBottomToast('success', '갤러리에 저장되었습니다.');
  } catch (error) {
    showBottomToast('error', '사진 저장에 실패했습니다.');
  }
};

// Share link
const onShareLink = async (uri: string, message: string) => {
  try {
    await Share.open({title: appName, message: message, url: uri});
    showBottomToast('success', '이미지를 공유했습니다.');
  } catch (error) {
    return;
  }
};

// Capture screen and save gallery
export const onCaptureAndSave = async (
  viewShotRef: React.RefObject<ViewShot>,
) => {
  const uri = await onCaptureMap(viewShotRef);
  if (uri) await onSaveScreenShot(uri);
};

// Capture screen and share
export const onCaptureAndShare = async (
  viewShotRef: React.RefObject<ViewShot>,
  message: string,
) => {
  const uri = await onCaptureMap(viewShotRef);
  if (uri) await onShareLink(uri, message);
};
