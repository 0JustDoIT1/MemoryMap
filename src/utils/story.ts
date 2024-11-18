import {RegionCount} from 'src/types/account';
import {KoreaMapData, KoreaRegionData} from 'src/types/koreaMap';
import {StoryObject} from 'src/types/story';

export const addStoryCountInKoreaMapData = (
  data: KoreaMapData,
  id: string,
  count: number,
) => {
  const regionData: KoreaRegionData = {
    ...data[id],
    story: data[id].story + count,
  };

  const updateData: KoreaMapData = {
    ...data,
    [id]: regionData,
  };

  return updateData;
};

// regionId에 속하는 지역들 삭제한 후, json형태로 반환 (StoryObject)
export const deleteStoryByRegionId = (data: StoryObject, regionId: string) => {
  let storyJson: StoryObject = {};

  const story = {
    ...data,
  };

  const filterStoryArr = Object.values(story).filter(
    item => item.regionId !== regionId,
  );
  filterStoryArr.forEach(item => {
    storyJson[item._id] = {...item};
  });

  return storyJson;
};

// 스토리 갯수 카운팅
export const countingStory = (data: RegionCount, id: string, count: number) => {
  const mainId = `${id.split('-')[0]}-${id.split('-')[1]}`;
  const updateCount = {
    ...data,
    [mainId]: {
      ...data[mainId],
      story: data[mainId].story + count,
    },
  };

  return updateCount;
};

// 삭제해야 될 스토리 수 계산
export const getDeleteStoryCount = (data: StoryObject, update: StoryObject) => {
  const deleteCount =
    Object.values({...data}).length - Object.values(update).length;

  return deleteCount * -1;
};
