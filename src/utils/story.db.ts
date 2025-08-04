import {getDBConnection} from 'src/database/sqlite';
import {IStory} from 'src/types/story';
import {
  getOneStoryToDB,
  getStoryRegionIdToDB,
  getStoryPaginationToDB,
  countStoryToDB,
  highestPointStoryRegionToDB,
  maxStoryNumToDB,
  getStoryAllToDB,
} from 'src/database/read';
import {saveStoryToDB} from 'src/database/create';
import {deleteOneStoryToDB} from 'src/database/delete';
import {ResultSet} from 'react-native-sqlite-storage';
import {getRegionTitleById} from './koreaMap.util';

// Result data convert Story Type
const _resultToStory = (data: any) => {
  const story: IStory = {
    id: data['id'],
    regionId: data['regionId'],
    startDate: data['startDate'],
    endDate: data['endDate'],
    title: data['title'],
    contents: data['contents'],
    point: data['point'],
    createdAt: data['createdAt'],
    updatedAt: data['updatedAt'],
  };

  return story;
};

// Result data array convert Story array
export const resultArrToStoryArr = (data: [ResultSet]) => {
  const storyArray: IStory[] = [];
  for (let i = 0; i < data[0].rows.length; i++) {
    const item = data[0].rows.item(i);
    const newStory: IStory = _resultToStory(item);

    storyArray.push(newStory);
  }
  return storyArray;
};

// Get All Story -> SQLite
export const getStoryAll = async () => {
  const db = await getDBConnection();
  const result = await getStoryAllToDB(db).then(res =>
    resultArrToStoryArr(res),
  );

  return result;
};

// Get Story with pagination -> SQLite
export const getStoryPagination = async (
  page: number,
  option: {
    limit: number;
    // offset: number;
    filter?: string;
    order?: string;
    sort?: string;
  },
) => {
  const db = await getDBConnection();
  const result = await getStoryPaginationToDB(db, page, option);

  return result;
};

// Get Story by id (one document)
export const getOneStoryById = async (id: string) => {
  const db = await getDBConnection();
  const result = await getOneStoryToDB(db, id).then(res => res[0].rows.item(0));

  return result;
};

// Add story by region id -> Firebase & Recoil
export const addStoryByRegionId = async (data: IStory) => {
  // Save SQLite
  const db = await getDBConnection();
  await saveStoryToDB(db, data);
};

// Delete story by Region id -> Firebase & Recoil
export const deleteStoryById = async (id: string) => {
  // Delete SQLite
  const db = await getDBConnection();
  await deleteOneStoryToDB(db, id);
};

// Get region id list by story exist
export const getStoryRegionList = async () => {
  const regionIdArray: string[] = [];
  // Get SQLite
  const db = await getDBConnection();
  const result = await getStoryRegionIdToDB(db);

  for (let i = 0; i < result[0].rows.length; i++) {
    let regionId = result[0].rows.item(i)['regionId'];
    if (regionId.split('-').length - 1 >= 2)
      regionId = `${regionId.split('-')[0]}-${regionId.split('-')[1]}`;

    regionIdArray.push(regionId);
  }

  const mainIdArray = [...new Set(regionIdArray)];

  return mainIdArray;
};

// Get Dashboard of Story
export const getDashboardStory = async () => {
  // Get SQLite
  const db = await getDBConnection();
  const count = await countStoryToDB(db);
  const pointRegion: {title: string; avg: number}[] = [];
  await highestPointStoryRegionToDB(db).then(res => {
    for (let i = 0; i < res[0].rows.length; i++) {
      const item = res[0].rows.item(i);
      const title = getRegionTitleById(item['regionId']);

      if (i !== 0 && pointRegion[0].avg > item['avg']) return;
      pointRegion.push({title: title, avg: item['avg']});
    }
  });
  const countRegion: {title: string; count: number}[] = [];
  await maxStoryNumToDB(db).then(res => {
    for (let i = 0; i < res[0].rows.length; i++) {
      const item = res[0].rows.item(i);
      const title = getRegionTitleById(item['regionId']);

      if (i !== 0 && countRegion[0].count > item['count']) return;
      countRegion.push({title: title, count: item['count']});
    }
  });

  return {count: count, pointRegion: pointRegion, countRegion: countRegion};
};
