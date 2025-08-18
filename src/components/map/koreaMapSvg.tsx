import React from 'react';
import {Path, Polygon} from 'react-native-svg';
import {MAP_SVG_DATA} from 'src/constants/koreaMapData';
import {IMapDataObject} from 'src/types/koreaMap';

interface IKoreaMapSvg {
  mapData: IMapDataObject;
  onRegionPress: (key: string) => void;
}

const KoreaMapSvg = ({mapData, onRegionPress}: IKoreaMapSvg) => {
  return (
    <>
      {Object.entries(MAP_SVG_DATA).map(([key, value]) => {
        const {mapSvgType, mapSvgPath, strokeConfig} = value;
        const region = mapData[key];
        if (!region) return null;

        const commonProps = {
          id: key,
          onPress: () => onRegionPress(key),
          fill: region.background,
          ...strokeConfig,
        };

        return mapSvgType === 'path' ? (
          <Path key={key} d={mapSvgPath} {...commonProps} />
        ) : (
          <Polygon key={key} points={mapSvgPath} {...commonProps} />
        );
      })}
    </>
  );
};

export default React.memo(
  KoreaMapSvg,
  (prev, next) =>
    prev.mapData === next.mapData && prev.onRegionPress === next.onRegionPress,
);
