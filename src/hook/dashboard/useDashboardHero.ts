import {koreaMapDataInit} from 'src/constants/koreaMapData';
import {IDashboardMap} from 'src/types/dashboard';

const useDashboardHero = (mapData: IDashboardMap | undefined) => {
  const koreaMapRegionCount = Object.values(koreaMapDataInit).length || 1;

  // 방문 합계
  const visitedTotal =
    Number(mapData?.color ?? 0) + Number(mapData?.photo ?? 0);

  // 퍼센트
  const percent = (visitedTotal / koreaMapRegionCount) * 100;

  return {koreaMapRegionCount, visitedTotal, percent};
};

export default useDashboardHero;
