import React from 'react';
import {Pressable} from 'react-native';
import {Text} from 'react-native-paper';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {customColor} from 'src/style/customColor';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface PinCodeNumber {
  item: string | number;
  onPress: () => void;
}

const PinCodeNumber = ({item, onPress}: PinCodeNumber) => {
  const isEmpty = item === '';
  const isDelete = item === 'delete';

  const pressed = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const bg = interpolateColor(
      pressed.value,
      [0, 1],
      ['#FFFFFF', customColor.outline],
    );
    const op = 1 - 0.7 * pressed.value; // 1 -> 0.3
    return {backgroundColor: bg, opacity: op};
  }, []);

  const onPressIn = () => {
    pressed.value = withTiming(1, {duration: 80});
  };

  const onPressOut = () => {
    pressed.value = withTiming(0, {duration: 120});
  };

  return (
    <AnimatedPressable
      className="w-1/3 h-full flex justify-center items-center"
      style={animatedStyle}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={isEmpty}
      accessibilityRole="button"
      accessibilityLabel={isDelete ? '삭제' : String(item)}>
      {isDelete ? (
        <MaterialCommunityIcons
          name="backspace-outline"
          size={20}
          color={customColor.backdrop}
        />
      ) : (
        <Text className="text-lg">{item}</Text>
      )}
    </AnimatedPressable>
  );
};

export default PinCodeNumber;
