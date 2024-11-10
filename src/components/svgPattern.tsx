import React, {useEffect, useState} from 'react';
import {Defs, Image, Pattern} from 'react-native-svg';
import useKoreaMap from 'src/hook/useKoreaMap';

const SvgPattern = () => {
  const {koreaMapData, getSvgDataById, getTypeToIdArray} = useKoreaMap();
  const [idArray, setIdArray] = useState<string[]>([]);

  useEffect(() => {
    const arr = getTypeToIdArray('photo');
    if (arr !== idArray) setIdArray(arr);
  }, [koreaMapData]);

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
              href={koreaMapData[item].imageUrl}
              translateX={koreaMapData[item].imageStyle?.x}
              translateY={koreaMapData[item].imageStyle?.y}
              scale={koreaMapData[item].imageStyle?.scale}
              rotation={koreaMapData[item].imageStyle?.rotation}
            />
          </Pattern>
        ))}
    </Defs>
  );
};

const MemoizationSvgPattern = React.memo(SvgPattern);

export default MemoizationSvgPattern;
