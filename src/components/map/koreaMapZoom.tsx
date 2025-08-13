import {View} from 'react-native';
import {Portal} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BlurView} from '@react-native-community/blur';
import {staticStyles} from 'src/style/staticStyles';
import {useRef} from 'react';
import {useAppTheme} from 'src/style/paperTheme';
import ViewShot from 'react-native-view-shot';
import Toast from 'react-native-toast-message';
import {ToastConfig} from 'src/components/feedback/toast';
import {IKoreaRegionData} from 'src/types/koreaMap';
import {koreaMapSvgData} from 'src/constants/koreaMapData';
import useZoomImageControl from 'src/hook/map/useZoomImageControl';
import KoreaMapZoomSvg from './koreaMapZoomSvg';
import KoreaMapZoomActionButton from './KoreaMapZoomActionButton';

interface IKoreaMapZoom {
  data: IKoreaRegionData;
  setZoom: React.Dispatch<React.SetStateAction<boolean>>;
}

const KoreaMapZoom = ({data, setZoom}: IKoreaMapZoom) => {
  const theme = useAppTheme();
  const viewShotRef = useRef<ViewShot>(null);
  // Get Svg Data
  const regionSvgData = koreaMapSvgData[data.id];

  const {handleSave, handleShare, handleClose} = useZoomImageControl(
    data,
    setZoom,
    viewShotRef,
  );

  if (!regionSvgData) return null;

  return (
    <Portal>
      <SafeAreaView className="flex-1">
        <BlurView
          blurType="light"
          blurAmount={20}
          reducedTransparencyFallbackColor="rgba(0,0,0,0.4)"
          style={staticStyles.blurScreen}
        />
        <View className="w-full h-full p-12 flex items-center">
          <ViewShot
            ref={viewShotRef}
            style={staticStyles.blurViewShot}
            options={{fileName: 'MemoryMap', format: 'jpg', quality: 1}}>
            <KoreaMapZoomSvg
              region={regionSvgData}
              imageUrl={data.zoomImageUrl}
            />
          </ViewShot>
          <View className="absolute bottom-20 w-full flex-row justify-center items-center">
            <KoreaMapZoomActionButton
              icon="camera-outline"
              size={28}
              label="캡처"
              color={theme.colors.darkGray}
              onPress={handleSave}
            />
            <KoreaMapZoomActionButton
              icon="share-variant"
              size={26}
              label="공유"
              color={theme.colors.darkGray}
              onPress={handleShare}
            />
            <KoreaMapZoomActionButton
              icon="window-close"
              size={28}
              label="닫기"
              color={theme.colors.darkGray}
              onPress={handleClose}
            />
          </View>
        </View>
        <Toast config={ToastConfig} />
      </SafeAreaView>
    </Portal>
  );
};

export default KoreaMapZoom;
