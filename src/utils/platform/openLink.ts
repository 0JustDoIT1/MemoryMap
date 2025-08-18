import {Linking} from 'react-native';
import {showBottomToast} from '../ui/showToast';

const GOOGLE_PLAY_STORE_LINK = 'market://details?id=com.memorymap';
const GOOGLE_PLAY_STORE_WEB_LINK =
  'https://play.google.com/store/apps/details?id=com.memorymap';

export const onOpenStoreLink = async () => {
  const supported = await Linking.canOpenURL(GOOGLE_PLAY_STORE_LINK);

  if (supported) await Linking.openURL(GOOGLE_PLAY_STORE_LINK);
  else await Linking.openURL(GOOGLE_PLAY_STORE_WEB_LINK);
};

export const safeOpen = async (url: string) => {
  const can = await Linking.canOpenURL(url);
  if (!can) {
    showBottomToast('error', '링크를 열 수 없습니다.');
    return;
  }
  await Linking.openURL(url);
};
