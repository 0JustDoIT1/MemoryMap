import {useQuery} from '@tanstack/react-query';
import {koreaMapDataInit} from 'src/constants/koreaMapData';
import {REACT_QUERY_KEYS} from 'src/constants/queryKey';
import {
  getAllKoreaMapData,
  getKoreaMapDataByColor,
} from 'src/utils/koreaMap.db';
import {koreaMapDataToObject} from 'src/utils/koreaMap.util';

const useKoreaMapQuery = () => {
  const commonOptions = {
    enabled: true,
    retry: false,
    refetchOnMount: false,
  };

  // React-Query Query
  const {
    isSuccess: isMapSuccess,
    isLoading: isMapLoading,
    isError: isMapError,
    data: mapData,
  } = useQuery({
    queryKey: REACT_QUERY_KEYS.koreaMapData,
    queryFn: () => getAllKoreaMapData(),
    placeholderData: koreaMapDataToObject(koreaMapDataInit),
    ...commonOptions,
  });

  // React-Query Query
  const {
    isSuccess: isColorSuccess,
    isLoading: isColorLoading,
    isError: isColorError,
    data: colorData,
  } = useQuery({
    queryKey: REACT_QUERY_KEYS.colorMapList,
    queryFn: () => getKoreaMapDataByColor(),
    ...commonOptions,
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
