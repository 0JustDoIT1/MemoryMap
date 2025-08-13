import {useCallback, useEffect, useMemo} from 'react';
import usePinCodeBase from './usePincodeBase';
import {PIN_LENGTH} from 'src/constants/app';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TStackParamList} from 'src/types/stack';

const usePinCodeSetting = (
  navigation: NativeStackNavigationProp<
    TStackParamList,
    'PinCodeSetting',
    undefined
  >,
) => {
  const {
    code,
    setCode,
    reCode,
    setReCode,
    reEnter,
    setReEnter,
    pinCodeArray,
    pushDigit,
    popDigit,
    setPinCodeToKeyChain,
    animatedStyle,
    wobbleScreen,
  } = usePinCodeBase();

  const onNumberPressSetting = useCallback(
    (v: string | number) => {
      if (reEnter) {
        if (typeof v === 'number') setReCode(prev => pushDigit(prev, v));
        else if (v === 'delete') setReCode(prev => popDigit(prev));
      } else {
        if (typeof v === 'number') setCode(prev => pushDigit(prev, v));
        else if (v === 'delete') setCode(prev => popDigit(prev));
      }
    },
    [reEnter, pushDigit, popDigit],
  );

  // code와 reCode 값 비교 + 성공/실패 처리 (네비게이션 포함)
  const matchPinCode = useCallback(async () => {
    const ok = code.toString() === reCode.toString();
    if (ok) {
      const pin = code.join('');
      await setPinCodeToKeyChain(pin);
      navigation.replace('Main', {screen: 'Setting'});
    } else {
      wobbleScreen();
      setReEnter(false);
      setCode([]);
      setReCode([]);
    }
  }, [
    code,
    reCode,
    setPinCodeToKeyChain,
    navigation,
    wobbleScreen,
    setReEnter,
    setCode,
    setReCode,
  ]);

  // 길이 감시 → 단계 전환/검증
  useEffect(() => {
    if (code.length === PIN_LENGTH) {
      if (reCode.length === 0) {
        setReEnter(true);
      } else if (reCode.length === PIN_LENGTH) {
        // 재입력 완료 → 비교 실행
        matchPinCode();
      }
    }
  }, [code.length, reCode.length, setReEnter, matchPinCode]);

  // UI 도우미
  const dotsFilled = useMemo(() => {
    const arr = reEnter ? reCode : code;
    return Array.from(
      {length: PIN_LENGTH},
      (_, i) => typeof arr[i] !== 'undefined',
    );
  }, [reEnter, code, reCode]);

  const title = reEnter
    ? '암호를 다시 입력해 주세요.'
    : '암호를 입력해 주세요.';

  return {
    pinCodeArray,
    PIN_LENGTH,
    reEnter,
    dotsFilled,
    title,
    animatedStyle,
    onNumberPressSetting,
  };
};

export default usePinCodeSetting;
