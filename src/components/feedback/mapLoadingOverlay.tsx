import {SafeAreaView} from 'react-native-safe-area-context';
import KoreaMapSkeleton from '../map/koreaMapSkeleton';

const MapLoadingOverlay = () => {
  return (
    <SafeAreaView
      className="flex-1 justify-center items-center bg-white"
      edges={['top', 'bottom', 'left', 'right']}>
      <KoreaMapSkeleton />
    </SafeAreaView>
  );
};

export default MapLoadingOverlay;
