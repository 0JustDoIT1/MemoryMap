import React, {lazy, Suspense, useRef} from 'react';
import {Dimensions} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import ViewShot from 'react-native-view-shot';
import useFAB from 'src/hook/useFAB';
import {customStyle} from 'src/style/customStyle';
import {MapProps} from 'src/types/stack';
import {showBottomToast} from 'src/utils/showToast';
import useDialog from 'src/hook/useDialog';
import useKoreaMap from 'src/hook/useKoreaMap';
import MemoizedCustomAlert from 'src/components/alert';
import MemoizedCustomFAB from 'src/components/fab';
import {onCaptureMap} from 'src/utils/screenshot';
import CustomActivityIndicator from 'src/components/activityIndicator';
import useRegionCount from 'src/hook/useRegionCount';
import useStory from 'src/hook/useStory';

const {width, height} = Dimensions.get('screen');

const clamp = (val: number, min: number, max: number) => {
  return Math.min(Math.max(val, min), max);
};

const MapScreen = ({navigation}: MapProps) => {
  console.log('맵');

  const KoreaMap = lazy(() => import('../components/koreaMapSvg'));

  const viewShotRef = useRef<ViewShot>(null);

  const {open, onChangeFAB} = useFAB();
  const {visibleDialog, showDialog, hideDialog} = useDialog();
  const {resetMapData} = useKoreaMap();
  const {resetStory} = useStory();
  const {resetRegionCount} = useRegionCount();

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

  // 지도 정보 초기화
  const onResetMap = async () => {
    try {
      await resetMapData();
      await resetStory();
      await resetRegionCount();

      onResetMapSuccess();
    } catch (error) {
      onResetMapError(error);
    }
  };

  const onResetMapSuccess = () => {
    hideDialog();
    showBottomToast('info', '지도를 새로 채워보세요!');
  };

  const onResetMapError = (error: any) => {
    showBottomToast('error', '지도 초기화에 실패했습니다.');
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center w-screen h-screen bg-white">
      <ViewShot
        ref={viewShotRef}
        style={customStyle().mapViewShot}
        options={{fileName: 'MemoryMap', format: 'jpg', quality: 1}}>
        <GestureDetector gesture={composed}>
          <Animated.View style={[customStyle().mapBox, animatedStyles]}>
            <Suspense fallback={<CustomActivityIndicator />}>
              <KoreaMap navigation={navigation} />
            </Suspense>
          </Animated.View>
        </GestureDetector>
      </ViewShot>
      <MemoizedCustomFAB
        open={open}
        onChangeFAB={onChangeFAB}
        icon1="camera"
        label1="지도 저장"
        onPress1={() => onCaptureMap(viewShotRef)}
        icon2="refresh"
        label2="지도 초기화"
        onPress2={showDialog}
      />
      <MemoizedCustomAlert
        visible={visibleDialog}
        title="지도를 초기화하시겠습니까?"
        description="스토리도 전부 삭제됩니다."
        buttonText="초기화"
        buttonOnPress={onResetMap}
        hideAlert={hideDialog}
      />
    </SafeAreaView>
  );
};

export default MapScreen;
