import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Story} from 'src/types/story';
import {updateKoreaMapDataStory} from 'src/database/koreaMap.db';
import {addStoryByRegionId} from 'src/database/story.db';

const useUpdateStory = (storyId?: string) => {
  // Access the client
  const queryClient = useQueryClient();

  // React-Query Mutation
  const editStoryMutation = useMutation({
    mutationFn: (data: Story) => addStoryByRegionId(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['story'],
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
    mutationFn: (data: Story) => addStoryByRegionId(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['story'],
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

  return {editStoryMutation, addStoryMutation, updateMapMutation};
};

export default useUpdateStory;
