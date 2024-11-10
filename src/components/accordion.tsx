import React from 'react';
import {LayoutChangeEvent, Pressable, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Accordion {
  title: string;
  item: any;
}

const Accordion = ({title, item}: Accordion) => {
  const height = useSharedValue<number>(0);
  const expanded = useSharedValue<boolean>(false);
  const animatedHeight = useSharedValue<number>(0);
  const iconRotation = useDerivedValue<number>(() =>
    expanded.value ? withTiming(1) : withTiming(0),
  );

  const onPressAccordion = () => {
    if (item[title].length >= 1) expanded.value = !expanded.value;
  };

  const onLayout = (event: LayoutChangeEvent) => {
    const onLayoutHeight = event.nativeEvent.layout.height;

    if (onLayoutHeight > 0 && height.value !== onLayoutHeight) {
      height.value = onLayoutHeight;
    }
  };

  const iconRotationStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${iconRotation.value * 180}deg`}],
    };
  });

  const accordionListStyle = useAnimatedStyle(() => {
    animatedHeight.value = expanded.value
      ? withTiming(height.value)
      : withTiming(0);

    return {
      height: animatedHeight.value,
    };
  });

  return (
    <View className="w-full bg-white rounded-md my-1 border">
      <Pressable
        className="flex-row justify-between items-center p-4"
        onPress={onPressAccordion}>
        <Text>{title}</Text>
        {item[title].length >= 1 && (
          <Animated.View style={iconRotationStyle}>
            <Ionicons name="chevron-down" color="#000000" size={20} />
          </Animated.View>
        )}
      </Pressable>
      <Animated.View
        className="overflow-hidden bg-gray-100 rounded-b-md"
        style={accordionListStyle}>
        <View className="absolute w-full px-4" onLayout={onLayout}>
          {item[title].map((value: string, index: number) => (
            <React.Fragment key={value}>
              {index !== 0 && <Divider className="w-full bg-blur" />}
              <Pressable className="py-4">
                <Text>{value}</Text>
              </Pressable>
            </React.Fragment>
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

export default Accordion;
