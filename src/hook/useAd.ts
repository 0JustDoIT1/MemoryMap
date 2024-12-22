import {useInterstitialAd} from 'react-native-google-mobile-ads';
import {
  adUnitId,
  appAdMapCount,
  appAdMapMaxNum,
  appAdStoryMaxNum,
} from 'src/constants/app';
import {AppAdShowType} from 'src/types/appData';
import {getAsyncStorage, setAsyncStorage} from 'src/utils/asyncStorage';

const useAd = () => {
  const {load, show, isClosed, isOpened, isLoaded} = useInterstitialAd(
    adUnitId,
    {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing', 'game'],
    },
  );

  const checkAdShow = async (type: AppAdShowType) => {
    const count = await getAsyncStorage(appAdMapCount);
    const maxNum = type === 'map' ? appAdMapMaxNum : appAdStoryMaxNum;

    if (Number(count) === maxNum) {
      await setAsyncStorage(appAdMapCount, '0');
      return true;
    } else {
      await setAsyncStorage(appAdMapCount, `${Number(count) + 1}`);
      return false;
    }
  };

  return {load, show, isClosed, isOpened, isLoaded, checkAdShow};
};

export default useAd;
