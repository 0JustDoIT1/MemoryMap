import {Image, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Svg, {G, Path, Polygon} from 'react-native-svg';
import {CropImageProps} from 'src/types/stack';

const CropImage = ({navigation, route}: CropImageProps) => {
  console.log('route', route);
  return (
    <SafeAreaView className="flex-1 justify-center items-center w-screen h-screen bg-white dark:bg-black">
      {/* <Image
        width={100}
        height={100}
        source={{
          uri: route.params.image,
        }}
      /> */}
      <View className="w-full h-full flex justify-center items-center bg-red-300">
        <Svg
          id="Layer_2"
          width="100%"
          height="50%"
          viewBox="1017.5 2.25 500 500">
          <Polygon
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="0.5"
            points="1120.138,323.861l39.959,9.042l8.279,77.643h36.95
		l9.027,35.428l52.013-21.107l16.594,58.04l36.174,18.843l95.729-49.749l-121.35-237.438L1249.797,68.33l-38.458-42.965
		L1200.044,2.75l-38.439,36.185l-41.467,241.961V323.861z"
          />
        </Svg>
      </View>
    </SafeAreaView>
  );
};

export default CropImage;
