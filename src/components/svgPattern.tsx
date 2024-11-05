import {Defs, Image, Pattern} from 'react-native-svg';
import useKoreaMap from 'src/hook/useKoreaMap';

const SvgPattern = () => {
  const {getSvgDataById, getMapDataById} = useKoreaMap();

  return (
    <Defs>
      <Pattern
        id="KR-13-18"
        patternUnits="userSpaceOnUse"
        x={getSvgDataById('KR-13-18').svgStyle?.x}
        y={getSvgDataById('KR-13-18').svgStyle?.y}>
        <Image
          width={getSvgDataById('KR-13-18').svgStyle?.width}
          height={getSvgDataById('KR-13-18').svgStyle?.height}
          href={
            'file:///data/user/0/com.memorymap/cache/rn_image_picker_lib_temp_38eff628-74ca-46b3-8d21-68df127b3430.jpg'
          }
          translateX={getMapDataById('KR-13-18').imageStyle?.x}
          translateY={getMapDataById('KR-13-18').imageStyle?.y}
          scale={getMapDataById('KR-13-18').imageStyle?.scale}
          rotation={getMapDataById('KR-13-18').imageStyle?.rotation}
        />
      </Pattern>
    </Defs>
  );
};

export default SvgPattern;
