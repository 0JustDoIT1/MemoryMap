import {useCallback, useEffect, useMemo, useRef} from 'react';
import usePinCodeBase from './usePincodeBase';
import {PIN_LENGTH} from 'src/constants/app';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TStackParamList} from 'src/types/stack';
import {RouteProp} from '@react-navigation/native';
import {showBottomToast} from 'src/utils/showToast';

const usePinCodeEnter = (
  navigation: NativeStackNavigationProp<
    TStackParamList,
    'PinCodeEnter',
    undefined
  >,
  route: RouteProp<TStackParamList, 'PinCodeEnter'>,
) => {
  const {
    code,
    setCode,
    pinCodeArray,
    pushDigit,
    popDigit,
    getPinCodeToKeyChain,
    deletePinCodeToKeyChain,
    animatedStyle,
    wobbleScreen,
  } = usePinCodeBase();

  // 엔터 화면용 입력
  const onNumberPressEnter = useCallback(
    (digit: string | number) => {
      if (typeof digit === 'number') {
        setCode(prev => pushDigit(prev, digit));
      } else if (digit === 'delete') {
        setCode(prev => popDigit(prev));
      }
    },
    [pushDigit, popDigit],
  );

  const navigateAfterMatch = useCallback(
    async (target: string) => {
      if (target === 'Setting') {
        const ok = await deletePinCodeToKeyChain();
        if (!ok) return false;
        navigation.replace('Main', {screen: target});
      } else {
        if (target === 'PinCodeSetting') navigation.replace(target);
        else navigation.replace('Main', {screen: target});
      }
    },
    [deletePinCodeToKeyChain, navigation],
  );

  const matchPinCode = useCallback(async () => {
    try {
      const pinCode = await getPinCodeToKeyChain();
      if (!pinCode) return;
      const codeString = code.join('');

      if (pinCode && pinCode === codeString) {
        const target = route.params.route;
        await navigateAfterMatch(target);
      } else {
        wobbleScreen();
        setCode([]);
      }
    } catch (error) {
      showBottomToast('error', '핀코드 확인 중 오류가 발생했어요.');
      setCode([]);
    }
  }, [
    code,
    getPinCodeToKeyChain,
    route.params.route,
    navigateAfterMatch,
    wobbleScreen,
    setCode,
  ]);

  // 길이 감시 → 검증 트리거
  useEffect(() => {
    if (code.length === PIN_LENGTH) matchPinCode();
  }, [code.length, matchPinCode]);

  const dotsFilled = useMemo(
    () =>
      Array.from(
        {length: PIN_LENGTH},
        (_, i) => typeof code[i] !== 'undefined',
      ),
    [code],
  );

  return {
    pinCodeArray,
    dotsFilled,
    animatedStyle,
    onNumberPressEnter,
  };
};

export default usePinCodeEnter;
