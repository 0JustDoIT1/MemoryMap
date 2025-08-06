import React from 'react';
import {LayoutChangeEvent, Pressable, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {IGetColorRegionList} from 'src/types/koreaMap';

interface Accordion<T> {
  title: string;
  item: T;
  onSelect: (value: string) => void;
}

const CustomAccordion = ({
  title,
  item,
  onSelect,
}: Accordion<IGetColorRegionList>) => {
  const regionItem = item[title];

  const height = useSharedValue<number>(0);
  const expanded = useSharedValue<boolean>(false);
  const animatedHeight = useDerivedValue(() =>
    expanded.value
      ? withTiming(height.value, {duration: 200})
      : withTiming(0, {duration: 200}),
  );
  const iconRotation = useDerivedValue(() =>
    expanded.value
      ? withTiming('180deg', {duration: 200})
      : withTiming('0deg', {duration: 200}),
  );

  const onPressAccordion = () => {
    if (regionItem.child) {
      expanded.value = !expanded.value;
    } else {
      onSelect(regionItem.sub[0].id);
    }
  };

  const onLayout = (event: LayoutChangeEvent) => {
    const onLayoutHeight = event.nativeEvent.layout.height;

    if (onLayoutHeight > 0) {
      height.value = onLayoutHeight;
    }
  };

  const iconRotationStyle = useAnimatedStyle(() => ({
    transform: [{rotate: iconRotation.value}],
  }));

  const accordionListStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
  }));

  return (
    <View className="w-full bg-white rounded-md my-1 border">
      <Pressable
        className="flex-row justify-between items-center p-4"
        onPress={onPressAccordion}>
        <Text>{title}</Text>
        {regionItem.child && (
          <Animated.View style={iconRotationStyle}>
            <MaterialCommunityIcons
              name="chevron-down"
              color="#000000"
              size={20}
            />
          </Animated.View>
        )}
      </Pressable>
      <Animated.View
        className="overflow-hidden bg-gray-100 rounded-b-md"
        style={accordionListStyle}>
        <View className="absolute w-full px-4" onLayout={onLayout}>
          {regionItem.sub.map((value, index: number) => (
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

export default CustomAccordion;
