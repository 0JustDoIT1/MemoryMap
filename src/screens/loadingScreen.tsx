import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {customColor} from 'src/style/customColor';

const LoadingScreen = () => {
  return (
    <View className="absolute top-0 bottom-0 left-0 right-0 w-screen h-screen flex justify-center items-center bg-white opacity-80">
      <ActivityIndicator animating={true} color={customColor.brandMain} />
    </View>
  );
};

export default LoadingScreen;
