import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useEffect, useMemo} from 'react';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {clamp, toFixed} from 'src/utils/progressBar';

export function useProgressBar({
  navigation,
  percent,
  durationMs = 500,
}: {
  navigation?: any;
  percent: number;
  durationMs?: number;
}) {
  const safePercent = useMemo(
    () => toFixed(clamp(Number.isFinite(percent) ? percent : 0, 0, 100), 1),
    [percent],
  );
  const progress = useSharedValue(0);

  // 네비가 없을 때: percent 변경 시 재생
  useEffect(() => {
    if (navigation) return;
    progress.value = withTiming(safePercent, {
      duration: durationMs,
      easing: Easing.out(Easing.cubic),
    });
  }, [navigation, safePercent, durationMs]);

  // 네비가 있을 때: 포커스마다 0→재생
  useFocusEffect(
    useCallback(() => {
      if (!navigation) return;
      progress.value = 0;
      progress.value = withTiming(safePercent, {
        duration: durationMs,
        easing: Easing.out(Easing.cubic),
      });
      return () => {};
    }, [navigation, safePercent, durationMs]),
  );

  const progressAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  return {safePercent, progressAnimatedStyle};
}
