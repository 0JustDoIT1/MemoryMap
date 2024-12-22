import {useMutation, useQueryClient} from '@tanstack/react-query';
import {KoreaRegionData} from 'src/types/koreaMap';
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
    mutationFn: (data: KoreaRegionData) => deleteMapDataById(data),
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
    mutationFn: ({
      data,
      uri,
      imageStyle,
    }: {
      data: KoreaRegionData;
      uri: string;
      imageStyle: {width: number; height: number};
    }) => updateMapPhotoById(data, uri, imageStyle),
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
    mutationFn: ({data, color}: {data: KoreaRegionData; color: string}) =>
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
