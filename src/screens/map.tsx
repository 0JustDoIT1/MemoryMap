import React from 'react';
import {Dimensions} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import KoreaMapSvg from 'src/components/koreaMapSvg';
import MapBottomSheet from 'src/components/mapBottomSheet';
import useCustomBottomSheet from 'src/hook/useBottomSheet';
import {customStyle} from 'src/style/customStyle';
import {MapProps} from 'src/types/stack';

const {width, height} = Dimensions.get('screen');

const clamp = (val: number, min: number, max: number) => {
  return Math.min(Math.max(val, min), max);
};

const MapScreen = ({navigation}: MapProps) => {
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);
  const scale = useSharedValue(1);
  const startScale = useSharedValue(0);

  const pinch = Gesture.Pinch()
    .onStart(() => {
      startScale.value = scale.value;
    })
    .onUpdate(event => {
      scale.value = clamp(
        startScale.value * event.scale,
        0.5,
        Math.min(width / 100, height / 100),
      );
    })
    .onEnd(() => {
      if (scale.value <= 1) {
        scale.value = 1;
        translationX.value = 0;
        translationY.value = 0;
      }
    })
    .runOnJS(true);

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
        const maxTranslateX = width / 2 - 70;
        const maxTranslateY = height / 2 - 70;

        translationX.value = clamp(
          prevTranslationX.value + event.translationX,
          -maxTranslateX,
          maxTranslateX,
        );
        translationY.value = clamp(
          prevTranslationY.value + event.translationY,
          -maxTranslateY,
          maxTranslateY,
        );
      }
    })
    .onEnd(() => {
      if (scale.value <= 1) {
        scale.value = 1;
        translationX.value = 0;
        translationY.value = 0;
      }
    })
    .runOnJS(true);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {scale: scale.value},
      {translateX: translationX.value},
      {translateY: translationY.value},
    ],
  }));

  const composed = Gesture.Simultaneous(pinch, pan);

  const {
    bottomSheetModalRef,
    snapPoints,
    bottomSheetTitle,
    handleMapModalPress,
    handleClosePress,
    renderBackdrop,
    tag,
  } = useCustomBottomSheet();

  const onChangeBackground = () => {
    // if (background === 'url(#image)') setBackground('#ffffff');
    // else setBackground('url(#image)');
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center w-screen h-screen bg-white dark:bg-black">
      <GestureDetector gesture={composed}>
        <Animated.View style={[customStyle().mapBox, animatedStyles]}>
          <KoreaMapSvg open={handleMapModalPress} />
        </Animated.View>
      </GestureDetector>
      <MapBottomSheet
        navigation={navigation}
        close={handleClosePress}
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        handleClosePress={handleClosePress}
        renderBackdrop={renderBackdrop}
        title={bottomSheetTitle}
        tag={tag}
      />
    </SafeAreaView>
  );
};

export default MapScreen;
