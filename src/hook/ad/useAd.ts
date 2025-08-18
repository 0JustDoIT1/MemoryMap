import {AdUnitId} from '@env';
import {useInterstitialAd} from 'react-native-google-mobile-ads';
import {
  AD_COUNT_STORAGE_KEY,
  AD_COUNTED,
  adShowCategory,
  appAdMapCount,
  appAdMapMaxNum,
  appAdStoryMaxNum,
  MAX_BY_AD_COUNT,
} from 'src/constants/app';
import {IAppAdShowCategory} from 'src/types/app';
import {getAsyncStorage, setAsyncStorage} from 'src/utils/storage/asyncStorage';

const useAd = () => {
  const {load, show, isClosed, isOpened, isLoaded} = useInterstitialAd(
    AdUnitId,
    {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing', 'game'],
    },
  );

  const checkAdShow = async (type: IAppAdShowCategory) => {
    if (!AD_COUNTED.has(type)) return true;
    if (!AD_COUNT_STORAGE_KEY[type] || !MAX_BY_AD_COUNT[type]) return true;

    const current = Number((await getAsyncStorage(appAdMapCount)) ?? 0);
    const max = MAX_BY_AD_COUNT[type];
    const storageKey = AD_COUNT_STORAGE_KEY[type];

    if (current >= max) {
      await setAsyncStorage(storageKey, '0');
      return true;
    } else {
      await setAsyncStorage(storageKey, String(current + 1));
      return false;
    }
  };

  return {load, show, isClosed, isOpened, isLoaded, checkAdShow};
};

export default useAd;
