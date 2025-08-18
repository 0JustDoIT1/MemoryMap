import {AdUnitId} from '@env';
import {useInterstitialAd} from 'react-native-google-mobile-ads';
import {
  AD_COUNT_STORAGE_KEY,
  AD_COUNTED,
  MAX_BY_AD_COUNT,
} from 'src/constants/ad';
import {IAdShowCategory} from 'src/types/ad';
import {getAsyncStorage, setAsyncStorage} from 'src/utils/storage/asyncStorage';

const useAd = () => {
  const {load, show, isClosed, isOpened, isLoaded} = useInterstitialAd(
    AdUnitId,
    {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing', 'game'],
    },
  );

  const checkAdShow = async (type: IAdShowCategory) => {
    if (!AD_COUNTED.has(type)) return true;
    if (!AD_COUNT_STORAGE_KEY[type] || !MAX_BY_AD_COUNT[type]) return true;

    const max = MAX_BY_AD_COUNT[type];
    const storageKey = AD_COUNT_STORAGE_KEY[type];

    const current = Number((await getAsyncStorage(storageKey)) ?? 0);

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
