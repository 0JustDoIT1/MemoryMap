// src/hook/story/useUpdateStory.ts
import {useCallback} from 'react';
import {adShowCategory} from 'src/constants/app';
import {IStory} from 'src/types/story';
import {showBottomToast} from 'src/utils/showToast';
import useStoryUpdateMutation from './useStoryUpdateMutation';
import {useAdGate} from '../ad/useAdGate';
import {useActionLock} from '../common/useActionLock';

interface IUseUpdateStory {
  settingStoryData: () => IStory;
  onUpdateStorySuccess: () => void;
  storyId?: string; // useStoryUpdate가 id를 필요로 하면 받기
}

export const useUpdateStory = ({
  settingStoryData,
  onUpdateStorySuccess,
  storyId,
}: IUseUpdateStory) => {
  const {updateStoryMutation} = useStoryUpdateMutation(storyId);
  const {runWithAdGate} = useAdGate();
  const {isDisabled, onLoading, wrap} = useActionLock();

  // 실제 업데이트 이벤트
  const onUpdatingStory = useCallback(async () => {
    const newStory = settingStoryData();
    await updateStoryMutation.mutateAsync(newStory);
  }, [settingStoryData, updateStoryMutation]);

  // 버튼 handler
  const onUpdateStory = wrap(async () => {
    try {
      await runWithAdGate(
        adShowCategory.story,
        onUpdatingStory,
        onUpdateStorySuccess,
      );
    } catch (e) {
      showBottomToast('error', '스토리 수정에 실패했습니다.');
    }
  });

  // 버튼 비활성화 처리
  const buttonDisabled = isDisabled || updateStoryMutation.isPending;

  return {onUpdateStory, isBusy: onLoading, isDisabled: buttonDisabled};
};
