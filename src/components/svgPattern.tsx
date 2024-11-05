import {useEffect} from 'react';
import {Defs, Image, Pattern} from 'react-native-svg';
import {useRecoilValue} from 'recoil';
import useKoreaMap from 'src/hook/useKoreaMap';
import {koreaMapDataState} from 'src/recoil/atom';

const SvgPattern = () => {
  const koreaMapData = useRecoilValue(koreaMapDataState);
  const {idArray, getSvgDataById, getMapDataById, getTypePhotoToIdArray} =
    useKoreaMap();

  useEffect(() => {
    getTypePhotoToIdArray('photo');
  }, [koreaMapData]);

  return (
    <Defs>
      {idArray.map(item => (
        <Pattern
          key={item}
          id={item}
          patternUnits="userSpaceOnUse"
          x={getSvgDataById(item).svgStyle?.x}
          y={getSvgDataById(item).svgStyle?.y}>
          <Image
            width={getSvgDataById(item).svgStyle?.width}
            height={getSvgDataById(item).svgStyle?.height}
            href={
              'file:///data/user/0/com.memorymap/cache/rn_image_picker_lib_temp_38eff628-74ca-46b3-8d21-68df127b3430.jpg'
            }
            translateX={getMapDataById(item).imageStyle?.x}
            translateY={getMapDataById(item).imageStyle?.y}
            scale={getMapDataById(item).imageStyle?.scale}
            rotation={getMapDataById(item).imageStyle?.rotation}
          />
        </Pattern>
      ))}
    </Defs>
  );
};

export default SvgPattern;
