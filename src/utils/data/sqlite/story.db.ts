import {getDBConnection} from 'src/database/sqlite';
import {IStory, IStoryPagination} from 'src/types/story';
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
import {IDashboardStory} from 'src/types/dashboard';
import {getRegionTitleById} from 'src/utils/screen/koreaMap.util';

// Result data convert Story Type
const storyResultSetToObject = (data: IStory): IStory => ({
  id: data['id'],
  regionId: data['regionId'],
  startDate: data['startDate'],
  endDate: data['endDate'],
  title: data['title'],
  contents: data['contents'],
  point: data['point'],
  createdAt: data['createdAt'],
  updatedAt: data['updatedAt'],
});

// Result data array convert Story array
export const resultArrToStoryArr = (data: [ResultSet]): IStory[] => {
  const rows = data[0].rows;
  return Array.from({length: rows.length}, (_, i) =>
    storyResultSetToObject(rows.item(i)),
  );
};

// Get All Story -> SQLite
export const getStoryAll = async (): Promise<IStory[]> => {
  const db = await getDBConnection();
  const res = await getStoryAllToDB(db);

  return resultArrToStoryArr(res);
};

// Get Story with pagination -> SQLite
export const getStoryPagination = async (
  page: number,
  option: {
    limit: number;
    filter: string;
    order: string;
    sort: string;
  },
): Promise<IStoryPagination> => {
  const db = await getDBConnection();

  return await getStoryPaginationToDB(db, page, option);
};

// Get Story by id (one document)
export const getOneStoryById = async (id: string): Promise<IStory> => {
  const db = await getDBConnection();

  return await getOneStoryToDB(db, id);
};

// Add story by region id -> SQLite
export const addStoryByRegionId = async (data: IStory): Promise<void> => {
  // Save SQLite
  const db = await getDBConnection();

  await saveStoryToDB(db, data);
};

// Delete story by Region id -> SQLite
export const deleteStoryById = async (id: string): Promise<void> => {
  // Delete SQLite
  const db = await getDBConnection();
  await deleteOneStoryToDB(db, id);
};

// Get region id list by story exist
export const getStoryRegionList = async (): Promise<string[]> => {
  // Get SQLite
  const db = await getDBConnection();

  const result = await getStoryRegionIdToDB(db);
  const rows = result[0].rows;

  const toMainRegionId = (id: string) => {
    const parts = id.split('-');
    return parts.length >= 3 ? `${parts[0]}-${parts[1]}` : id;
  };

  const mainIds = Array.from({length: rows.length}, (_, i) =>
    toMainRegionId(rows.item(i)['regionId'] as string),
  );

  return [...new Set(mainIds)];
};

// Get Dashboard of Story
export const getDashboardStory = async (): Promise<IDashboardStory> => {
  // Get SQLite
  const db = await getDBConnection();
  // 전체 개수
  const count = await countStoryToDB(db);

  // 최고 평균 점수 지역
  const pointRegion = await highestPointStoryRegionToDB(db).then(([res]) =>
    Array.from({length: res.rows.length}, (_, i) => {
      const item = res.rows.item(i);
      return {
        title: getRegionTitleById(item.regionId),
        avg: item.avg,
      };
    }),
  );

  // 최다 작성 지역
  const countRegion = await maxStoryNumToDB(db).then(([res]) =>
    Array.from({length: res.rows.length}, (_, i) => {
      const item = res.rows.item(i);
      return {
        title: getRegionTitleById(item.regionId),
        count: item.count,
      };
    }),
  );

  return {count, pointRegion, countRegion};
};
