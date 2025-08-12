import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {useMemo} from 'react';
import {REACT_QUERY_KEYS} from 'src/constants/queryKey';
import {IStat} from 'src/types/dashboard';
import {getDashboardKoreaMapData} from 'src/utils/koreaMap.db';
import {getDashboardStory} from 'src/utils/story.db';

const useDashboardCard = () => {
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
    placeholderData: keepPreviousData,
  });

  // 카드용
  const mostBg: IStat = useMemo(
    () => ({
      title: '가장 많이 색칠한 지역',
      value: mapData?.mostRegion?.[0]?.count ?? 0,
      region: mapData?.mostRegion?.[0]?.main ?? '-',
      others: Math.max(0, (mapData?.mostRegion?.length ?? 0) - 1),
      unit: '개',
    }),
    [mapData?.mostRegion],
  );

  const topStory: IStat = useMemo(
    () => ({
      title: '스토리 최다 지역',
      value: storyData?.countRegion?.[0]?.count ?? 0,
      region: storyData?.countRegion?.[0]?.title ?? '-',
      others: Math.max(0, (storyData?.countRegion?.length ?? 0) - 1),
      unit: '개',
    }),
    [storyData?.countRegion],
  );

  const topPoint: IStat = useMemo(
    () => ({
      title: '최고 평점 지역',
      value: storyData?.pointRegion?.[0]?.avg ?? 0,
      region: storyData?.pointRegion?.[0]?.title ?? '-',
      others: Math.max(0, (storyData?.pointRegion?.length ?? 0) - 1),
      unit: '점',
    }),
    [storyData?.pointRegion],
  );

  const dashboardCardsList = useMemo(
    () => [mostBg, topStory, topPoint],
    [mostBg, topStory, topPoint],
  );

  const isLoadingAny = isMapLoading || isStoryLoading;
  const isErrorAny = isMapError || isStoryError;

  return {
    mapData,
    storyData,

    isLoadingAny,
    isErrorAny,
    dashboardCardsList,
  };
};

export default useDashboardCard;
