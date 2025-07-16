import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PinCodeEnterProps} from 'src/types/stack';
import {customColor} from 'src/style/customColor';
import {Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PinCodeNumber from 'src/components/view/pinCodeNumber';
import {useEffect} from 'react';
import Animated from 'react-native-reanimated';
import {customStyle} from 'src/style/customStyle';
import {showBottomToast} from 'src/utils/showToast';
import usePinCode from 'src/hook/usePinCode';

const PinCodeEnterScreen = ({navigation, route}: PinCodeEnterProps) => {
  const {
    pinCodeArray,
    pinLength,
    code,
    setCode,
    onNumberPressEnter,
    animatedStyle,
    setAppPinCode,
    getPinCodeToKeyChain,
    deletePinCodeToKeyChain,
    wobbleScreen,
  } = usePinCode();

  // Screen navigating according to pinCode length and re pinCode length
  useEffect(() => {
    if (code.length === 4) matchPinCode();
  }, [code]);

  // Compare pinCode
  const matchPinCode = async () => {
    try {
      const pinCode = await getPinCodeToKeyChain();
      const codeString = code.join('');

      if (pinCode && pinCode === codeString) {
        if (route.params.route === 'Setting') {
          await deletePinCodeToKeyChain();
          setAppPinCode(false);
          navigation.replace('Main', {screen: route.params.route});
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

  return (
    <SafeAreaView
      className="flex-1 justify-center items-center bg-brandLight"
      edges={['bottom', 'left', 'right']}>
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
                  onPress={() => onNumberPressEnter(item)}
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
