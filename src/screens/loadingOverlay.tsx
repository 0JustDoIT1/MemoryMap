import {View} from 'react-native';
import {ActivityIndicator, Portal} from 'react-native-paper';
import {customColor} from 'src/style/customColor';

const LoadingScreen = () => {
  return (
    <Portal>
      <View className="flex-1 justify-center items-center bg-white opacity-80">
        <ActivityIndicator animating={true} color={customColor.brandMain} />
      </View>
    </Portal>
  );
};

export default LoadingScreen;
