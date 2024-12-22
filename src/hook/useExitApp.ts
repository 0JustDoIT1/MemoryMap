import {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {showBottomToast} from 'src/utils/showToast';

const useExitApp = () => {
  let backPressCount = 0;

  // Hardware BackButton Handler
  const onPressHardwareBackButton = () => {
    if (backPressCount < 1) {
      backPressCount += 1;

      showBottomToast(
        'blackOpacity',
        "'뒤로' 버튼을 한번 더 누르시면 종료됩니다.",
      );
    } else if (backPressCount === 1) {
      BackHandler.exitApp();
    }
    setTimeout(() => {
      backPressCount = 0;
    }, 2000);

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
