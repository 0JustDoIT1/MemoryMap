import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import {useDynamicStyle} from 'src/hook/common/useDynamicStyle';
import {useProgressBar} from 'src/hook/common/useProgressBar';
import {TStackParamList} from 'src/types/stack';
import {calcPercentTextMargin} from 'src/utils/ui/progressBar';

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
  const titleStyles = useDynamicStyle({color: textColor});
  const barStyles = useDynamicStyle({bgColor});
  const fillStyles = useDynamicStyle({bgColor: color});
  const percentStyles = useDynamicStyle({
    color: textColor,
    margin: percentTextMargin,
  });

  return (
    <View
      className="w-full"
      accessibilityRole="progressbar"
      accessibilityValue={{now: safePercent, min: 0, max: 100}}>
      {title && <Text style={titleStyles.progressBarTitle}>{title}</Text>}
      <View style={barStyles.progressBar}>
        <Animated.View
          style={[fillStyles.progressBarFill, progressAnimatedStyle]}
        />
      </View>
      {percentView && (
        <Text style={percentStyles.progressBarText}>{safePercent}%</Text>
      )}
    </View>
  );
};

export default CustomProgressBar;
