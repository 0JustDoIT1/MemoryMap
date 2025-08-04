import React, {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  useMemo,
} from 'react';
import {useWindowDimensions, Pressable, InteractionManager} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import ViewShot from 'react-native-view-shot';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TMap} from 'src/types/stack';
import {onCaptureAndSave, onCaptureAndShare} from 'src/utils/screenshot';
import {useAppTheme} from 'src/style/paperTheme';
import {customStyle} from 'src/style/customStyle';
import useAd from 'src/hook/useAd';
import useExitApp from 'src/hook/useExitApp';
import KoreaMap from 'src/components/map/koreaMap';
import {useAppInitAd} from 'src/store/appInitAd';
import LoadingScreen from './loadingScreen';
import {useMapAnimation} from 'src/hook/useMapAnimation';
import {getMaxScale} from 'src/constants/map';
import {GestureDetector} from 'react-native-gesture-handler';

const MapScreen = ({navigation}: TMap) => {
  // 2. 외부 훅 호출
  const {width, height} = useWindowDimensions();
  const theme = useAppTheme();

  // 3. 상태 관리 훅
  const appInitAd = useAppInitAd(state => state.appInitAd);
  const setAppInitAd = useAppInitAd(state => state.setAppInitAd);
  const [showMap, setShowMap] = useState(false);

  // 4. 커스텀 훅
  const MAX_SCALE = getMaxScale(width, height);
  const {animatedStyles, composed} = useMapAnimation(width, height, MAX_SCALE);

  // 5. ref 선언
  const viewShotRef = useRef<ViewShot | null>(null);

  // 6. 핸들러/콜백 함수 (필요시 분리)
  // 현재는 별도 핸들러 없음

  // 7. useEffect, useLayoutEffect 등 사이드 이펙트
  const {load, isClosed, isLoaded, show} = useAd();
  useExitApp();

  useEffect(() => {
    load(); // 항상 로드
  }, [load]);

  useEffect(() => {
    if (!appInitAd && isLoaded && !isClosed) {
      show();
      setAppInitAd(true);
    }
  }, [isLoaded, isClosed, appInitAd]);

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      setShowMap(true);
    });
    return () => task.cancel();
  }, []);

  const headerIconColor = theme.colors.darkGray;

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

  const styles = useMemo(() => customStyle(), []);

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
            {!showMap && <LoadingScreen />}
            {showMap && <KoreaMap />}
          </Animated.View>
        </GestureDetector>
      </ViewShot>
    </SafeAreaView>
  );
};

export default MapScreen;
