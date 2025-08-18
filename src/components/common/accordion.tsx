import React, {useCallback} from 'react';
import {LayoutChangeEvent, Pressable, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {IColoredRegionList} from 'src/types/koreaMap';

interface Accordion<T> {
  title: string;
  item: T;
  onSelect: (value: string) => void;
}

const DURATION = 200;

const CustomAccordion = ({
  title,
  item,
  onSelect,
}: Accordion<IColoredRegionList>) => {
  const regionItem = item[title];
  const hasChildren = !!regionItem.child;

  const measuredHeight = useSharedValue<number>(0);
  const expanded = useSharedValue<boolean>(false);
  const progress = useDerivedValue(() =>
    withTiming(expanded.value ? 1 : 0, {
      duration: DURATION,
      easing: Easing.out(Easing.cubic),
    }),
  );

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height;
    if (h > 0 && Math.abs(h - measuredHeight.value) > 1) {
      measuredHeight.value = h;
    }
  }, []);

  const onPressAccordion = useCallback(() => {
    if (regionItem.child) {
      expanded.value = !expanded.value;
    } else {
      const first = regionItem.sub?.[0];
      if (first?.id) onSelect(first.id);
    }
  }, [regionItem, onSelect]);

  const accordionListStyle = useAnimatedStyle(() => ({
    height: measuredHeight.value * progress.value,
    opacity: progress.value === 0 ? 0 : 1,
  }));

  const iconRotationStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${progress.value * 180}deg`}],
  }));

  return (
    <View className="w-full bg-white rounded-md my-1 border">
      <Pressable
        className="flex-row justify-between items-center p-4"
        onPress={onPressAccordion}>
        <Text>{title}</Text>
        {hasChildren && (
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
