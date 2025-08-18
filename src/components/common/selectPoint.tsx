import {useCallback, useEffect} from 'react';
import {Image, Keyboard, Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useDynamicStyle} from 'src/hook/common/useDynamicStyle';
import {IPoint} from 'src/types/point';

interface SelectPoint {
  item: IPoint;
  point: number;
  setPoint: React.Dispatch<React.SetStateAction<number>>;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SelectPoint = ({item, point, setPoint}: SelectPoint) => {
  const isSelected = item.point === point;

  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(isSelected ? 1.2 : 1, {
      damping: 12,
      stiffness: 180,
      mass: 0.6,
    });
  }, [isSelected]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const onPress = useCallback(() => {
    Keyboard.dismiss();
    setPoint(item.point);
  }, [item.point, setPoint]);

  const styles = useDynamicStyle({color: item.color});

  return (
    <AnimatedPressable
      key={item.point}
      className="flex items-center"
      style={animatedStyle}
      onPress={onPress}>
      <View className="w-[50px] h-[50px] bg-white rounded-full shadow-sm shadow-black">
        <Image style={{width: 50, height: 50}} source={item.image} />
      </View>
      <Text className="mt-1" style={styles.storyPointIconText}>
        {item.text}
      </Text>
    </AnimatedPressable>
  );
};

export default SelectPoint;
