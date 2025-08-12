import {useQuery} from '@tanstack/react-query';
import {REACT_QUERY_KEYS} from 'src/constants/queryKey';
import {getOneStoryById} from 'src/utils/story.db';

export const useStoryViewQuery = (storyId: string) => {
  const query = useQuery({
    queryKey: REACT_QUERY_KEYS.story(storyId),
    queryFn: () => getOneStoryById(storyId),
    enabled: true,
    retry: false,
  });

  return query;
};
