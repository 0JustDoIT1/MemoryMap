import {TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Svg, {Defs, Image, Pattern, Polygon} from 'react-native-svg';
import {CropImageProps} from 'src/types/stack';
import {useState} from 'react';
import {BrandContainedButton} from 'src/components/button';
import CustomSlider from 'src/components/slider';
import {Text} from 'react-native-paper';
import useKoreaMap from 'src/hook/useKoreaMap';
import {showBottomToast} from 'src/utils/showToast';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {customStyle} from 'src/style/customStyle';
import {launchImageLibrary} from 'react-native-image-picker';

const CropImage = ({navigation, route}: CropImageProps) => {
  const {updateMapPhotoById} = useKoreaMap();

  const [image, setImage] = useState<string>(route.params.image);
  const [width, setWidth] = useState<number>(route.params.width);
  const [height, setHeight] = useState<number>(route.params.height);

  const [x, setX] = useState<number[]>([0]);
  const [y, setY] = useState<number[]>([0]);
  const [scale, setScale] = useState<number[]>([1]);
  const [rotate, setRotate] = useState<number[]>([0]);

  const minX = -Math.round(width / 2);
  const maxX = Math.round(width / 2);
  const minY = -Math.round(height / 2);
  const maxY = Math.round(height / 2);
  const minScale = 0.1;
  const maxScale = 2;
  const minRotate = -360;
  const maxRotate = 360;

  console.log('!!!', image, width, height, x[0], y[0], scale[0], rotate[0]);

  console.log('###', route.params.svgStyle, route.params.svgPolygon);

  const onUploadPhoto = async () => {
    const sWidth = route.params.svgStyle?.width as number;
    const ratio = sWidth / width;

    const imageStyle = {
      x: x[0] * ratio,
      y: y[0] * ratio,
      scale: scale[0],
      rotation: rotate[0],
    };
    await updateMapPhotoById(route.params.id, image, imageStyle).then(() =>
      onUploadPhotoSuccess(),
    );
  };

  const onUploadPhotoSuccess = () => {
    showBottomToast('success', '사진 넣기 성공!');
    navigation.navigate('Map');
  };

  const onImagePicker = async () => {
    await launchImageLibrary({
      mediaType: 'photo',
    }).then(async res => {
      if (res.assets) {
        setImage(res.assets[0].uri as string);
        setWidth(res.assets[0].width as number);
        setHeight(res.assets[0].height as number);
      }
    });
  };

  return (
    <SafeAreaView className="relative flex-1 justify-start items-center w-screen h-screen bg-white dark:bg-black">
      <View className="relative w-full h-1/2">
        <Svg id="Layer_2" width="100%" height="100%" viewBox="0 0 960 1110">
          <Defs>
            <Pattern id="image" patternUnits="userSpaceOnUse">
              <Image
                href={image}
                width={width}
                height={height}
                translateX={x[0]}
                translateY={y[0]}
                scale={scale[0]}
                rotation={rotate[0]}
              />
            </Pattern>
          </Defs>
          <Polygon
            fill="url(#image)"
            stroke="#000000"
            strokeWidth="2"
            points={route.params.svgPolygon}
          />
        </Svg>
        <TouchableOpacity
          className="absolute bottom-0 right-10 p-1 rounded-full bg-brandLight"
          onPress={onImagePicker}>
          <Ionicons
            name="refresh"
            size={20}
            style={customStyle().mapBottomSheetPhotoIcon}
          />
        </TouchableOpacity>
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

export default CropImage;
