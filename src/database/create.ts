//// Create

import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {User} from 'src/types/account';
import {KoreaRegionData} from 'src/types/koreaMap';
import {Story} from 'src/types/story';

// Create Auth to auth table
export const saveAuthToDB = async (db: SQLiteDatabase, data: User) => {
  const subscribe = data.subscribe ? 1 : 0;
  const query = `INSERT OR REPLACE INTO auth(uid, email, displayName, subscribe, createdAt) VALUES(?, ?, ?, ?, ?)`;

  return await db.executeSql(query, [
    data.uid,
    data.email,
    data.displayName,
    subscribe,
    data.createdAt,
  ]);
};

// Create KoreaMapData to map table
export const saveKoreaMapDataToDB = async (
  db: SQLiteDatabase,
  data: KoreaRegionData,
) => {
  const query = `INSERT OR REPLACE INTO map(id, uid, title, main, type, background, story, imageUrl, imageStyle) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  return await db.executeSql(query, [
    data.id,
    data.uid,
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
  const query = `INSERT OR REPLACE INTO story(id, uid, regionId, startDate, endDate, title, contents, point, createdAt, updatedAt) VALUES(?,?,?,?,?,?,?,?,?,?)`;

  return await db.executeSql(query, [
    data.id,
    data.uid,
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
  uid: string,
  id: string,
  count: number,
) => {
  const query = `UPDATE map SET story = story + ${count} WHERE uid = '${uid}' AND id = '${id}'`;

  return await db.executeSql(query, []);
};
