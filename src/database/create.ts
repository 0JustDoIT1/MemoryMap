//// Create

import {ResultSet, SQLiteDatabase} from 'react-native-sqlite-storage';
import {APP_TABLE_NAME} from 'src/constants/db';
import {IKoreaRegionData} from 'src/types/koreaMap';
import {IStory} from 'src/types/story';

// Create KoreaMapData to map table
export const saveKoreaMapDataToDB = async (
  db: SQLiteDatabase,
  data: IKoreaRegionData,
): Promise<[ResultSet]> => {
  try {
    const query = `INSERT OR REPLACE INTO ${APP_TABLE_NAME.map}(id, title, main, type, background, story, imageUrl, zoomImageUrl) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;

    return await db.executeSql(query, [
      data.id,
      data.title,
      data.main,
      data.type,
      data.background,
      data.story,
      data.imageUrl,
      data.zoomImageUrl,
    ]);
  } catch (error) {
    console.error('Map DB 저장 실패:', error);
    throw error;
  }
};

// Create Story to story table
export const saveStoryToDB = async (
  db: SQLiteDatabase,
  data: IStory,
): Promise<[ResultSet]> => {
  try {
    const query = `INSERT OR REPLACE INTO ${APP_TABLE_NAME.story}(id, regionId, startDate, endDate, title, contents, point, createdAt, updatedAt) VALUES(?,?,?,?,?,?,?,?,?)`;

    return await db.executeSql(query, [
      data.id,
      data.regionId,
      data.startDate,
      data.endDate,
      data.title,
      data.contents,
      data.point,
      data.createdAt,
      data.updatedAt,
    ]);
  } catch (error) {
    console.error('Story DB 저장 실패:', error);
    throw error;
  }
};

// Update KoreaMapData field "story" counting to map table
export const updateMapStoryCountingToDB = async (
  db: SQLiteDatabase,
  id: string,
  count: number,
): Promise<[ResultSet]> => {
  try {
    const query = `UPDATE ${APP_TABLE_NAME.map} SET ${APP_TABLE_NAME.story} = ${APP_TABLE_NAME.story} + ? WHERE id = ?`;

    return await db.executeSql(query, [count, id]);
  } catch (error) {
    console.error('Story Counting 실패:', error);
    throw error;
  }
};
