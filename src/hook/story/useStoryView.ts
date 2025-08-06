import {useQuery} from '@tanstack/react-query';
import {getOneStoryById} from 'src/utils/story.db';

export const useStoryView = (storyId: string) => {
  const query = useQuery({
    queryKey: ['viewStory', storyId],
    queryFn: () => getOneStoryById(storyId),
    enabled: true,
    retry: false,
  });

  return query;
};
