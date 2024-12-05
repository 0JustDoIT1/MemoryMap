import {ActivityIndicator} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {customColor} from 'src/style/customColor';

const CustomActivityIndicatorScreen = () => {
  return (
    <SafeAreaView
      className="flex-1 justify-center items-center bg-white"
      edges={['top', 'bottom', 'left', 'right']}>
      <ActivityIndicator animating={true} color={customColor.brandMain} />
    </SafeAreaView>
  );
};

export default CustomActivityIndicatorScreen;
