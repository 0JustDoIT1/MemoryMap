import {useMutation, useQueryClient} from '@tanstack/react-query';
import {REACT_QUERY_KEYS} from 'src/constants/queryKey';
import {IKoreaRegionData} from 'src/types/koreaMap';
import {
  deleteMapDataById,
  resetMapData,
  updateMapColorById,
  updateMapPhotoById,
} from 'src/utils/data/sqlite/koreaMap.db';

const useKoreaMapMutation = () => {
  // Access the client
  const queryClient = useQueryClient();

  const invalidatekoreaMapQueries = async () => {
    await queryClient.invalidateQueries({
      queryKey: REACT_QUERY_KEYS.koreaMapData,
      refetchType: 'all',
    });
    await queryClient.invalidateQueries({
      queryKey: REACT_QUERY_KEYS.dashboard.koreaMap,
      refetchType: 'all',
    });
    await queryClient.invalidateQueries({
      queryKey: REACT_QUERY_KEYS.colorMapList,
      refetchType: 'all',
    });
  };

  // React-Query Mutation
  // Reset Map Mutation
  const resetMapMutation = useMutation({
    mutationFn: resetMapData,
    onSuccess: invalidatekoreaMapQueries,
  });

  // Delete Map Mutation
  const deleteMapMutation = useMutation({
    mutationFn: (data: IKoreaRegionData) => deleteMapDataById(data),
    onSuccess: invalidatekoreaMapQueries,
  });

  // Update Map by photo Mutation
  const updateMapByPhotoMutation = useMutation({
    mutationFn: ({data, uri}: {data: IKoreaRegionData; uri: string}) =>
      updateMapPhotoById(data, uri),
    onSuccess: invalidatekoreaMapQueries,
  });

  // Update Map by color Mutation
  const updateMapByColorMutation = useMutation({
    mutationFn: ({data, color}: {data: IKoreaRegionData; color: string}) =>
      updateMapColorById(data, color),
    onSuccess: invalidatekoreaMapQueries,
  });

  return {
    resetMapMutation,
    deleteMapMutation,
    updateMapByPhotoMutation,
    updateMapByColorMutation,
  };
};

export default useKoreaMapMutation;
