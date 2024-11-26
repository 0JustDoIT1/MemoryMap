import React from 'react';
import {Defs, Image, Pattern} from 'react-native-svg';
import {KoreaMapData} from 'src/types/koreaMap';
import {getSvgDataById, getTypePhotoToIdArray} from 'src/utils/koreaMap';

interface SvgPattern {
  data: KoreaMapData;
}

const SvgPattern = ({data}: SvgPattern) => {
  console.log('패턴');

  const idArray = getTypePhotoToIdArray(data, 'photo');

  return (
    <Defs>
      {idArray.length >= 1 &&
        idArray.map(item => (
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
              translateX={data[item].imageStyle?.x}
              translateY={data[item].imageStyle?.y}
              scale={data[item].imageStyle?.scale}
              rotation={data[item].imageStyle?.rotation}
            />
          </Pattern>
        ))}
    </Defs>
  );
};

export default SvgPattern;
