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

  // 광고 닫힘 후 성공 네비 중복 방지
  const pendingAdActionRef = useRef(false);
  // 연타 방지
  const submittingRef = useRef(false);

  useEffect(() => {
    load();
  }, [load]);

  const onUpdatingStory = useCallback(async () => {
    const newStory = settingStoryData();
    await updateStoryMutation.mutateAsync(newStory);
  }, [settingStoryData, updateStoryMutation]);

  // Update Story
  const onUpdateStory = useCallback(async () => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    disabledButton();
    try {
      const adShow = await checkAdShow(adShowType.story);
      if (adShow) {
        show(); // 광고 노출
        await onUpdatingStory(); // 저장 성공시만 플래그 on
        // 광고가 이미 닫혀 있었다면 즉시 이동
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

  // 버튼 비활성화 처리
  const isBusy = updateStoryMutation.isPending;
  const buttonDisabled = isDisabled || isBusy;

  // 광고 닫힘 감지 후 단 한 번만 네비게이션
  useEffect(() => {
    if (isClosed && pendingAdActionRef.current) {
      pendingAdActionRef.current = false;
      onUpdateStorySuccess();
      load(); // 다음 광고 로드
    }
  }, [isClosed, load, onUpdateStorySuccess]);

  // 언마운트 시 플래그 정리 (안전)
  useEffect(() => {
    return () => {
      pendingAdActionRef.current = false;
      submittingRef.current = false;
    };
  }, []);

  return {onUpdateStory, isBusy, isDisabled: buttonDisabled};
};
