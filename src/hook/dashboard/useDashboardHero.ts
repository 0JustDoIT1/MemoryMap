import {koreaMapDataInit} from 'src/constants/koreaMapData';
import {IDashboardMap} from 'src/types/dashboard';

const clamp = (n: number, min = 0, max = 100) =>
  Math.min(max, Math.max(min, n));

const useDashboardHero = (mapData: IDashboardMap | undefined) => {
  const koreaMapRegionCount = Object.values(koreaMapDataInit).length || 1;

  // 방문 합계
  const visitedTotal =
    Number(mapData?.color ?? 0) + Number(mapData?.photo ?? 0);

  // 퍼센트
  const percent = clamp((visitedTotal / koreaMapRegionCount) * 100);
  const fixedPercent = Number.isFinite(percent)
    ? Number(percent.toFixed(1))
    : 0;

  return {koreaMapRegionCount, visitedTotal, fixedPercent};
};

export default useDashboardHero;
