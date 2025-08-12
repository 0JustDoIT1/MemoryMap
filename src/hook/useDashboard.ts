import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {useMemo} from 'react';
import {koreaMapDataInit} from 'src/constants/koreaMapData';
import {REACT_QUERY_KEYS} from 'src/constants/queryKey';
import {getDashboardKoreaMapData} from 'src/utils/koreaMap.db';
import {getDashboardStory} from 'src/utils/story.db';

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
  const visitedTotal = useMemo(() => {
    const color = Number(mapData?.color ?? 0);
    const photo = Number(mapData?.photo ?? 0);
    return color + photo;
  }, [mapData?.color, mapData?.photo]);

  // 퍼센트
  const percent = useMemo(() => {
    const raw = (visitedTotal / koreaMapRegionCount) * 100;
    const safe = Number.isFinite(raw) ? raw : 0;
    return clamp(safe);
  }, [visitedTotal, koreaMapRegionCount]);

  // 카드용
  const mostCount = mapData?.mostRegion?.[0]?.count ?? 0;
  const mostRegion = mapData?.mostRegion?.[0]?.main ?? '-';
  const mostOthers = Math.max(0, (mapData?.mostRegion?.length ?? 0) - 1);

  const storyTopCount = storyData?.countRegion?.[0]?.count ?? 0;
  const storyTopRegion = storyData?.countRegion?.[0]?.title ?? '-';
  const storyTopOthers = Math.max(0, (storyData?.countRegion?.length ?? 0) - 1);

  const pointTopAvg = storyData?.pointRegion?.[0]?.avg ?? 0;
  const pointTopRegion = storyData?.pointRegion?.[0]?.title ?? '-';
  const pointTopOthers = Math.max(0, (storyData?.pointRegion?.length ?? 0) - 1);

  const isLoadingAny = isMapLoading || isStoryLoading;
  const isErrorAny = isMapError || isStoryError;

  return {
    // 기초 데이터
    koreaMapRegionCount,
    mapData,
    storyData,

    // 상태
    isLoadingAny,
    isErrorAny,

    // 파생값
    percent,
    visitedTotal,

    mostCount,
    mostRegion,
    mostOthers,

    storyTopCount,
    storyTopRegion,
    storyTopOthers,

    pointTopAvg,
    pointTopRegion,
    pointTopOthers,
  };
};

export default useDashboard;
