import {SafeAreaView} from 'react-native-safe-area-context';
import SkeletonMap from 'src/skeleton/skeletonMap';

const MapLoadingScreen = () => {
  return (
    <SafeAreaView
      className="flex-1 justify-center items-center bg-white"
      edges={['left', 'right']}>
      <SkeletonMap />
    </SafeAreaView>
  );
};

export default MapLoadingScreen;
