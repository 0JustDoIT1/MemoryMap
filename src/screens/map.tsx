import React, {useLayoutEffect, useRef, lazy, Suspense} from 'react';
import {useWindowDimensions, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import ViewShot from 'react-native-view-shot';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TMap} from 'src/types/stack';
import {onCaptureAndSave, onCaptureAndShare} from 'src/utils/media/screenshot';
import {useAppTheme} from 'src/style/paperTheme';
import {staticStyles} from 'src/style/staticStyles';
import useExitApp from 'src/hook/common/useExitApp';
import {GestureDetector} from 'react-native-gesture-handler';
import {useAdStartup} from 'src/hook/ad/useAdStartUp';
import {useKoreaMapShow} from 'src/hook/map/useKoreaMapShow';
import {useKoreaMapAnimation} from 'src/hook/map/useKoreaMapAnimation';
import KoreaMapSkeleton from 'src/components/map/koreaMapSkeleton';

const KoreaMapLazy = lazy(() => import('src/components/map/koreaMap'));

const MapScreen = ({navigation}: TMap) => {
  const {width, height} = useWindowDimensions();
  const theme = useAppTheme();

  const headerIconColor = theme.colors.darkGray;

  const viewShotRef = useRef<ViewShot | null>(null);

  const {animatedStyles, composed} = useKoreaMapAnimation(width, height);
  const {show} = useKoreaMapShow();

  useAdStartup();
  useExitApp();

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
        style={staticStyles.mapViewShot}
        options={{fileName: 'MemoryMap', format: 'jpg', quality: 1}}>
        <GestureDetector gesture={composed}>
          <Animated.View style={[staticStyles.mapBox, animatedStyles]}>
            {!show ? (
              <KoreaMapSkeleton />
            ) : (
              <Suspense fallback={<KoreaMapSkeleton />}>
                <KoreaMapLazy />
              </Suspense>
            )}
          </Animated.View>
        </GestureDetector>
      </ViewShot>
    </SafeAreaView>
  );
};

export default MapScreen;
