import {Image, Keyboard, Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {Point} from 'src/constants/point';
import {customStyle} from 'src/style/customStyle';

interface SelectPoint {
  item: Point;
  point: number;
  setPoint: React.Dispatch<React.SetStateAction<number>>;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SelectPoint = ({item, point, setPoint}: SelectPoint) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {scale: item.point === point ? withTiming(1.3) : withTiming(1)},
      ],
      elevation: 1,
    };
  });

  return (
    <AnimatedPressable
      key={item.point}
      className="flex items-center"
      style={animatedStyle}
      onPress={() => {
        Keyboard.dismiss();
        setPoint(item.point);
      }}>
      <View className="w-[50px] h-[50px] bg-white rounded-full shadow-sm shadow-black">
        <Image style={{width: 50, height: 50}} source={item.image} />
      </View>
      <Text
        className="mt-1"
        style={customStyle({color: item.color}).storyPointIconText}>
        {item.text}
      </Text>
    </AnimatedPressable>
  );
};

export default SelectPoint;
