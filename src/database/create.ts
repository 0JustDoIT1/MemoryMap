//// Create

import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {KoreaRegionData} from 'src/types/koreaMap';
import {Story} from 'src/types/story';

// Create KoreaMapData to map table
export const saveKoreaMapDataToDB = async (
  db: SQLiteDatabase,
  data: KoreaRegionData,
) => {
  const query = `INSERT OR REPLACE INTO map(id, title, main, type, background, story, imageUrl, imageStyle) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;

  return await db.executeSql(query, [
    data.id,
    data.title,
    data.main,
    data.type,
    data.background,
    data.story,
    data.imageUrl,
    JSON.stringify(data.imageStyle),
  ]);
};

// Create Story to story table
export const saveStoryToDB = async (db: SQLiteDatabase, data: Story) => {
  const query = `INSERT OR REPLACE INTO story(id, regionId, startDate, endDate, title, contents, point, createdAt, updatedAt) VALUES(?,?,?,?,?,?,?,?,?)`;

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
};

// Update KoreaMapData field "story" counting to map table
export const updateMapStoryCountingToDB = async (
  db: SQLiteDatabase,
  id: string,
  count: number,
) => {
  const query = `UPDATE map SET story = story + ${count} WHERE id = '${id}'`;

  return await db.executeSql(query, []);
};
