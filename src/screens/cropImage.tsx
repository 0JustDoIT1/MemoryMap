import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Svg, {Defs, Image, Path, Pattern, Polygon} from 'react-native-svg';
import {CropImageProps} from 'src/types/stack';
import {useEffect, useState} from 'react';
import {BrandContainedButton} from 'src/components/button';
import CustomSlider from 'src/components/slider';
import {Text} from 'react-native-paper';
import {showBottomToast} from 'src/utils/showToast';
import useKoreaMap from 'src/hook/useKoreaMap';
import useRegionCount from 'src/hook/useRegionCount';
import {getRegionTitleById} from 'src/utils/koreaMap';

const CropImageScreen = ({navigation, route}: CropImageProps) => {
  const {koreaMapData, updateMapPhotoById, getSvgDataById} = useKoreaMap();
  const {updateRegionCountById} = useRegionCount();

  const svgData = getSvgDataById(route.params.id);
  const [image, setImage] = useState<string>(route.params.image);

  const [x, setX] = useState<number[]>([0]);
  const [y, setY] = useState<number[]>([0]);
  const [scale, setScale] = useState<number[]>([1]);
  const [rotate, setRotate] = useState<number[]>([0]);

  useEffect(() => {
    setImage(route.params.image);
    setX([0]);
    setY([0]);
    setScale([1]);
    setRotate([0]);
  }, [route.params.image]);

  // transform 값
  const minX = -480;
  const maxX = 480;
  const minY = -555;
  const maxY = 555;
  const minScale = 0.1;
  const maxScale = 2;
  const minRotate = -360;
  const maxRotate = 360;

  // 각 지역 svg 실제 크기
  const svgW = svgData.svgStyle?.width!;
  const svgH = svgData.svgStyle?.height!;

  const setImageWidthHeight = () => {
    if (svgW > svgH) {
      const ratio = svgH / svgW;
      const diff = Math.abs(1110 - 960 * ratio);
      return {width: 960 + diff, height: 1110};
    } else {
      const ratio = svgW / svgH;
      const diff = Math.abs(960 - 1110 * ratio);
      return {width: 960, height: 1110 + diff};
    }
  };

  const onUploadPhoto = async () => {
    // 지역 svg 실제 크기와 svg ViewBox의 비율
    const ratioWidth = svgW / 960;
    const ratioHeight = svgH / 1110;
    const x1 = x[0] * ratioWidth;
    const y1 = y[0] * ratioHeight;

    const imageStyle = {
      x: x1,
      y: y1,
      scale: scale[0],
      rotation: rotate[0],
    };

    const count = koreaMapData[route.params.id].type === 'init' ? 1 : 0;

    try {
      await updateMapPhotoById(route.params.id, image, imageStyle);
      await updateRegionCountById(route.params.id, 'color', count);

      onUploadPhotoSuccess();
    } catch (error) {
      onUploadPhotoError(error);
    }
  };

  const onUploadPhotoSuccess = () => {
    const text = `${getRegionTitleById(
      koreaMapData,
      route.params.id,
    )} 사진 추가!`;

    navigation.navigate('Map');
    showBottomToast('success', text);
  };

  const onUploadPhotoError = (error: any) => {
    showBottomToast('error', '사진 넣기에 실패했습니다.');
  };

  return (
    <SafeAreaView className="relative flex-1 justify-start items-center w-screen h-screen bg-white p-2">
      <View className="relative w-full h-1/2">
        <Svg id="Layer_2" width="100%" height="100%" viewBox="0 0 960 1110">
          <Defs>
            <Pattern id="image" patternUnits="userSpaceOnUse">
              <Image
                width={setImageWidthHeight().width}
                height={setImageWidthHeight().height}
                preserveAspectRatio="xMidyMid slice"
                href={image}
                translateX={x[0]}
                translateY={y[0]}
                scale={scale[0]}
                rotation={rotate[0]}
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
      </View>

      <View className="w-full h-1/2 flex justify-center items-center">
        <View className="w-10/12 mb-4">
          <View className="w-full flex justify-center items-start mb-1">
            <Text className="mb-[-10px]">좌우 이동</Text>
            <CustomSlider
              min={minX}
              max={maxX}
              value={x[0]}
              onValueChange={setX}
            />
          </View>
          <View className="w-full flex justify-center items-start mb-1">
            <Text className="mb-[-10px]">상하 이동</Text>
            <CustomSlider
              min={minY}
              max={maxY}
              value={y[0]}
              onValueChange={setY}
            />
          </View>
          <View className="w-full flex justify-center items-start mb-1">
            <Text className="mb-[-10px]">사진 크기</Text>
            <CustomSlider
              min={minScale}
              max={maxScale}
              value={scale[0]}
              onValueChange={setScale}
            />
          </View>
          <View className="w-full flex justify-center items-start mb-1">
            <Text className="mb-[-10px]">사진 회전</Text>
            <CustomSlider
              min={minRotate}
              max={maxRotate}
              value={rotate[0]}
              onValueChange={setRotate}
            />
          </View>
        </View>
        <View className="w-11/12">
          <BrandContainedButton
            classes="w-full"
            text="확인"
            onPress={onUploadPhoto}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CropImageScreen;
