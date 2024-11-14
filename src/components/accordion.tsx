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
import {GetColorRegionList} from 'src/types/koreaMap';

interface Accordion<T> {
  title: string;
  item: T;
  onSelect: (value: string) => void;
}

const CustomAccordion = ({
  title,
  item,
  onSelect,
}: Accordion<GetColorRegionList>) => {
  const height = useSharedValue<number>(0);
  const expanded = useSharedValue<boolean>(false);
  const animatedHeight = useSharedValue<number>(0);
  const iconRotation = useDerivedValue<number>(() =>
    expanded.value
      ? withTiming(1, {duration: 200})
      : withTiming(0, {duration: 200}),
  );

  const onPressAccordion = () => {
    if (item[title].child) {
      expanded.value = !expanded.value;
    } else {
      onSelect(item[title].sub[0].id);
    }
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
      ? withTiming(height.value, {duration: 200})
      : withTiming(0, {duration: 200});

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
        {item[title].child && (
          <Animated.View style={iconRotationStyle}>
            <Ionicons name="chevron-down" color="#000000" size={20} />
          </Animated.View>
        )}
      </Pressable>
      <Animated.View
        className="overflow-hidden bg-gray-100 rounded-b-md"
        style={accordionListStyle}>
        <View className="absolute w-full px-4" onLayout={onLayout}>
          {item[title].sub.map((value, index: number) => (
            <React.Fragment key={value.id}>
              {index !== 0 && <Divider className="w-full bg-blur" />}
              <Pressable className="py-4" onPress={() => onSelect(value.id)}>
                <Text>{value.title}</Text>
              </Pressable>
            </React.Fragment>
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

const MemoizedAccordion = React.memo(CustomAccordion);

export default MemoizedAccordion;
