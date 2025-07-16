import {SafeAreaView} from 'react-native-safe-area-context';
import KoreaMapSkeleton from 'src/components/map/koreaMapSkeleton';

const MapLoadingScreen = () => {
  return (
    <SafeAreaView
      className="flex-1 justify-center items-center bg-white"
      edges={['left', 'right']}>
      <KoreaMapSkeleton />
    </SafeAreaView>
  );
};

export default MapLoadingScreen;
