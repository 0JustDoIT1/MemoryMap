import {useCallback, useMemo} from 'react';
import {KoreaRegionData} from 'src/types/koreaMap';

interface IUseKoreaMapOptimization {
  mapData: Record<string, KoreaRegionData>;
  onRegionSelect: (regionData: KoreaRegionData) => void;
  onPresentPress: () => void;
}

// 지역별 스타일 설정을 위한 매핑
const REGION_STYLE_CONFIG: Record<
  string,
  {strokeWidth: string; strokeMiterlimit?: string}
> = {
  // 제주도 - strokeWidth="1", strokeMiterlimit="10"
  'KR-17': {strokeWidth: '1', strokeMiterlimit: '10'},

  // 특별시/광역시 - strokeWidth="1"
  'KR-1': {strokeWidth: '1'}, // 서울특별시
  'KR-3': {strokeWidth: '1'}, // 인천광역시
  'KR-7': {strokeWidth: '1'}, // 대전광역시
  'KR-8': {strokeWidth: '1'}, // 세종특별자치시
  'KR-11': {strokeWidth: '1'}, // 광주광역시
  'KR-14': {strokeWidth: '1', strokeMiterlimit: '10'}, // 부산광역시
  'KR-15': {strokeWidth: '1'}, // 대구광역시
  'KR-16': {strokeWidth: '1', strokeMiterlimit: '10'}, // 울산광역시

  // 기본값 - strokeWidth="0.8"
  default: {strokeWidth: '0.8'},
};

export const useKoreaMapOptimization = ({
  mapData,
  onRegionSelect,
  onPresentPress,
}: IUseKoreaMapOptimization) => {
  // 지역 클릭 핸들러 메모이제이션 - 실제 구조에 맞게 수정
  const handleRegionPress = useCallback(
    (regionData: KoreaRegionData) => {
      onRegionSelect(regionData);
      onPresentPress();
    },
    [onRegionSelect, onPresentPress],
  );

  // SVG 속성 메모이제이션
  const svgProps = useMemo(
    () => ({
      id: 'Layer_1',
      width: '130%',
      height: '130%',
      viewBox: '0 0 960 1110',
    }),
    [],
  );

  // 지역 데이터 유효성 검사
  const isValidMapData = useMemo(() => {
    return mapData && Object.keys(mapData).length > 0;
  }, [mapData]);

  // 지역별 스타일 캐싱 - 지역별 다른 속성 고려
  const regionStyles = useMemo(() => {
    const styles: Record<string, any> = {};
    Object.keys(mapData).forEach(regionId => {
      const config =
        REGION_STYLE_CONFIG[regionId] || REGION_STYLE_CONFIG.default;
      styles[regionId] = {
        fill: mapData[regionId].background,
        stroke: '#000000',
        strokeWidth: config.strokeWidth,
        ...(config.strokeMiterlimit && {
          strokeMiterlimit: config.strokeMiterlimit,
        }),
      };
    });
    return styles;
  }, [mapData]);

  // 지역별 클릭 핸들러 캐싱
  const regionPressHandlers = useMemo(() => {
    const handlers: Record<string, () => void> = {};
    Object.keys(mapData).forEach(regionId => {
      handlers[regionId] = () => handleRegionPress(mapData[regionId]);
    });
    return handlers;
  }, [mapData, handleRegionPress]);

  return {
    handleRegionPress,
    svgProps,
    isValidMapData,
    regionStyles,
    regionPressHandlers,
  };
};
