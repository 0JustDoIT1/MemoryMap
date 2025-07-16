import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import {useState} from 'react';
import {Pagination} from 'src/types/story';
import {getStoryPagination, getStoryRegionList} from 'src/utils/story.db';

const useStoryQuery = () => {
  const initPagination = {
    limit: 10,
    filter: '',
    order: 'createdAt',
    sort: 'DESC',
  };

  const [pagination, setPagination] = useState<Pagination>(initPagination);

  // React-Query Query
  const {
    isSuccess: isStorySuccess,
    isLoading: isStoryLoading,
    isError: isStoryError,
    hasNextPage,
    fetchNextPage,
    data: storyData,
  } = useInfiniteQuery({
    queryKey: ['story', pagination],
    queryFn: ({pageParam}) => getStoryPagination(pageParam, pagination),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      const nextPage = lastPage.currentPage + 1;
      return nextPage > lastPage.totalPage ? null : nextPage;
    },
    placeholderData: keepPreviousData,
  });
  const {
    isSuccess: isListSuccess,
    isLoading: isListLoading,
    isError: isListError,
    data: listData,
  } = useQuery({
    queryKey: ['story'],
    queryFn: () => getStoryRegionList(),
    enabled: true,
    retry: false,
  });

  // Loading story data when flatlist reach end
  const onLoadMoreStory = () => {
    if (hasNextPage) fetchNextPage();
  };

  return {
    initPagination,
    pagination,
    setPagination,
    isStorySuccess,
    isStoryLoading,
    isStoryError,
    storyData,
    isListSuccess,
    isListLoading,
    isListError,
    listData,
    onLoadMoreStory,
  };
};

export default useStoryQuery;
