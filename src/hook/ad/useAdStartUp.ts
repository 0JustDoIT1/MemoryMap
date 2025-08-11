import {useEffect} from 'react';
import useAd from './useAd';
import {useAppInitAd} from 'src/store/appInitAd';

export const useAdStartup = () => {
  const {load, isClosed, isLoaded, show} = useAd();
  const appInitAd = useAppInitAd(state => state.appInitAd);
  const setAppInitAd = useAppInitAd(state => state.setAppInitAd);

  useEffect(() => {
    load(); // 항상 로드
  }, [load]);

  useEffect(() => {
    if (!appInitAd && isLoaded && !isClosed) {
      show();
      setAppInitAd(true);
    }
  }, [isLoaded, isClosed, appInitAd]);
};
