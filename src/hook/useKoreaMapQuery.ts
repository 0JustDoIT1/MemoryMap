import {useQuery} from '@tanstack/react-query';
import {koreaMapDataInit} from 'src/constants/koreaMapData';
import {
  getAllKoreaMapData,
  getKoreaMapDataByColor,
} from 'src/utils/koreaMap.db';
import {koreaMapDataToObject} from 'src/utils/koreaMap.util';

const useKoreaMapQuery = () => {
  // React-Query Query
  const {
    isSuccess: isMapSuccess,
    isLoading: isMapLoading,
    isError: isMapError,
    data: mapData,
  } = useQuery({
    queryKey: ['koreaMapData'],
    queryFn: () => getAllKoreaMapData(),
    enabled: true,
    retry: false,
    refetchOnMount: false,
    placeholderData: koreaMapDataToObject(koreaMapDataInit),
  });

  // React-Query Query
  const {
    isSuccess: isColorSuccess,
    isLoading: isColorLoading,
    isError: isColorError,
    data: colorData,
  } = useQuery({
    queryKey: ['colorMapList'],
    queryFn: () => getKoreaMapDataByColor(),
    enabled: true,
    retry: false,
  });

  return {
    isMapSuccess,
    isMapLoading,
    isMapError,
    mapData,
    isColorSuccess,
    isColorLoading,
    isColorError,
    colorData,
  };
};

export default useKoreaMapQuery;
