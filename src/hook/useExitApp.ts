import {useCallback, useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import {showBottomToast} from 'src/utils/showToast';

const useExitApp = () => {
  const [backPressCount, setBackPressCount] = useState<number>(0);

  // Hardware BackButton Handler
  const onPressHardwareBackButton = useCallback(() => {
    if (backPressCount === 0) {
      setBackPressCount(backPressCount + 1);
      setTimeout(() => {
        setBackPressCount(0);
      }, 2000);

      showBottomToast(
        'blackOpacity',
        "'뒤로' 버튼을 한번 더 누르시면 종료됩니다.",
      );
    } else if (backPressCount === 1) {
      BackHandler.exitApp();
    }

    return true;
  }, [backPressCount]);

  useEffect(() => {
    BackHandler.addEventListener(
      'hardwareBackPress',
      onPressHardwareBackButton,
    );
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        onPressHardwareBackButton,
      );
    };
  }, []);
};

export default useExitApp;
