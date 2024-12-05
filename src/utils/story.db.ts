import {getDBConnection} from 'src/database/sqlite';
import {Story} from 'src/types/story';
import {deleteDocAll, deleteDocOne, setDoc} from 'src/firebase/firestore';
import {
  getOneStoryToDB,
  getStoryRegionIdToDB,
  getStoryPaginationToDB,
  countStoryToDB,
  highestPointStoryRegionToDB,
  maxStoryNumToDB,
} from 'src/database/read';
import {saveStoryToDB} from 'src/database/create';
import {deleteAllStoryToDB, deleteOneStoryToDB} from 'src/database/delete';
import {ResultSet} from 'react-native-sqlite-storage';
import {
  getColorRegionList,
  getRegionTitleByList,
  koreaMapDataToObject,
} from './koreaMap.util';
import {koreaMapDataInit} from 'src/constants/koreaMapData';

// Result data convert Story Type
const _resultToStory = (data: any) => {
  const story: Story = {
    id: data['id'],
    uid: data['uid'],
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
  const storyArray: Story[] = [];
  for (let i = 0; i < data[0].rows.length; i++) {
    const item = data[0].rows.item(i);
    const newStory: Story = _resultToStory(item);

    storyArray.push(newStory);
  }
  return storyArray;
};

// Get Story with pagination -> SQLite
export const getStoryPagination = async (
  uid: string,
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
  const result = await getStoryPaginationToDB(db, uid, page, option);

  return result;
};

// Get Story by id (one document)
export const getOneStoryById = async (id: string) => {
  const db = await getDBConnection();
  const result = await getOneStoryToDB(db, id).then(res => res[0].rows.item(0));

  return result;
};

// Add story by region id -> Firebase & Recoil
export const addStoryByRegionId = async (data: Story) => {
  // Save SQLite
  const db = await getDBConnection();
  await saveStoryToDB(db, data);
  // Save Firebase
  await setDoc(data);
};

// Delete story by Region id -> Firebase & Recoil
export const deleteStoryById = async (id: string) => {
  // Delete Firebase
  await deleteDocOne(id);
  // Delete SQLite
  const db = await getDBConnection();
  await deleteOneStoryToDB(db, id);
};

// Get region id list by story exist
export const getStoryRegionList = async (uid: string) => {
  const regionIdArray: string[] = [];
  // Get SQLite
  const db = await getDBConnection();
  await getStoryRegionIdToDB(db, uid).then(res => {
    for (let i = 0; i < res[0].rows.length; i++) {
      const regionId = res[0].rows.item(i)['regionId'];
      regionIdArray.push(regionId);
    }
  });

  // Setting Data
  const koreaMapDataObject = koreaMapDataToObject(koreaMapDataInit);

  const colorArray = regionIdArray.map(item => koreaMapDataObject[item]);
  const colorObject = koreaMapDataToObject(colorArray);

  const regionList = getColorRegionList(colorObject);
  const regionMainList = Object.keys(regionList).sort();

  return {all: regionList, main: regionMainList};
};

// Get Dashboard of Story
export const getDashboardStory = async (uid: string) => {
  // Get SQLite
  const db = await getDBConnection();
  const count = await countStoryToDB(db, uid).then(
    res => res[0].rows.item(0)['count'],
  );
  const pointRegion: {title: string; avg: number}[] = [];
  await highestPointStoryRegionToDB(db, uid).then(res => {
    for (let i = 0; i < res[0].rows.length; i++) {
      const item = res[0].rows.item(i);
      const title = getRegionTitleByList(item['regionId']);

      if (i !== 0 && pointRegion[0].avg > item['avg']) return;
      pointRegion.push({title: title, avg: item['avg']});
    }
  });
  const countRegion: {title: string; count: number}[] = [];
  await maxStoryNumToDB(db, uid).then(res => {
    for (let i = 0; i < res[0].rows.length; i++) {
      const item = res[0].rows.item(i);
      const title = getRegionTitleByList(item['regionId']);

      if (i !== 0 && countRegion[0].count > item['count']) return;
      countRegion.push({title: title, count: item['count']});
    }
  });

  return {count: count, pointRegion: pointRegion, countRegion: countRegion};
};
