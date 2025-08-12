import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {DimensionValue, View} from 'react-native';
import {Text} from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {customStyle} from 'src/style/customStyle';
import {TStackParamList} from 'src/types/stack';

interface CustomProgressBar {
  navigation?: NativeStackNavigationProp<TStackParamList, any, undefined>;
  title?: string;
  percent: number;
  percentView?: boolean;
  color: string;
  bgColor: string;
  textColor?: string;
}

const CustomProgressBar = ({
  navigation,
  title,
  percent,
  percentView,
  color,
  bgColor,
  textColor,
}: CustomProgressBar) => {
  const percentTextMargin: {
    marginLeft?: DimensionValue;
    marginRight?: DimensionValue;
  } =
    percent - 4 < 0
      ? {marginRight: 'auto'}
      : percent - 4 > 90
        ? {marginLeft: 'auto'}
        : {marginLeft: `${percent - 4}%`};

  const progress = useSharedValue(0);

  const progressAnimatedStyle = useAnimatedStyle(() => {
    progress.value = withTiming(percent, {duration: 500});

    return {
      width: `${progress.value}%`,
    };
  });

  useEffect(() => {
    if (navigation) {
      const focusScreen = navigation?.addListener('focus', () => {
        progress.value = 0;
      });
      return focusScreen;
    } else progress.value = percent;
  }, [navigation]);

  return (
    <View className="w-full">
      {title && (
        <Text style={customStyle({color: textColor}).progressBarTitle}>
          {title}
        </Text>
      )}
      <View
        style={
          customStyle({
            bgColor: bgColor,
          }).progressBar
        }>
        <Animated.View
          style={[
            customStyle({
              bgColor: color,
            }).progressBarFill,
            progressAnimatedStyle,
          ]}
        />
      </View>
      {percentView && (
        <Text
          style={
            customStyle({color: textColor, margin: percentTextMargin})
              .progressBarText
          }>
          {percent}%
        </Text>
      )}
    </View>
  );
};

export default CustomProgressBar;
