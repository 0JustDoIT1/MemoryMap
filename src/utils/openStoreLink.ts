import {Linking} from 'react-native';

const GOOGLE_PLAY_STORE_LINK = 'market://details?id=com.memorymap';
const GOOGLE_PLAY_STORE_WEB_LINK =
  'https://play.google.com/store/apps/details?id=com.memorymap';

export const onOpenStoreLink = async () => {
  const supported = await Linking.canOpenURL(GOOGLE_PLAY_STORE_LINK);

  if (supported) await Linking.openURL(GOOGLE_PLAY_STORE_LINK);
  else await Linking.openURL(GOOGLE_PLAY_STORE_WEB_LINK);
};
