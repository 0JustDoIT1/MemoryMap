import React, {useRef} from 'react';
import {Dimensions, Platform} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import ViewShot from 'react-native-view-shot';
import useFAB from 'src/hook/useFAB';
import useMapSheet from 'src/hook/useMapSheet';
import {customStyle} from 'src/style/customStyle';
import {MapProps} from 'src/types/stack';
import {hasAndroidPermission} from 'src/utils/getCheckPermission';
import {showBottomToast} from 'src/utils/showToast';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import useDialog from 'src/hook/useDialog';
import useKoreaMap from 'src/hook/useKoreaMap';
import MemoizedKoreaMap from 'src/components/koreaMapSvg';
import MemoizedMapSheet from 'src/components/mapSheet';
import MemoizedCustomAlert from 'src/components/alert';
import MemoizedCustomFAB from 'src/components/fab';

const {width, height} = Dimensions.get('screen');

const clamp = (val: number, min: number, max: number) => {
  return Math.min(Math.max(val, min), max);
};

const MapScreen = ({navigation, route}: MapProps) => {
  console.log('맵');
  const viewShotRef = useRef<ViewShot>(null);

  const {
    mapSheetModalRef,
    snapPoints,
    title,
    tag,
    id,
    handleMapModalPress,
    handleClosePress,
    renderBackdrop,
  } = useMapSheet();
  const {open, onChangeFAB} = useFAB();
  const {visibleDialog, showDialog, hideDialog} = useDialog();
  const {resetMapData} = useKoreaMap();

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

  const onCaptureMap = async () => {
    await viewShotRef.current
      ?.capture?.()
      .then(async uri => await onSaveScreenShot(uri));
  };

  const onSaveScreenShot = async (uri: string) => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return showBottomToast('error', '갤러리 접근 권한을 허용해주세요.');
    }
    return await CameraRoll.saveAsset(uri).then(() =>
      onSaveScreenShotSuccess(),
    );
  };

  const onSaveScreenShotSuccess = () => {
    showBottomToast('success', '갤러리에 저장되었습니다!');
  };

  const onResetMap = async () => {
    await resetMapData().then(() => {
      hideDialog();
      showBottomToast('info', '지도를 새로 채워보세요!');
    });
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center w-screen h-screen bg-white">
      <ViewShot
        ref={viewShotRef}
        style={customStyle().viewShot}
        options={{fileName: 'MemoryMap', format: 'jpg', quality: 1}}>
        <GestureDetector gesture={composed}>
          <Animated.View style={[customStyle().mapBox, animatedStyles]}>
            <MemoizedKoreaMap handleMapModalPress={handleMapModalPress} />
          </Animated.View>
        </GestureDetector>
      </ViewShot>
      <MemoizedMapSheet
        navigation={navigation}
        mapSheetModalRef={mapSheetModalRef}
        snapPoints={snapPoints}
        handleClosePress={handleClosePress}
        renderBackdrop={renderBackdrop}
        id={id}
        title={title}
        tag={tag}
      />
      <MemoizedCustomFAB
        open={open}
        onChangeFAB={onChangeFAB}
        icon1="camera"
        label1="지도 저장"
        onPress1={onCaptureMap}
        icon2="refresh"
        label2="지도 초기화"
        onPress2={showDialog}
      />
      <MemoizedCustomAlert
        visible={visibleDialog}
        title="지도를 초기화하시겠습니까?"
        buttonText="초기화"
        buttonOnPress={onResetMap}
        hideAlert={hideDialog}
      />
    </SafeAreaView>
  );
};

export default MapScreen;
