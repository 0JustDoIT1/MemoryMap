import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PinCodeSettingProps} from 'src/types/stack';
import {customColor} from 'src/style/customColor';
import {useSetRecoilState} from 'recoil';
import {appPinCodeState} from 'src/recoil/atom';
import {Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PinCodeNumber from 'src/components/pinCodeNumber';
import {useEffect, useState} from 'react';
import {showBottomToast} from 'src/utils/showToast';
import {setSecureValue} from 'src/utils/keyChain';
import {KeyChainPinCode} from '@env';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {customStyle} from 'src/style/customStyle';

const PinCodeInitScreen = ({navigation}: PinCodeSettingProps) => {
  const setAppPinCode = useSetRecoilState(appPinCodeState);

  const pinCodeArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ['', 0, 'delete'],
  ];

  const pinLength = 4;

  const [code, setCode] = useState<number[]>([]);
  const [reEnter, setReEnter] = useState<boolean>(false);
  const [reCode, setReCode] = useState<number[]>([]);

  // pincode 입력
  const onNumberPress = (item: string | number) => {
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

  // code length와 reCode length에 따라서 화면 전환
  useEffect(() => {
    if (code.length === 4) {
      if (reCode.length === 0) setReEnter(true);
      else if (reCode.length === 4) matchPinCode();
    }
  }, [code, reCode]);

  // code와 reCode 값 비교
  const matchPinCode = () => {
    if (code.toString() === reCode.toString()) {
      const codeString = code.join('');
      setPinCodeToKeyChain(codeString);
    } else {
      wobbleScreen();
      setReEnter(false);
      setCode([]);
      setReCode([]);
    }
  };

  // pincode를 keyChain에 세팅
  const setPinCodeToKeyChain = async (pinCode: string) => {
    await setSecureValue(KeyChainPinCode, KeyChainPinCode, pinCode)
      .then(() => setPinCodeToKeyChainSuccess())
      .catch(error => setPinCodeToKeyChainError(error));
  };

  const setPinCodeToKeyChainSuccess = () => {
    setAppPinCode(true);
    navigation.goBack();
    showBottomToast('success', '잠금화면을 설정했습니다.');
  };

  const setPinCodeToKeyChainError = (error: any) => {
    setAppPinCode(false);
    navigation.goBack();
    showBottomToast('error', '잠금화면 설정에 실패했습니다.');
  };

  // 틀렸을 경우, 화면 흔들림 설정
  const ANGLE = 3;
  const TIME = 30;
  const EASING = Easing.elastic(1);

  const rotation = useSharedValue<number>(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotateZ: `${rotation.value}deg`}],
  }));

  // 화면 흔들림
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

  return (
    <SafeAreaView
      className="flex-1 justify-center items-center bg-brandLight"
      edges={['left', 'right']}>
      <View className="w-full h-2/3 flex items-center justify-center bg-brandLight">
        <Animated.View
          style={[customStyle().pinCodeTopContainer, animatedStyle]}>
          <View className="w-16 h-16 flex justify-center items-center rounded-full bg-white">
            <MaterialCommunityIcons
              name={reEnter ? 'lock-check' : 'lock'}
              size={40}
              color={customColor.brandLight}
            />
          </View>
          <View className="w-2/3 flex items-center mt-6">
            <Text className="text-sm text-white/80">
              {reEnter ? '암호를 다시 입력해 주세요.' : '암호를 입력해 주세요.'}
            </Text>
          </View>
          <View className="w-2/5 flex-row justify-around items-center mt-6">
            {[...Array(pinLength)].map((item, index) => {
              item = reEnter ? !!reCode[index] : !!code[index];

              return (
                <MaterialCommunityIcons
                  key={index}
                  name="circle"
                  size={22}
                  color={item ? customColor.white : customColor.whiteOpacity}
                />
              );
            })}
          </View>
        </Animated.View>
      </View>
      <View className="w-full h-1/3 bg-white">
        {pinCodeArray.map(array => (
          <View key={array[0]} className="w-full h-1/4 flex-row">
            {array.map(item => {
              return (
                <PinCodeNumber
                  key={item}
                  item={item}
                  onPress={() => onNumberPress(item)}
                />
              );
            })}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default PinCodeInitScreen;
