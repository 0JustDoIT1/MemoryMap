import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {Gesture} from 'react-native-gesture-handler';
import {MAP_EDGE_OFFSET, MIN_SCALE} from 'src/constants/map';
import {useEffect, useMemo} from 'react';

const clamp = (val: number, min: number, max: number) => {
  'worklet';
  return Math.min(Math.max(val, min), max);
};

export function useKoreaMapAnimation(width: number, height: number) {
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);
  const scale = useSharedValue(1);
  const startScale = useSharedValue(0);

  const containerW = useSharedValue(width);
  const containerH = useSharedValue(height);
  const maxScale = useSharedValue(Math.min(width / 80, height / 80));

  useEffect(() => {
    containerW.value = width;
    containerH.value = height;
    maxScale.value = Math.min(width / 80, height / 80);
  }, [width, height]);

  const resetTransform = () => {
    'worklet';
    scale.value = withTiming(1, {duration: 180});
    translationX.value = withTiming(0, {duration: 180});
    translationY.value = withTiming(0, {duration: 180});
  };

  // Pinch (Zoom)
  const pinch = useMemo(
    () =>
      Gesture.Pinch()
        .onStart(() => {
          'worklet';
          startScale.value = scale.value;
        })
        .onUpdate(e => {
          'worklet';
          const nextScale = startScale.value * e.scale;
          scale.value = clamp(nextScale, MIN_SCALE, maxScale.value);
        })
        .onEnd(() => {
          'worklet';
          if (scale.value <= 1) {
            resetTransform();
          }
        }),
    [],
  );

  // Pan (Move)
  const pan = useMemo(
    () =>
      Gesture.Pan()
        .averageTouches(true)
        .onStart(() => {
          'worklet';
          if (scale.value > 1) {
            prevTranslationX.value = translationX.value;
            prevTranslationY.value = translationY.value;
          }
        })
        .onUpdate(e => {
          'worklet';
          if (scale.value > 1) {
            const maxX = containerW.value / 2 - MAP_EDGE_OFFSET;
            const maxY = containerH.value / 2 - MAP_EDGE_OFFSET;

            translationX.value = clamp(
              prevTranslationX.value + e.translationX,
              -maxX,
              maxX,
            );
            translationY.value = clamp(
              prevTranslationY.value + e.translationY,
              -maxY,
              maxY,
            );
          }
        })
        .onEnd(() => {
          'worklet';
          if (scale.value <= 1) {
            resetTransform();
          }
        }),
    [],
  );

  const doubleTap = useMemo(
    () =>
      Gesture.Tap()
        .numberOfTaps(2)
        .onEnd(() => {
          if (scale.value > 1) {
            // 리셋
            scale.value = withTiming(1, {duration: 180});
            translationX.value = withTiming(0, {duration: 180});
            translationY.value = withTiming(0, {duration: 180});
          } else {
            // 중앙 기준 빠른 확대 (필요시 포인트 기준 확대로 확장)
            scale.value = withTiming(Math.min(2, maxScale.value), {
              duration: 180,
            });
          }
        }),
    [],
  );

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {scale: scale.value},
        {translateX: translationX.value},
        {translateY: translationY.value},
      ],
    };
  });

  const composed = useMemo(
    () => Gesture.Simultaneous(pinch, pan, doubleTap),
    [pinch, pan, doubleTap],
  );

  return {
    animatedStyles,
    composed,
  };
}
