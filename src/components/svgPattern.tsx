import React from 'react';
import {Defs, Image, Pattern} from 'react-native-svg';
import {koreaMapSvgData} from 'src/constants/koreaMapData';
import {KoreaMapDataObject} from 'src/types/koreaMap';
import {getIdArrayByType} from 'src/utils/koreaMap.util';

interface SvgPattern {
  data: KoreaMapDataObject;
}

const SvgPattern = ({data}: SvgPattern) => {
  console.log('패턴');

  const imageArray = getIdArrayByType(data, 'photo');

  return (
    <Defs>
      {imageArray.length >= 1 &&
        imageArray.map(item => (
          <Pattern
            key={item}
            id={item}
            patternUnits="userSpaceOnUse"
            x={koreaMapSvgData[item].mapSvgStyle.x}
            y={koreaMapSvgData[item].mapSvgStyle.y}>
            <Image
              width={koreaMapSvgData[item].mapSvgStyle.width}
              height={koreaMapSvgData[item].mapSvgStyle.height}
              preserveAspectRatio="xMidyMid slice"
              href={data[item].imageUrl}
            />
          </Pattern>
        ))}
    </Defs>
  );
};

export default SvgPattern;
