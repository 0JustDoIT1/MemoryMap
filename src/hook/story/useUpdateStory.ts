// src/hook/story/useUpdateStory.ts
import {useCallback, useEffect, useRef} from 'react';
import {adShowType} from 'src/constants/app';
import {IStory} from 'src/types/story';
import {showBottomToast} from 'src/utils/showToast';
import useButton from '../useButton';
import useAd from '../useAd';
import useStoryUpdate from './useStoryUpdate';

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
  const {isDisabled, disabledButton, abledButton} = useButton();
  const {load, show, isClosed, checkAdShow} = useAd();
  const {updateStoryMutation} = useStoryUpdate(storyId);

  const pendingAdActionRef = useRef(false);
  const submittingRef = useRef(false);

  useEffect(() => {
    load();
  }, [load]);

  const onUpdatingStory = useCallback(async () => {
    const newStory = settingStoryData();
    await updateStoryMutation.mutateAsync(newStory);
  }, [settingStoryData, updateStoryMutation]);

  const onUpdateStory = useCallback(async () => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    disabledButton();
    try {
      const adShow = await checkAdShow(adShowType.story);
      if (adShow) {
        show();
        await onUpdatingStory();
        if (isClosed) {
          onUpdateStorySuccess();
          load();
        } else {
          pendingAdActionRef.current = true;
        }
      } else {
        await onUpdatingStory();
        onUpdateStorySuccess();
      }
    } catch (e) {
      pendingAdActionRef.current = false;
      showBottomToast('error', '스토리 수정에 실패했습니다.');
    } finally {
      submittingRef.current = false;
      abledButton();
    }
  }, [
    disabledButton,
    abledButton,
    checkAdShow,
    show,
    onUpdatingStory,
    onUpdateStorySuccess,
    isClosed,
    load,
  ]);

  const isBusy = updateStoryMutation.isPending;
  const buttonDisabled = isDisabled || isBusy;

  useEffect(() => {
    if (isClosed && pendingAdActionRef.current) {
      pendingAdActionRef.current = false;
      onUpdateStorySuccess();
      load();
    }
  }, [isClosed, load, onUpdateStorySuccess]);

  useEffect(() => {
    return () => {
      pendingAdActionRef.current = false;
      submittingRef.current = false;
    };
  }, []);

  return {onUpdateStory, isBusy, isDisabled: buttonDisabled};
};
