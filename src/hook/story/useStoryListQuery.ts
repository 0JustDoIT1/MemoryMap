import {useInfiniteQuery} from '@tanstack/react-query';
import {REACT_QUERY_KEYS} from 'src/constants/queryKey';
import {IPagination} from 'src/types/story';
import {getStoryPagination} from 'src/utils/story.db';

export const useStoryListQuery = (pagination: IPagination) => {
  const query = useInfiniteQuery({
    queryKey: REACT_QUERY_KEYS.storyList.withPagination(pagination),
    queryFn: ({pageParam}) => getStoryPagination(pageParam, pagination),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      const nextPage = lastPage.currentPage + 1;
      return nextPage > lastPage.totalPage ? null : nextPage;
    },
    staleTime: 1000 * 60 * 3,
    refetchOnWindowFocus: false,
  });

  // Loading story data when flatlist reach end
  const onLoadMoreStory = () => {
    if (query.hasNextPage) {
      query.fetchNextPage();
    }
  };

  return {
    ...query,
    onLoadMoreStory,
  };
};
