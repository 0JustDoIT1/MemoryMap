import {useMutation, useQueryClient} from '@tanstack/react-query';
import {IStory} from 'src/types/story';
import {updateKoreaMapDataStory} from 'src/utils/koreaMap.db';
import {addStoryByRegionId} from 'src/utils/story.db';

const useStoryUpdate = (storyId?: string) => {
  // Access the client
  const queryClient = useQueryClient();

  // React-Query Mutation
  const updateStoryMutation = useMutation({
    mutationFn: (data: IStory) => addStoryByRegionId(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['storyList'],
        refetchType: 'all',
      });
      await queryClient.invalidateQueries({
        queryKey: ['storyRegionList'],
        refetchType: 'all',
      });
      await queryClient.invalidateQueries({
        queryKey: ['viewStory', storyId],
        refetchType: 'all',
      });
      await queryClient.invalidateQueries({
        queryKey: ['dashboardStory'],
        refetchType: 'all',
      });
    },
  });

  const addStoryMutation = useMutation({
    mutationFn: (data: IStory) => addStoryByRegionId(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['storyList'],
        refetchType: 'all',
      });
      await queryClient.invalidateQueries({
        queryKey: ['storyRegionList'],
        refetchType: 'all',
      });
      await queryClient.invalidateQueries({
        queryKey: ['dashboardStory'],
        refetchType: 'all',
      });
    },
  });
  const updateMapMutation = useMutation({
    mutationFn: ({id, count}: {id: string; count: number}) =>
      updateKoreaMapDataStory(id, count),
    onSuccess: async () =>
      await queryClient.invalidateQueries({
        queryKey: ['koreaMapData'],
        refetchType: 'all',
      }),
  });

  return {
    updateStoryMutation,
    addStoryMutation,
    updateMapMutation,
  };
};

export default useStoryUpdate;
