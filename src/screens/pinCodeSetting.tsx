import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PinCodeSettingProps} from 'src/types/stack';
import {customColor} from 'src/style/customColor';
import {Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PinCodeNumber from 'src/components/pinCodeNumber';
import {useEffect} from 'react';
import Animated from 'react-native-reanimated';
import {customStyle} from 'src/style/customStyle';
import usePinCode from 'src/hook/usePinCode';

const PinCodeSettingScreen = ({navigation}: PinCodeSettingProps) => {
  const {
    pinCodeArray,
    pinLength,
    code,
    setCode,
    reCode,
    setReCode,
    reEnter,
    setReEnter,
    onNumberPressSetting,
    animatedStyle,
    setPinCodeToKeyChain,
    wobbleScreen,
  } = usePinCode();

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
      navigation.replace('Main', {screen: 'Setting'});
    } else {
      wobbleScreen();
      setReEnter(false);
      setCode([]);
      setReCode([]);
    }
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
              item = typeof code[index] === 'undefined' ? false : true;

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
                  onPress={() => onNumberPressSetting(item)}
                />
              );
            })}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default PinCodeSettingScreen;
