//// Delete
import {ResultSet, SQLiteDatabase} from 'react-native-sqlite-storage';
import {APP_TABLE_NAME} from 'src/constants/db';

// Delete Auth to auth table
export const deleteAuthToDB = async (
  db: SQLiteDatabase,
): Promise<[ResultSet]> => {
  try {
    const query = `DELETE from ${APP_TABLE_NAME.auth}`;

    return await db.executeSql(query);
  } catch (error) {
    console.error('Auth DB 삭제 실패:', error);
    throw error;
  }
};

// Delete KoreaMapData to map table
export const deleteKoreaMapDataToDB = async (
  db: SQLiteDatabase,
): Promise<[ResultSet]> => {
  try {
    const query = `DELETE from ${APP_TABLE_NAME.map}`;

    return await db.executeSql(query);
  } catch (error) {
    console.error('Map DB 삭제 실패:', error);
    throw error;
  }
};

// Delete All Story
export const deleteAllStoryToDB = async (
  db: SQLiteDatabase,
): Promise<[ResultSet]> => {
  try {
    const query = `DELETE FROM ${APP_TABLE_NAME.story}`;

    return await db.executeSql(query);
  } catch (error) {
    console.error('Story DB All 삭제 실패:', error);
    throw error;
  }
};

// Delete One Story
export const deleteOneStoryToDB = async (
  db: SQLiteDatabase,
  id: string,
): Promise<[ResultSet]> => {
  try {
    const query = `DELETE FROM ${APP_TABLE_NAME.story} where id = ?`;

    return await db.executeSql(query, [id]);
  } catch (error) {
    console.error('Story DB One 삭제 실패:', error);
    throw error;
  }
};
