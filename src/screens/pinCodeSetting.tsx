import {View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {TPinCodeSetting} from 'src/types/stack';
import {customColor} from 'src/style/customColor';
import {Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PinCodeNumber from 'src/components/view/pinCodeNumber';
import Animated from 'react-native-reanimated';
import {staticStyles} from 'src/style/staticStyles';
import useBackButton from 'src/hook/common/useBackButton';
import {useDynamicStyle} from 'src/hook/common/useDynamicStyle';
import usePinCodeSetting from 'src/hook/setting/usePinCodeSetting';

const PinCodeSettingScreen = ({navigation}: TPinCodeSetting) => {
  const insets = useSafeAreaInsets();

  useBackButton(() => navigation.goBack());
  const {
    pinCodeArray,
    reEnter,
    dotsFilled,
    title,
    animatedStyle,
    onNumberPressSetting,
  } = usePinCodeSetting(navigation);

  const pinTyping = useDynamicStyle({
    padding: {paddingBottom: insets.bottom},
  });

  return (
    <SafeAreaView
      className="flex-1 justify-center items-center bg-brandLight"
      edges={['left', 'right']}>
      <View className="w-full h-2/3 flex items-center justify-center bg-brandLight">
        <Animated.View
          style={[staticStyles.pinCodeTopContainer, animatedStyle]}>
          <View className="w-16 h-16 flex justify-center items-center rounded-full bg-white">
            <MaterialCommunityIcons
              name={reEnter ? 'lock-check' : 'lock'}
              size={40}
              color={customColor.brandLight}
            />
          </View>
          <View className="w-2/3 flex items-center mt-6">
            <Text className="text-sm text-white">{title}</Text>
          </View>
          <View className="w-2/5 flex-row justify-around items-center mt-6">
            {dotsFilled.map((pin, idx) => (
              <MaterialCommunityIcons
                key={idx}
                name="circle"
                size={22}
                color={pin ? customColor.white : customColor.whiteOpacity}
              />
            ))}
          </View>
        </Animated.View>
      </View>
      <View className="w-full h-1/3 bg-white" style={pinTyping.pinCodeTyping}>
        {pinCodeArray.map(array => (
          <View key={array[0]} className="w-full h-1/4 flex-row">
            {array.map(digit => {
              return (
                <PinCodeNumber
                  key={digit}
                  item={digit}
                  onPress={() => onNumberPressSetting(digit)}
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
