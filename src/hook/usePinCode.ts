import {KeyChainPinCode} from '@env';
import {useState} from 'react';
import {useSetRecoilState} from 'recoil';
import {appPinCodeState} from 'src/recoil/atom';
import {
  getSecureValue,
  removeSecureValue,
  setSecureValue,
} from 'src/utils/keyChain';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const usePinCode = () => {
  const setAppPinCode = useSetRecoilState(appPinCodeState);

  const [code, setCode] = useState<number[]>([]);
  const [reEnter, setReEnter] = useState<boolean>(false);
  const [reCode, setReCode] = useState<number[]>([]);

  const pinCodeArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ['', 0, 'delete'],
  ];
  const pinLength = 4;

  // Press Number enter page
  const onNumberPressEnter = (item: string | number) => {
    if (typeof item === 'number') setCode([...code, item].splice(0, pinLength));
    else if (item === 'delete') setCode(code.splice(0, code.length - 1));
  };

  // Press Number setting page
  const onNumberPressSetting = (item: string | number) => {
    if (reEnter) {
      if (typeof item === 'number')
        setReCode([...reCode, item].splice(0, pinLength));
      else if (item === 'delete')
        setReCode(reCode.splice(0, reCode.length - 1));
    } else {
      if (typeof item === 'number')
        setCode([...code, item].splice(0, pinLength));
      else if (item === 'delete') setCode(code.splice(0, code.length - 1));
    }
  };

  // Get pinCode to KeyChain
  const getPinCodeToKeyChain = async () => {
    return await getSecureValue(KeyChainPinCode).then(value => value?.password);
  };

  // Remove pinCode to KeyChain
  const deletePinCodeToKeyChain = async () => {
    return await removeSecureValue(KeyChainPinCode);
  };

  // Setting pincode to keyChain
  const setPinCodeToKeyChain = async (pinCode: string) => {
    try {
      await setSecureValue(KeyChainPinCode, KeyChainPinCode, pinCode);
      setAppPinCode(true);
    } catch (error) {
      setAppPinCode(false);
    }
  };

  // If incorrect, set screen wobble
  const ANGLE = 3;
  const TIME = 30;
  const EASING = Easing.elastic(1);

  const rotation = useSharedValue<number>(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotateZ: `${rotation.value}deg`}],
  }));

  // Wobble Screen
  const wobbleScreen = () => {
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
  };

  return {
    pinCodeArray,
    pinLength,
    code,
    setCode,
    reCode,
    setReCode,
    reEnter,
    setReEnter,
    onNumberPressEnter,
    onNumberPressSetting,
    animatedStyle,
    setAppPinCode,
    getPinCodeToKeyChain,
    deletePinCodeToKeyChain,
    setPinCodeToKeyChain,
    wobbleScreen,
  };
};

export default usePinCode;
