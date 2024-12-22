import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {updateKoreaMapDataStory} from 'src/utils/koreaMap.db';
import {deleteStoryById, getOneStoryById} from 'src/utils/story.db';

const useStoryView = (storyId: string) => {
  // Access the client
  const queryClient = useQueryClient();

  // React-Query Query
  const {isSuccess, isLoading, isError, data} = useQuery({
    queryKey: ['viewStory', storyId],
    queryFn: () => getOneStoryById(storyId),
    enabled: true,
    retry: false,
  });

  // React-Query Mutation
  const deleteStoryMutation = useMutation({
    mutationFn: deleteStoryById,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['story'],
        refetchType: 'all',
      });
      await queryClient.invalidateQueries({
        queryKey: ['koreaMapData'],
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['story'],
        refetchType: 'all',
      });
      await queryClient.invalidateQueries({
        queryKey: ['koreaMapData'],
        refetchType: 'all',
      });
      await queryClient.invalidateQueries({
        queryKey: ['dashboardStory'],
        refetchType: 'all',
      });
    },
  });

  return {
    isSuccess,
    isLoading,
    isError,
    data,
    deleteStoryMutation,
    updateMapMutation,
  };
};

export default useStoryView;
