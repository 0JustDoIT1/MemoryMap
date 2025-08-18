import {useCallback, useState} from 'react';
import {useAppPinCode} from 'src/store/appPinCode';
import {KeyChainPinCode} from '@env';
import {
  getSecureValue,
  removeSecureValue,
  setSecureValue,
} from 'src/utils/security/keyChain';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {PIN_LENGTH} from 'src/constants/app';

const usePinCodeBase = () => {
  const setAppPinCode = useAppPinCode(state => state.setAppPinCode);

  const [code, setCode] = useState<number[]>([]);
  const [reEnter, setReEnter] = useState<boolean>(false);
  const [reCode, setReCode] = useState<number[]>([]);

  const pinCodeArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ['', 0, 'delete'],
  ];

  // 숫자 입력(공통)
  const pushDigit = useCallback((prev: number[], digit: number) => {
    if (prev.length >= PIN_LENGTH) return prev;
    return [...prev, digit].slice(0, PIN_LENGTH);
  }, []);
  const popDigit = useCallback((prev: number[]) => {
    if (prev.length === 0) return prev;
    return prev.slice(0, prev.length - 1);
  }, []);

  // Setting pincode to keyChain
  const setPinCodeToKeyChain = useCallback(
    async (pin: string) => {
      try {
        await setSecureValue(KeyChainPinCode, KeyChainPinCode, pin);
        setAppPinCode(true);

        return true;
      } catch {
        setAppPinCode(false);

        return false;
      }
    },
    [setAppPinCode],
  );

  // Get pinCode to KeyChain
  const getPinCodeToKeyChain = useCallback(async () => {
    try {
      return await getSecureValue(KeyChainPinCode).then(
        value => value?.password,
      );
    } catch {
      return false;
    }
  }, []);

  // Remove pinCode to KeyChain
  const deletePinCodeToKeyChain = useCallback(async () => {
    try {
      await removeSecureValue(KeyChainPinCode);
      setAppPinCode(false);
      return true;
    } catch {
      setAppPinCode(true);
      return false;
    }
  }, [setAppPinCode]);

  // If incorrect, Reanimated wobble
  const ANGLE = 3;
  const TIME = 30;
  const EASING = Easing.elastic(1);
  const rotation = useSharedValue<number>(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotateZ: `${rotation.value}deg`}],
  }));

  // Wobble Screen
  const wobbleScreen = useCallback(() => {
    rotation.value = withSequence(
      // deviate left to start from -ANGLE
      withTiming(-ANGLE, {duration: TIME / 2, easing: EASING}),
      // wobble between -ANGLE and ANGLE 3 times
      withRepeat(
        withTiming(ANGLE, {
          duration: TIME,
          easing: EASING,
        }),
        3,
        true,
      ),
      // go back to 0 at the end
      withTiming(0, {duration: TIME / 2, easing: EASING}),
    );
  }, []);

  return {
    code,
    setCode,
    reCode,
    setReCode,
    reEnter,
    setReEnter,
    pinCodeArray,
    pushDigit,
    popDigit,
    getPinCodeToKeyChain,
    deletePinCodeToKeyChain,
    setPinCodeToKeyChain,
    animatedStyle,
    wobbleScreen,
    setAppPinCode,
  };
};
export default usePinCodeBase;
