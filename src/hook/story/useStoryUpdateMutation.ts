import {useMutation, useQueryClient} from '@tanstack/react-query';
import {REACT_QUERY_KEYS} from 'src/constants/queryKey';
import {IStory} from 'src/types/story';
import {updateKoreaMapDataStory} from 'src/utils/data/sqlite/koreaMap.db';
import {addStoryByRegionId} from 'src/utils/data/sqlite/story.db';

const useStoryUpdateMutation = (storyId?: string) => {
  // Access the client
  const queryClient = useQueryClient();

  // React-Query Mutation
  const updateStoryMutation = useMutation({
    mutationFn: (data: IStory) => addStoryByRegionId(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: REACT_QUERY_KEYS.storyList.root,
        refetchType: 'all',
      });
      await queryClient.invalidateQueries({
        queryKey: REACT_QUERY_KEYS.storyRegionList,
        refetchType: 'all',
      });

      await queryClient.invalidateQueries({
        queryKey: REACT_QUERY_KEYS.dashboard.story,
        refetchType: 'all',
      });
      if (storyId) {
        await queryClient.invalidateQueries({
          queryKey: REACT_QUERY_KEYS.story(storyId),
          refetchType: 'all',
        });
      }
    },
  });

  const addStoryMutation = useMutation({
    mutationFn: (data: IStory) => addStoryByRegionId(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: REACT_QUERY_KEYS.storyList.root,
        refetchType: 'all',
      });
      await queryClient.invalidateQueries({
        queryKey: REACT_QUERY_KEYS.storyRegionList,
        refetchType: 'all',
      });
      await queryClient.invalidateQueries({
        queryKey: REACT_QUERY_KEYS.dashboard.story,
        refetchType: 'all',
      });
    },
  });
  const updateMapMutation = useMutation({
    mutationFn: ({id, count}: {id: string; count: number}) =>
      updateKoreaMapDataStory(id, count),
    onSuccess: async () =>
      await queryClient.invalidateQueries({
        queryKey: REACT_QUERY_KEYS.koreaMapData,
        refetchType: 'all',
      }),
  });

  return {
    updateStoryMutation,
    addStoryMutation,
    updateMapMutation,
  };
};

export default useStoryUpdateMutation;
