// src/hook/map/useKoreaRegionSheet.ts
import {useCallback, useState} from 'react';
import {IMapDataObject, IRegionData} from 'src/types/koreaMap';
import {REGION_EMPTY} from 'src/constants/koreaMapData';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

export const useKoreaMapRegionSheet = (
  mapData: IMapDataObject | undefined,
  mapRef: React.RefObject<BottomSheetModal | null>,
) => {
  const [regionData, setRegionData] = useState<IRegionData>(REGION_EMPTY);

  const handlePresentPress = useCallback(() => {
    mapRef.current?.present();
  }, []);

  /** KoreaMapSvg에서 호출할 프레스 핸들러 */
  const onRegionPress = useCallback(
    (key: string) => {
      if (!mapData || !mapData[key]) return;
      setRegionData(mapData[key]);
      handlePresentPress();
    },
    [mapData],
  );

  return {
    regionData,
    setRegionData,
    onRegionPress,
  };
};
