import React from 'react';
import {Defs, Image, Pattern} from 'react-native-svg';
import {koreaMapSvgData} from 'src/constants/koreaMapData';
import {IKoreaMapDataObject} from 'src/types/koreaMap';
import {getIdArrayByType} from 'src/utils/screen/koreaMap.util';

interface IKoreaMapPattern {
  data: IKoreaMapDataObject;
}

const KoreaMapPattern = ({data}: IKoreaMapPattern) => {
  const imageArray = getIdArrayByType(data, 'photo');

  return (
    <Defs>
      {imageArray.map(item => {
        const {mapSvgStyle} = koreaMapSvgData[item];
        const {width, height, x, y} = mapSvgStyle;

        return (
          <Pattern
            key={item}
            id={item}
            patternUnits="userSpaceOnUse"
            width={width}
            height={height}
            x={x}
            y={y}>
            <Image
              width={width}
              height={height}
              preserveAspectRatio="xMidYMid slice"
              href={{uri: data[item].imageUrl}}
            />
          </Pattern>
        );
      })}
    </Defs>
  );
};

export default React.memo(KoreaMapPattern);
