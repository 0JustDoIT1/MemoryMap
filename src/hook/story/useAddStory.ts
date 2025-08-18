import {useCallback} from 'react';
import {adShowCategory} from 'src/constants/app';
import {IStory} from 'src/types/story';
import {showBottomToast} from 'src/utils/ui/showToast';
import useStoryUpdateMutation from './useStoryUpdateMutation';
import {useAdGate} from '../ad/useAdGate';
import {useActionLock} from '../common/useActionLock';

interface IUseAddStory {
  settingStoryData: () => IStory;
  regionId: string;
  onAddStorySuccess: () => void;
}

export const useAddStory = ({
  settingStoryData,
  regionId,
  onAddStorySuccess,
}: IUseAddStory) => {
  const {addStoryMutation, updateMapMutation} = useStoryUpdateMutation();
  const {runWithAdGate} = useAdGate();
  const {isDisabled, onLoading, wrap} = useActionLock();

  // 실제 추가 이벤트
  const onAddingStory = useCallback(async () => {
    const newStory = settingStoryData();
    await addStoryMutation.mutateAsync(newStory);
    await updateMapMutation.mutateAsync({id: regionId, count: 1});
  }, [settingStoryData, addStoryMutation, updateMapMutation, regionId]);

  // 버튼 handler
  const onAddStory = wrap(async () => {
    try {
      await runWithAdGate(
        adShowCategory.story,
        onAddingStory,
        onAddStorySuccess,
      );
    } catch (e) {
      showBottomToast('error', '스토리 추가에 실패했습니다.');
    }
  });

  // 버튼 비활성화 처리
  const buttonDisabled =
    isDisabled || addStoryMutation.isPending || updateMapMutation.isPending;

  return {onAddStory, isDisabled: buttonDisabled, isBusy: onLoading};
};
