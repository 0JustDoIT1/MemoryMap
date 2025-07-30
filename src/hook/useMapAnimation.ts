import {useSharedValue, useAnimatedStyle} from 'react-native-reanimated';
import {Gesture} from 'react-native-gesture-handler';
import {MAP_EDGE_OFFSET, MIN_SCALE} from 'src/constants/map';

const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

export function useMapAnimation(
  width: number,
  height: number,
  MAX_SCALE: number,
) {
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);
  const scale = useSharedValue(1);
  const startScale = useSharedValue(0);

  const resetTransform = () => {
    scale.value = 1;
    translationX.value = 0;
    translationY.value = 0;
  };

  // Pinch (Zoom)
  const pinch = Gesture.Pinch()
    .onStart(() => {
      startScale.value = scale.value;
    })
    .onUpdate(event => {
      const nextScale = startScale.value * event.scale;
      scale.value = clamp(nextScale, MIN_SCALE, MAX_SCALE);
    })
    .onEnd(() => {
      if (scale.value <= 1) {
        resetTransform();
      }
    })
    .runOnJS(true);

  // Pan (Move)
  const pan = Gesture.Pan()
    .averageTouches(true)
    .onStart(() => {
      if (scale.value > 1) {
        prevTranslationX.value = translationX.value;
        prevTranslationY.value = translationY.value;
      }
    })
    .onUpdate(event => {
      if (scale.value > 1) {
        const maxX = width / 2 - MAP_EDGE_OFFSET;
        const maxY = height / 2 - MAP_EDGE_OFFSET;

        translationX.value = clamp(
          prevTranslationX.value + event.translationX,
          -maxX,
          maxX,
        );
        translationY.value = clamp(
          prevTranslationY.value + event.translationY,
          -maxY,
          maxY,
        );
      }
    })
    .onEnd(() => {
      if (scale.value <= 1) {
        resetTransform();
      }
    })
    .runOnJS(true);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {scale: scale.value},
        {translateX: translationX.value},
        {translateY: translationY.value},
      ],
    };
  });

  const composed = Gesture.Simultaneous(pinch, pan);

  return {
    animatedStyles,
    composed,
  };
}
