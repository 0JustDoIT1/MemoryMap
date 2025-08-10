import {useCallback, useEffect, useRef} from 'react';
import {adShowType} from 'src/constants/app';
import {IStory} from 'src/types/story';
import {showBottomToast} from 'src/utils/showToast';
import useButton from '../useButton';
import useAd from '../useAd';
import useStoryUpdate from './useStoryUpdate';

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
  const {isDisabled, disabledButton, abledButton} = useButton();
  const {load, show, isClosed, checkAdShow} = useAd();
  const {addStoryMutation, updateMapMutation} = useStoryUpdate();

  // 광고 닫힘 후 성공 네비 중복 방지
  const pendingAdActionRef = useRef(false);
  // 연타 방지
  const submittingRef = useRef(false);

  useEffect(() => {
    load();
  }, [load]);

  const onAddingStory = useCallback(async () => {
    const newStory = settingStoryData();
    await addStoryMutation.mutateAsync(newStory);
    await updateMapMutation.mutateAsync({id: regionId, count: 1});
  }, [settingStoryData, addStoryMutation, updateMapMutation, regionId]);

  const onAddStory = useCallback(async () => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    disabledButton();
    try {
      const adShow = await checkAdShow(adShowType.story);
      if (adShow) {
        show(); // 광고 노출
        await onAddingStory(); // 저장 성공시만 플래그 on
        // 광고가 이미 닫혀 있었다면 즉시 이동
        if (isClosed) {
          onAddStorySuccess();
          load();
        } else {
          pendingAdActionRef.current = true;
        }
      } else {
        await onAddingStory();
        onAddStorySuccess();
      }
    } catch (e) {
      pendingAdActionRef.current = false;
      showBottomToast('error', '스토리 추가에 실패했습니다.');
    } finally {
      submittingRef.current = false;
      abledButton();
    }
  }, [
    disabledButton,
    abledButton,
    checkAdShow,
    show,
    onAddingStory,
    onAddStorySuccess,
    isClosed,
    load,
  ]);

  // 버튼 비활성화 처리
  const isBusy = addStoryMutation.isPending || updateMapMutation.isPending;
  const buttonDisabled = isDisabled || isBusy;

  // 광고 닫힘 감지 후 단 한 번만 네비게이션
  useEffect(() => {
    if (isClosed && pendingAdActionRef.current) {
      pendingAdActionRef.current = false;
      onAddStorySuccess();
      load(); // 다음 광고 로드
    }
  }, [isClosed, load, onAddStorySuccess]);

  // 언마운트 시 플래그 정리 (안전)
  useEffect(() => {
    return () => {
      pendingAdActionRef.current = false;
      submittingRef.current = false;
    };
  }, []);

  return {onAddStory, isDisabled: buttonDisabled, isBusy};
};
