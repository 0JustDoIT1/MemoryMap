import {useEffect, useRef} from 'react';
import {BackHandler} from 'react-native';
import {showBottomToast} from 'src/utils/showToast';

const useExitApp = () => {
  const backPressCount = useRef(0);

  // Hardware BackButton Handler
  const onPressHardwareBackButton = () => {
    if (backPressCount.current < 1) {
      backPressCount.current += 1;

      showBottomToast(
        'blackOpacity',
        "'뒤로' 버튼을 한번 더 누르시면 종료됩니다.",
      );

      setTimeout(() => {
        backPressCount.current = 0;
      }, 2000);
    } else {
      BackHandler.exitApp();
    }

    return true;
  };

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
