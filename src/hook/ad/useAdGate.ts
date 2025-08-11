import {useCallback, useEffect, useRef} from 'react';
import useAd from './useAd';
import {IAppAdShowType} from 'src/types/appData';

export const useAdGate = () => {
  const {load, show, isClosed, checkAdShow} = useAd();

  // 광고 닫힘 후 성공 이벤트 중복 방지
  const pendingAdActionRef = useRef(false);
  // 성공 콜백 보관소
  const successRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    load();
  }, [load]);

  const runWithAdGate = useCallback(
    async (
      type: IAppAdShowType,
      action: () => Promise<void>,
      actionSuccess: () => void,
    ) => {
      try {
        const needAd = await checkAdShow(type);
        successRef.current = actionSuccess;

        if (needAd) {
          show(); // 광고 노출
          await action();

          if (isClosed) {
            actionSuccess();
            successRef.current = null;
            load();
          } else {
            pendingAdActionRef.current = true;
          }
        } else {
          await action();
          actionSuccess();
          successRef.current = null;
        }
      } catch (error) {
        pendingAdActionRef.current = false;
        successRef.current = null;
      }
    },
    [checkAdShow, show, isClosed, load],
  );

  // 광고 닫힘 감지 후 단 한 번만 이벤트 동작
  useEffect(() => {
    if (isClosed && pendingAdActionRef.current) {
      pendingAdActionRef.current = false;
      successRef.current?.();
      successRef.current = null;
      load(); // 다음 광고 로드
    }
  }, [isClosed, load]);

  // 언마운트 시 플래그 정리 (안전)
  useEffect(() => {
    return () => {
      pendingAdActionRef.current = false;
      successRef.current = null;
    };
  }, []);

  return {runWithAdGate};
};
