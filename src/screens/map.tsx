import React, {useEffect, useRef} from 'react';
import {Dimensions, Pressable} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import ViewShot from 'react-native-view-shot';
import {MapProps} from 'src/types/stack';
import {onCaptureAndSave, onCaptureAndShare} from 'src/utils/screenshot';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppTheme} from 'src/style/paperTheme';
import {customStyle} from 'src/style/customStyle';
import KoreaMapSvg from 'src/components/koreaMapSvg';
import {useRecoilState} from 'recoil';
import {appInitAdState} from 'src/recoil/atom';
import useAd from 'src/hook/useAd';

// Screen width & height
const {width, height} = Dimensions.get('screen');

// Limit a value within a specified range.
const clamp = (val: number, min: number, max: number) => {
  return Math.min(Math.max(val, min), max);
};

const MapScreen = ({navigation}: MapProps) => {
  const theme = useAppTheme();

  const [appInitAd, setAppInitAd] = useRecoilState(appInitAdState);
  const {load, isClosed, isLoaded, show} = useAd();

  useEffect(() => {
    load();
    if (!appInitAd && isLoaded && !isClosed) {
      show();
      setAppInitAd(true);
    }
  }, [isLoaded, load, appInitAd]);

  const viewShotRef = useRef<ViewShot>(null);

  // Header button
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          className="px-6"
          onPress={() => onCaptureAndSave(viewShotRef)}>
          <MaterialCommunityIcons
            name="camera-outline"
            color={theme.colors.darkGray}
            size={28}
          />
        </Pressable>
      ),
      headerRight: () => (
        <Pressable
          className="px-6"
          onPress={() => onCaptureAndShare(viewShotRef, '나만의 여행지도')}>
          <MaterialCommunityIcons
            name="share-variant"
            color={theme.colors.darkGray}
            size={26}
          />
        </Pressable>
      ),
    });
  }, [navigation]);

  // Setting map animation value
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);
  const scale = useSharedValue(1);
  const startScale = useSharedValue(0);

  // Pinch Animation(scale)
  const pinch = Gesture.Pinch()
    .onStart(() => {
      startScale.value = scale.value;
    })
    .onUpdate(event => {
      scale.value = clamp(
        startScale.value * event.scale,
        0.5,
        Math.min(width / 80, height / 80),
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

  // Pan Animation(move)
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

  // Animation Style
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {scale: scale.value},
      {translateX: translationX.value},
      {translateY: translationY.value},
    ],
  }));

  // Pinch + Pan Animation
  const composed = Gesture.Simultaneous(pinch, pan);

  return (
    <SafeAreaView
      className="flex-1 justify-start items-center bg-white"
      edges={['left', 'right']}>
      <ViewShot
        ref={viewShotRef}
        style={customStyle().mapViewShot}
        options={{fileName: 'MemoryMap', format: 'jpg', quality: 1}}>
        <GestureDetector gesture={composed}>
          <Animated.View style={[customStyle().mapBox, animatedStyles]}>
            <KoreaMapSvg />
          </Animated.View>
        </GestureDetector>
      </ViewShot>
    </SafeAreaView>
  );
};

export default MapScreen;
