import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import {getDashboardKoreaMapData} from 'src/utils/koreaMap.db';
import {getDashboardStory} from 'src/utils/story.db';

const useDashboard = (regionCount: number) => {
  const [percent, setPercent] = useState<number>(0);

  // React-Query Query
  const {
    isSuccess: isMapSuccess,
    isLoading: isMapLoading,
    isError: isMapError,
    data: mapData,
  } = useQuery({
    queryKey: ['dashboardKoreaMap'],
    queryFn: () => getDashboardKoreaMapData(),
    enabled: true,
    retry: false,
    placeholderData: keepPreviousData,
  });
  const {
    isSuccess: isStorySuccess,
    isLoading: isStoryLoading,
    isError: isStoryError,
    data: storyData,
  } = useQuery({
    queryKey: ['dashboardStory'],
    queryFn: () => getDashboardStory(),
    enabled: true,
    retry: false,
  });

  useEffect(() => {
    if (isMapSuccess) {
      setPercent(((mapData.color + mapData.photo) / regionCount) * 100);
    }
  }, [mapData?.color, mapData?.photo, isMapSuccess, regionCount]);

  return {
    percent,
    isMapSuccess,
    isMapLoading,
    isMapError,
    mapData,
    isStorySuccess,
    isStoryLoading,
    isStoryError,
    storyData,
  };
};

export default useDashboard;
