import {Image, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
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
    </SafeAreaView>
  );
};

export default CropImage;
