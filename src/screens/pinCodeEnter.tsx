import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PinCodeEnterProps} from 'src/types/stack';
import {customColor} from 'src/style/customColor';
import {useSetRecoilState} from 'recoil';
import {appPinCodeState} from 'src/recoil/atom';
import {Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PinCodeNumber from 'src/components/pinCodeNumber';
import {useEffect, useState} from 'react';
import {KeyChainPinCode} from '@env';
import {getSecureValue, removeSecureValue} from 'src/utils/keyChain';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {customStyle} from 'src/style/customStyle';
import {showBottomToast} from 'src/utils/showToast';

const PinCodeEnterScreen = ({navigation, route}: PinCodeEnterProps) => {
  const setAppPinCode = useSetRecoilState(appPinCodeState);

  const pinCodeArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ['', 0, 'delete'],
  ];

  const pinLength = 4;

  const [code, setCode] = useState<number[]>([]);

  // pincode 입력
  const onNumberPress = (item: string | number) => {
    if (typeof item === 'number') setCode([...code, item].splice(0, pinLength));
    else if (item === 'delete') setCode(code.splice(0, code.length - 1));
  };

  // code length와 reCode length에 따라서 화면 전환
  useEffect(() => {
    if (code.length === 4) matchPinCode();
  }, [code]);

  // code와 reCode 값 비교
  const matchPinCode = async () => {
    try {
      const pinCode = await getPinCodeToKeyChain();
      const codeString = code.join('');

      if (pinCode && pinCode === codeString) {
        if (route.params.route === 'Setting') {
          await deletePinCodeToKeyChain();
          setAppPinCode(false);
          navigation.navigate('Main', {screen: route.params.route});
        } else {
          if (route.params.route === 'PinCodeSetting')
            navigation.replace(route.params.route);
          else navigation.replace('Main', {screen: route.params.route});
        }
      } else {
        wobbleScreen();
        setCode([]);
      }
    } catch (error) {
      showBottomToast('error', '핀코드 설정 에러');
    }
  };

  // KeyChain에 있는 pincode 값 가져오기
  const getPinCodeToKeyChain = async () => {
    return await getSecureValue(KeyChainPinCode).then(value => value?.password);
  };

  // KeyChain에 있는 pincode 값 제거
  const deletePinCodeToKeyChain = async () => {
    return await removeSecureValue(KeyChainPinCode);
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
              name="lock"
              size={40}
              color={customColor.brandLight}
            />
          </View>
          <View className="w-2/3 flex items-center mt-6">
            <Text className="text-sm text-white/80">암호를 입력해 주세요.</Text>
          </View>
          <View className="w-2/5 flex-row justify-around items-center mt-6">
            {[...Array(pinLength)].map((item, index) => {
              item = !!code[index];

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

export default PinCodeEnterScreen;
