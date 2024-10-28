import {Image, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Svg, {G, Polygon} from 'react-native-svg';
import {CropImageProps} from 'src/types/stack';

const CropImage = ({navigation, route}: CropImageProps) => {
  console.log('route', route);
  return (
    <SafeAreaView className="flex-1 justify-center items-center w-screen h-screen bg-white dark:bg-black">
      <Image
        width={100}
        height={100}
        source={{
          uri: route.params.image,
        }}
      />
      <Svg id="Layer_2" width="100%" height="100%" viewBox="0 0 960 1110">
        <Polygon
          fill="#ffffff"
          stroke="#000000"
          strokeWidth="1"
          strokeMiterlimit="10"
          points="332.363,1015.313 333.118,1011.282 329.591,1010.652 329.337,1010.652 328.834,1009.896 328.582,1009.896 330.598,1005.989 328.96,1002.337 321.527,1001.455 316.363,994.778 286.376,995.156 284.867,999.061 231.7,1011.659 207.006,1036.478 207.384,1048.194 207.258,1048.32 223.888,1065.58 233.337,1056.762 240.519,1058.778 255.006,1056.888 257.275,1060.036 265.464,1057.14 278.439,1058.273 288.267,1050.841 302.376,1049.958 307.796,1044.415 317.998,1043.407 336.015,1014.935 334.501,1010.778"
        />
      </Svg>
    </SafeAreaView>
  );
};

export default CropImage;
