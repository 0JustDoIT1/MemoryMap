import React from 'react';
import {Pressable} from 'react-native';
import {Text} from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {customColor} from 'src/style/customColor';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface PinCodeNumber {
  item: string | number;
  onPress: () => void;
}

const PinCodeNumber = ({item, onPress}: PinCodeNumber) => {
  const itemText =
    item === 'delete' ? (
      <MaterialCommunityIcons
        name="backspace-outline"
        size={20}
        color={customColor.backdrop}
      />
    ) : (
      <Text className="text-lg">{item}</Text>
    );

  const press = useSharedValue<boolean>(false);
  const bgColor = useSharedValue('#ffffff');
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    bgColor.value = press.value ? customColor.outline : '#ffffff';
    opacity.value = press.value ? 0.3 : 1;

    return {
      backgroundColor: bgColor.value,
      opacity: opacity.value,
    };
  });

  const onPressIn = () => {
    press.value = true;
  };

  const onPressOut = () => {
    press.value = false;
  };

  return (
    <AnimatedPressable
      key={item}
      className="w-1/3 h-full flex justify-center items-center"
      style={animatedStyle}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={item === ''}>
      {itemText}
    </AnimatedPressable>
  );
};

export default PinCodeNumber;
