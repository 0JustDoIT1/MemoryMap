import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteStoryById} from 'src/utils/story.db';
import {updateKoreaMapDataStory} from 'src/utils/koreaMap.db';
import useButton from '../common/useButton';
import {showBottomToast} from 'src/utils/showToast';
import {REACT_QUERY_KEYS} from 'src/constants/queryKey';

export const useStoryDeleteMutation = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
  const {isDisabled, disabledButton, abledButton} = useButton();

  const invalidateDeleteStoryQueries = async () => {
    await queryClient.invalidateQueries({
      queryKey: REACT_QUERY_KEYS.storyList.root,
      refetchType: 'all',
    });
    await queryClient.invalidateQueries({
      queryKey: REACT_QUERY_KEYS.storyRegionList,
      refetchType: 'all',
    });
    await queryClient.invalidateQueries({
      queryKey: REACT_QUERY_KEYS.koreaMapData,
      refetchType: 'all',
    });
    await queryClient.invalidateQueries({
      queryKey: REACT_QUERY_KEYS.dashboard.story,
      refetchType: 'all',
    });
  };

  const deleteStoryMutation = useMutation({
    mutationFn: deleteStoryById,
  });

  const updateMapMutation = useMutation({
    mutationFn: ({id, count}: {id: string; count: number}) =>
      updateKoreaMapDataStory(id, count),
  });

  const deleteStory = async (storyId: string, regionId: string) => {
    try {
      disabledButton();

      await deleteStoryMutation.mutateAsync(storyId);
      await updateMapMutation.mutateAsync({id: regionId, count: -1});

      await invalidateDeleteStoryQueries();

      onSuccess();
    } catch (err) {
      showBottomToast('error', '스토리 삭제에 실패했습니다.');
    } finally {
      abledButton();
    }
  };

  return {
    deleteStory,
    isDisabled,
  };
};
