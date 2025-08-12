// KoreaRegionSvg.tsx
import Svg, {Defs, Image, Path, Pattern, Polygon} from 'react-native-svg';
import {ISvgData} from 'src/types/koreaMap';

interface IKoreaMapZoomSvg {
  region: ISvgData;
  imageUrl?: string;
}

const KoreaMapZoomSvg = ({region, imageUrl}: IKoreaMapZoomSvg) => {
  const {regionSvgStyle, regionSvgType, regionSvgPath} = region;

  return (
    <Svg id="Layer_2" width="100%" height="100%" viewBox="0 0 960 1110">
      <Defs>
        <Pattern
          id="image"
          patternUnits="userSpaceOnUse"
          x={regionSvgStyle.x}
          y={regionSvgStyle.y}
          width={regionSvgStyle.width}
          height={regionSvgStyle.height}>
          <Image
            width={regionSvgStyle.width}
            height={regionSvgStyle.height}
            preserveAspectRatio="xMidyMid slice"
            href={imageUrl}
          />
        </Pattern>
      </Defs>
      {regionSvgType === 'path' && (
        <Path
          fill="url(#image)"
          stroke="#000000"
          strokeWidth="2"
          d={regionSvgPath}
        />
      )}
      {regionSvgType === 'polygon' && (
        <Polygon
          fill="url(#image)"
          stroke="#000000"
          strokeWidth="2"
          points={regionSvgPath}
        />
      )}
    </Svg>
  );
};

export default KoreaMapZoomSvg;
