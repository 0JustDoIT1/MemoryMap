import React, {useRef} from 'react';
import {Dimensions, Platform} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import ViewShot from 'react-native-view-shot';
import CustomFAB from 'src/components/fab';
import KoreaMapSvg from 'src/components/koreaMapSvg';
import MapSheet from 'src/components/mapSheet';
import useFAB from 'src/hook/useFAB';
import useMapSheet from 'src/hook/useMapSheet';
import {customStyle} from 'src/style/customStyle';
import {MapProps} from 'src/types/stack';
import {hasAndroidPermission} from 'src/utils/getCheckPermission';
import {showBottomToast} from 'src/utils/showToast';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {Portal} from 'react-native-paper';

const {width, height} = Dimensions.get('screen');

const clamp = (val: number, min: number, max: number) => {
  return Math.min(Math.max(val, min), max);
};

const MapScreen = ({navigation, route}: MapProps) => {
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
      .then(async uri => await saveScreenShot(uri));
  };

  const saveScreenShot = async (uri: string) => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return showBottomToast('error', '갤러리 접근 권한을 허용해주세요.');
    }
    return await CameraRoll.saveAsset(uri);
  };

  return (
    <Portal.Host>
      <SafeAreaView className="flex-1 justify-center items-center w-screen h-screen bg-white dark:bg-black">
        <ViewShot
          ref={viewShotRef}
          style={customStyle().viewShot}
          options={{fileName: 'MemoryMap', format: 'jpg', quality: 1}}>
          <GestureDetector gesture={composed}>
            <Animated.View style={[customStyle().mapBox, animatedStyles]}>
              <KoreaMapSvg handleMapModalPress={handleMapModalPress} />
            </Animated.View>
          </GestureDetector>
        </ViewShot>
        <MapSheet
          navigation={navigation}
          mapSheetModalRef={mapSheetModalRef}
          snapPoints={snapPoints}
          handleClosePress={handleClosePress}
          renderBackdrop={renderBackdrop}
          id={id}
          title={title}
          tag={tag}
        />
        <CustomFAB
          open={open}
          onChangeFAB={onChangeFAB}
          icon1="camera"
          label1="지도 저장"
          onPress1={onCaptureMap}
          icon2="refresh"
          label2="지도 초기화"
          onPress2={() => {}}
        />
      </SafeAreaView>
    </Portal.Host>
  );
};

export default MapScreen;
