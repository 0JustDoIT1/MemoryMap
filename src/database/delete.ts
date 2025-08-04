//// Delete
import {ResultSet, SQLiteDatabase} from 'react-native-sqlite-storage';
import {appTableName} from 'src/constants/app';

// Delete Auth to auth table
export const deleteAuthToDB = async (
  db: SQLiteDatabase,
): Promise<[ResultSet]> => {
  try {
    const query = `DELETE from ${appTableName.auth}`;

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
    const query = `DELETE from ${appTableName.map}`;

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
    const query = `DELETE FROM ${appTableName.story}`;

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
    const query = `DELETE FROM ${appTableName.story} where id = ?`;

    return await db.executeSql(query, [id]);
  } catch (error) {
    console.error('Story DB One 삭제 실패:', error);
    throw error;
  }
};
