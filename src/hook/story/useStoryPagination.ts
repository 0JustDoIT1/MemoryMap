import {useState, useCallback} from 'react';
import {initPagination} from 'src/constants/story';
import {IPagination} from 'src/types/story';

export const useStoryPagination = (initial: IPagination = initPagination) => {
  const [pagination, setPagination] = useState<IPagination>(initial);

  const toggleSort = useCallback(() => {
    setPagination(prev => ({
      ...prev,
      sort: prev.sort === 'ASC' ? 'DESC' : 'ASC',
    }));
  }, []);

  const selectFilter = useCallback((filter: string) => {
    setPagination(prev => ({
      ...prev,
      filter,
    }));
  }, []);

  return {
    pagination,
    setPagination,
    toggleSort,
    selectFilter,
  };
};
