import React from 'react';
import {Defs, Image, Pattern} from 'react-native-svg';
import {KoreaMapDataObject} from 'src/types/koreaMap';
import {getIdArrayByType, getSvgDataById} from 'src/utils/koreaMap.util';

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
            x={getSvgDataById(item).svgStyle?.x}
            y={getSvgDataById(item).svgStyle?.y}>
            <Image
              width={getSvgDataById(item).svgStyle?.width}
              height={getSvgDataById(item).svgStyle?.height}
              preserveAspectRatio="xMidyMid slice"
              href={data[item].imageUrl}
            />
          </Pattern>
        ))}
    </Defs>
  );
};

export default SvgPattern;
