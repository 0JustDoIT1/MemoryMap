import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {koreaMapDataInit} from 'src/constants/koreaMapData';
import {REACT_QUERY_KEYS} from 'src/constants/queryKey';
import {getDashboardKoreaMapData} from 'src/utils/koreaMap.db';
import {getDashboardStory} from 'src/utils/story.db';

interface IStat {
  title: string;
  value: number;
  region: string;
  others: number;
}

const clamp = (n: number, min = 0, max = 100) =>
  Math.min(max, Math.max(min, n));

const useDashboard = () => {
  const koreaMapRegionCount = Object.values(koreaMapDataInit).length || 1;

  // React-Query Query
  const {
    isSuccess: isMapSuccess,
    isLoading: isMapLoading,
    isError: isMapError,
    data: mapData,
  } = useQuery({
    queryKey: REACT_QUERY_KEYS.dashboard.koreaMap,
    queryFn: () => getDashboardKoreaMapData(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분
    retry: 1,
    placeholderData: keepPreviousData,
  });
  const {
    isSuccess: isStorySuccess,
    isLoading: isStoryLoading,
    isError: isStoryError,
    data: storyData,
  } = useQuery({
    queryKey: REACT_QUERY_KEYS.dashboard.story,
    queryFn: () => getDashboardStory(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 1,
  });

  // 방문 합계
  const visitedTotal =
    Number(mapData?.color ?? 0) + Number(mapData?.photo ?? 0);

  // 퍼센트
  const percent = clamp(
    Number.isFinite(visitedTotal)
      ? (visitedTotal / koreaMapRegionCount) * 100
      : 0,
  );

  // 카드용
  const mostBg: IStat = {
    title: '가장 많이 색칠한 지역',
    value: mapData?.mostRegion?.[0]?.count ?? 0,
    region: mapData?.mostRegion?.[0]?.main ?? '-',
    others: Math.max(0, (mapData?.mostRegion?.length ?? 0) - 1),
  };

  const topStory: IStat = {
    title: '스토리 최다 지역',
    value: storyData?.countRegion?.[0]?.count ?? 0,
    region: storyData?.countRegion?.[0]?.title ?? '-',
    others: Math.max(0, (storyData?.countRegion?.length ?? 0) - 1),
  };

  const topPoint: IStat = {
    title: '최고 평점 지역',
    value: storyData?.pointRegion?.[0]?.avg ?? 0,
    region: storyData?.pointRegion?.[0]?.title ?? '-',
    others: Math.max(0, (storyData?.pointRegion?.length ?? 0) - 1),
  };

  const dashboardCardsList = [mostBg, topStory, topPoint];

  const isLoadingAny = isMapLoading || isStoryLoading;
  const isErrorAny = isMapError || isStoryError;

  return {
    koreaMapRegionCount,
    mapData,
    storyData,

    isLoadingAny,
    isErrorAny,

    percent,
    visitedTotal,
    dashboardCardsList,
  };
};

export default useDashboard;
