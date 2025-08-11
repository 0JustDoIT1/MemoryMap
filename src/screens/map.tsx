import React, {useLayoutEffect, useRef, useMemo} from 'react';
import {useWindowDimensions, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import ViewShot from 'react-native-view-shot';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TMap} from 'src/types/stack';
import {onCaptureAndSave, onCaptureAndShare} from 'src/utils/screenshot';
import {useAppTheme} from 'src/style/paperTheme';
import {customStyle} from 'src/style/customStyle';
import useExitApp from 'src/hook/useExitApp';
import KoreaMap from 'src/components/map/koreaMap';
import LoadingScreen from './loadingScreen';
import {useMapAnimation} from 'src/hook/useMapAnimation';
import {GestureDetector} from 'react-native-gesture-handler';
import {useAdStartup} from 'src/hook/ad/useAdStartUp';
import {useKoreaMapShow} from 'src/hook/map/useKoreaMapShow';

const MapScreen = ({navigation}: TMap) => {
  const {width, height} = useWindowDimensions();
  const theme = useAppTheme();

  const headerIconColor = theme.colors.darkGray;

  const viewShotRef = useRef<ViewShot | null>(null);

  const {animatedStyles, composed} = useMapAnimation(width, height);
  const {show} = useKoreaMapShow();

  useAdStartup();
  useExitApp();

  const styles = useMemo(() => customStyle(), []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          className="px-6"
          onPress={() => onCaptureAndSave(viewShotRef)}>
          <MaterialCommunityIcons
            name="camera-outline"
            color={headerIconColor}
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
            color={headerIconColor}
            size={26}
          />
        </Pressable>
      ),
    });
  }, [navigation, headerIconColor]);

  // 8. 렌더링/JSX 반환
  return (
    <SafeAreaView
      className="flex-1 justify-start items-center bg-white"
      edges={['top', 'bottom', 'left', 'right']}>
      <ViewShot
        ref={viewShotRef}
        style={styles.mapViewShot}
        options={{fileName: 'MemoryMap', format: 'jpg', quality: 1}}>
        <GestureDetector gesture={composed}>
          <Animated.View style={[styles.mapBox, animatedStyles]}>
            {!show && <LoadingScreen />}
            {show && <KoreaMap />}
          </Animated.View>
        </GestureDetector>
      </ViewShot>
    </SafeAreaView>
  );
};

export default MapScreen;
