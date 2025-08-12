import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import {useProgressBar} from 'src/hook/common/useProgressBar';
import {customStyle} from 'src/style/customStyle';
import {TStackParamList} from 'src/types/stack';
import {calcPercentTextMargin} from 'src/utils/progressBar';

interface CustomProgressBar {
  navigation?: NativeStackNavigationProp<TStackParamList, any, undefined>;
  title?: string;
  percent: number;
  percentView?: boolean;
  color: string;
  bgColor: string;
  textColor?: string;
  durationMs?: number;
}

const CustomProgressBar = ({
  navigation,
  title,
  percent,
  percentView = true,
  color,
  bgColor,
  textColor,
  durationMs = 500,
}: CustomProgressBar) => {
  const {safePercent, progressAnimatedStyle} = useProgressBar({
    navigation,
    percent,
    durationMs,
  });
  const percentTextMargin = calcPercentTextMargin(safePercent);

  return (
    <View
      className="w-full"
      accessibilityRole="progressbar"
      accessibilityValue={{now: safePercent, min: 0, max: 100}}>
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
          {safePercent}%
        </Text>
      )}
    </View>
  );
};

export default CustomProgressBar;
