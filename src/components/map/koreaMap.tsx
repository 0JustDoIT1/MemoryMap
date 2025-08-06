import React, {useCallback, useRef, useState} from 'react';
import {Svg} from 'react-native-svg';
import KoreaMapPattern from './koreaMapPattern';
import KoreaMapSheet from './koreaMapSheet';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {IKoreaRegionData} from 'src/types/koreaMap';
import {koreaRegionEmpty} from 'src/constants/koreaMapData';
import KoreaMapSkeleton from './koreaMapSkeleton';
import KoreaMapText from './koreaMapText';
import useKoreaMap from 'src/hook/map/useKoreaMapQuery';
import {useAppShowRegionName} from 'src/store/appShowRegionName';
import KoreaMapSvg from './koreaMapSvg';

const KoreaMap = () => {
  // Bottom Sheet Ref
  const mapSheetModalRef = useRef<BottomSheetModal>(null);
  // Bottom Sheet present event
  const handlePresentPress = () => {
    mapSheetModalRef.current?.present();
  };

  const {isMapSuccess, isMapLoading, isMapError, mapData} = useKoreaMap();

  const [regionData, setRegionData] =
    useState<IKoreaRegionData>(koreaRegionEmpty);

  const appShowRegionName = useAppShowRegionName(
    state => state.appShowRegionName,
  );

  if (isMapError) return null;
  if (isMapLoading) return <KoreaMapSkeleton />;
  if (!isMapSuccess || !mapData) return null;

  const handleRegionPress = useCallback(
    (key: string) => {
      setRegionData(mapData[key]);
      handlePresentPress();
    },
    [mapData],
  );

  return (
    <React.Fragment>
      <Svg id="Layer_1" width="130%" height="130%" viewBox="0 0 960 1110">
        <KoreaMapPattern data={mapData} />
        <KoreaMapSvg mapData={mapData} onRegionPress={handleRegionPress} />
        <KoreaMapText data={mapData} show={appShowRegionName} />
      </Svg>
      <KoreaMapSheet
        mapSheetModalRef={mapSheetModalRef}
        regionData={regionData}
      />
    </React.Fragment>
  );
};

export default KoreaMap;
