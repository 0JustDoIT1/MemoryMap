import {BackHandler, Pressable, View} from 'react-native';
import {Portal, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Svg, {Defs, Image, Path, Pattern, Polygon} from 'react-native-svg';
import {getRegionTitle, getSvgDataById} from 'src/utils/koreaMap.util';
import {BlurView} from '@react-native-community/blur';
import {customStyle} from 'src/style/customStyle';
import {useEffect, useRef} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppTheme} from 'src/style/paperTheme';
import ViewShot from 'react-native-view-shot';
import {onCaptureAndSave, onCaptureAndShare} from 'src/utils/screenshot';
import Toast from 'react-native-toast-message';
import {toastConfig} from 'src/style/toast.config';
import {KoreaRegionData} from 'src/types/koreaMap';

interface ZoomImage {
  data: KoreaRegionData;
  setZoom: React.Dispatch<React.SetStateAction<boolean>>;
}

const ZoomImage = ({data, setZoom}: ZoomImage) => {
  const theme = useAppTheme();

  const viewShotRef = useRef<ViewShot>(null);

  // Get Svg Data
  const svgData = getSvgDataById(data.id);

  const width = data.imageStyle?.width! / svgData.svgStyle?.width!;
  const height = data.imageStyle?.height! / svgData.svgStyle?.height!;
  const ratio = data.imageStyle?.width! / data.imageStyle?.height!;

  // Hardware BackButton Handler
  const onPressHardwareBackButton = () => {
    setZoom(false);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener(
      'hardwareBackPress',
      onPressHardwareBackButton,
    );
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        onPressHardwareBackButton,
      );
    };
  }, []);

  return (
    <Portal>
      <SafeAreaView className="flex-1">
        <BlurView
          blurType="light"
          blurAmount={30}
          style={customStyle().blurScreen}
        />
        <View className="w-full h-full p-12 flex items-center">
          <ViewShot
            ref={viewShotRef}
            style={customStyle().blurViewShot}
            options={{fileName: 'MemoryMap', format: 'jpg', quality: 1}}>
            <Svg id="Layer_2" width="100%" height="100%" viewBox="0 0 960 1110">
              <Defs>
                <Pattern id="image" patternUnits="userSpaceOnUse">
                  <Image
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidyMid slice"
                    href={data.imageUrl}
                  />
                </Pattern>
              </Defs>
              {svgData.svgType === 'path' && (
                <Path
                  fill="url(#image)"
                  stroke="#000000"
                  strokeWidth="2"
                  d={svgData.svgPath}
                />
              )}
              {svgData.svgType === 'polygon' && (
                <Polygon
                  fill="url(#image)"
                  stroke="#000000"
                  strokeWidth="2"
                  points={svgData.svgPath}
                />
              )}
            </Svg>
          </ViewShot>
          <View className="absolute bottom-20 w-full flex-row justify-center items-center">
            <View className="flex items-center">
              <Pressable
                className="w-12 h-12 rounded-full mx-6 bg-white flex justify-center items-center"
                onPress={() => onCaptureAndSave(viewShotRef)}>
                <MaterialCommunityIcons
                  name="camera-outline"
                  size={28}
                  color={theme.colors.darkGray}
                />
              </Pressable>
              <Text className="mt-1 text-xs text-darkGray">캡처</Text>
            </View>
            <View className="flex items-center">
              <Pressable
                className="w-12 h-12 rounded-full mx-6 bg-white flex justify-center items-center"
                onPress={() =>
                  onCaptureAndShare(
                    viewShotRef,
                    `나만의 ${getRegionTitle(data)}`,
                  )
                }>
                <MaterialCommunityIcons
                  name="share-variant"
                  size={26}
                  color={theme.colors.darkGray}
                />
              </Pressable>
              <Text className="mt-1 text-xs text-darkGray">공유</Text>
            </View>
            <View className="flex items-center">
              <Pressable
                className="w-12 h-12 rounded-full mx-6 bg-white flex justify-center items-center"
                onPress={() => setZoom(false)}>
                <MaterialCommunityIcons
                  name="window-close"
                  size={28}
                  color={theme.colors.darkGray}
                />
              </Pressable>
              <Text className="mt-1 text-xs text-darkGray">닫기</Text>
            </View>
          </View>
        </View>
        <Toast config={toastConfig} />
      </SafeAreaView>
    </Portal>
  );
};

export default ZoomImage;
