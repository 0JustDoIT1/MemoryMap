import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Svg, {Defs, Image, Pattern, Polygon} from 'react-native-svg';
import {CropImageProps} from 'src/types/stack';
import {useRef, useState} from 'react';
import {BrandContainedButton} from 'src/components/button';
import CustomSlider from 'src/components/slider';
import {Text} from 'react-native-paper';
import ViewShot from 'react-native-view-shot';
import {customStyle} from 'src/style/customStyle';

const CropImage = ({navigation, route}: CropImageProps) => {
  const captureRef = useRef<ViewShot>(null);
  const [capture, setCapture] = useState<string>('');

  const onCapture = () => {
    captureRef?.current?.capture?.().then(uri => {
      setCapture(uri);
    });
  };

  console.log('###', capture);

  const [x, setX] = useState<number[]>([0]);
  const [y, setY] = useState<number[]>([0]);
  const [scale, setScale] = useState<number[]>([1]);
  const [rotate, setRotate] = useState<number[]>([0]);

  const minX = -Math.round(route.params.width / 2);
  const maxX = Math.round(route.params.width / 2);
  const minY = -Math.round(route.params.height / 2);
  const maxY = Math.round(route.params.height / 2);
  const minScale = 0.1;
  const maxScale = 2;
  const minRotate = -360;
  const maxRotate = 360;

  return (
    <SafeAreaView className="relative flex-1 justify-start items-center w-screen h-screen bg-white dark:bg-black">
      <View className="w-full h-1/2">
        <ViewShot
          ref={captureRef}
          options={{
            fileName: route.params.id + '_',
            format: 'png',
            quality: 1,
          }}
          style={customStyle().viewShot}>
          <Svg id="Layer_2" width="100%" height="100%" viewBox="0 0 500 500">
            <Defs>
              <Pattern id="image" patternUnits="userSpaceOnUse">
                <Image
                  x="-50%"
                  y="-50%"
                  href={route.params.image}
                  width={route.params.width}
                  height={route.params.height}
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
              strokeWidth="0.5"
              points="177.16200256347656,1 242.22900390625,58.43701171875 278.9079895019531,159.489013671875 242.91900634765625,170.56396484375 240.84500122070312,192.0059814453125 301.06298828125,207.2440185546875 368.885986328125,189.241943359375 409.718994140625,201.011962890625 420.78900146484375,234.22900390625 409.718994140625,317.2779541015625 435.33599853515625,342.2020263671875 337.04901123046875,345.6650390625 277.52398681640625,382.3409423828125 277.52398681640625,429.405029296875 267.8290100097656,467.4739990234375 173.02699279785156,500 146.718994140625,448.0880126953125 83.04598999023438,412.0980224609375 63.66400146484375,340.1280517578125 98.96499633789062,214.166015625 142.56199645996094,165.717041015625 179.93600463867188,159.489013671875 128.72300720214844,49.4320068359375 "
            />
          </Svg>
        </ViewShot>
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
            onPress={onCapture}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CropImage;
