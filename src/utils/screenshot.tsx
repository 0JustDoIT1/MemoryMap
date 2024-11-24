import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {Platform} from 'react-native';
import ViewShot from 'react-native-view-shot';
import {hasAndroidPermission} from 'src/utils/getCheckPermission';
import {showBottomToast} from 'src/utils/showToast';

export const onCaptureMap = async (viewShotRef: React.RefObject<ViewShot>) => {
  try {
    const viewShotUri = await viewShotRef.current?.capture?.();
    if (viewShotUri) {
      await onSaveScreenShot(viewShotUri);
    }
  } catch (error) {
    onCaptureMapError(error);
  }
};

const onCaptureMapError = (error: any) => {
  showBottomToast('error', '지도 캡처에 실패했습니다.');
};

// 스크린샷 갤러리에 저장
const onSaveScreenShot = async (uri: string) => {
  if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
    return showBottomToast('error', '갤러리 접근 권한을 허용해주세요.');
  }

  try {
    await CameraRoll.saveAsset(uri);
    onSaveScreenShotSuccess();
  } catch (error) {
    onSaveScreenShotError(error);
  }
};

const onSaveScreenShotSuccess = () => {
  showBottomToast('success', '갤러리에 저장되었습니다!');
};

const onSaveScreenShotError = (error: any) => {
  showBottomToast('error', '사진 저장에 실패했습니다.');
};
