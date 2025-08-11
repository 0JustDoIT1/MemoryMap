// src/hook/common/useActionLock.ts
import {useCallback} from 'react';
import useButton from './useButton';
import useLoading from './useLoading';

export const useActionLock = () => {
  const {isDisabled, disabledButton, abledButton} = useButton();
  const {onLoading, startLoading, endLoading} = useLoading();

  const wrap = useCallback(
    <T extends any[]>(fn: (...a: T) => Promise<void>) => {
      return async (...args: T) => {
        disabledButton();
        startLoading();
        try {
          await fn(...args);
        } finally {
          endLoading();
          abledButton();
        }
      };
    },
    [disabledButton, startLoading, endLoading, abledButton],
  );

  return {isDisabled, onLoading, wrap};
};
