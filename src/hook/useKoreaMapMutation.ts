import {useMutation, useQueryClient} from '@tanstack/react-query';
import {IKoreaRegionData} from 'src/types/koreaMap';
import {
  deleteMapDataById,
  resetMapData,
  updateMapColorById,
  updateMapPhotoById,
} from 'src/utils/koreaMap.db';

const useKoreaMapMutation = () => {
  // Access the client
  const queryClient = useQueryClient();

  // React-Query Mutation
  // Reset Map Mutation
  const resetMapMutation = useMutation({
    mutationFn: () => resetMapData(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['koreaMapData'],
        refetchType: 'all',
      });
      await queryClient.invalidateQueries({
        queryKey: ['dashboardKoreaMap'],
        refetchType: 'all',
      });
      await queryClient.invalidateQueries({
        queryKey: ['colorMapList'],
        refetchType: 'all',
      });
    },
  });

  // Delete Map Mutation
  const deleteMapMutation = useMutation({
    mutationFn: (data: IKoreaRegionData) => deleteMapDataById(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['koreaMapData'],
        refetchType: 'all',
      });
      await queryClient.invalidateQueries({
        queryKey: ['dashboardKoreaMap'],
        refetchType: 'all',
      });
      await queryClient.invalidateQueries({
        queryKey: ['colorMapList'],
        refetchType: 'all',
      });
    },
  });

  // Update Map by photo Mutation
  const updateMapByPhotoMutation = useMutation({
    mutationFn: ({data, uri}: {data: IKoreaRegionData; uri: string}) =>
      updateMapPhotoById(data, uri),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['koreaMapData'],
        refetchType: 'all',
      });
      await queryClient.invalidateQueries({
        queryKey: ['dashboardKoreaMap'],
        refetchType: 'all',
      });
      await queryClient.invalidateQueries({
        queryKey: ['colorMapList'],
        refetchType: 'all',
      });
    },
  });

  // Update Map by color Mutation
  const updateMapByColorMutation = useMutation({
    mutationFn: ({data, color}: {data: IKoreaRegionData; color: string}) =>
      updateMapColorById(data, color),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['koreaMapData'],
        refetchType: 'all',
      });
      await queryClient.invalidateQueries({
        queryKey: ['dashboardKoreaMap'],
        refetchType: 'all',
      });
      await queryClient.invalidateQueries({
        queryKey: ['colorMapList'],
        refetchType: 'all',
      });
    },
  });

  return {
    resetMapMutation,
    deleteMapMutation,
    updateMapByPhotoMutation,
    updateMapByColorMutation,
  };
};

export default useKoreaMapMutation;
