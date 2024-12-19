import {useEffect} from 'react';
import {BackHandler} from 'react-native';

const useBackButton = (event: () => void) => {
  // Hardware BackButton Handler
  const onPressHardwareBackButton = () => {
    event();
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

export default useBackButton;
