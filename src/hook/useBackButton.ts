import {useEffect, useRef} from 'react';
import {BackHandler} from 'react-native';

const useBackButton = (handler: () => void) => {
  // 최신 handler를 항상 참조할 수 있도록 ref 사용
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    // Hardware BackButton Handler
    const onPressHardwareBackButton = () => {
      handlerRef.current(); // 최신 핸들러 호출
      return true;
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onPressHardwareBackButton,
    );

    return () => {
      subscription.remove(); // React Native 0.65 이상에서 권장
    };
  }, []);
};

export default useBackButton;
