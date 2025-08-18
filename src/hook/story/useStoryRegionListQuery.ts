import {useQuery} from '@tanstack/react-query';
import {getStoryRegionList} from 'src/utils/data/sqlite/story.db';
import {REACT_QUERY_KEYS} from 'src/constants/queryKey';

export const useStoryRegionListQuery = () => {
  return useQuery({
    queryKey: REACT_QUERY_KEYS.storyRegionList,
    queryFn: getStoryRegionList,
    staleTime: Infinity,
    retry: false,
  });
};
