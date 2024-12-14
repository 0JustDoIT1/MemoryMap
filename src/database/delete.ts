//// Delete
import {SQLiteDatabase} from 'react-native-sqlite-storage';

// Delete Auth to auth table
export const deleteAuthToDB = async (db: SQLiteDatabase) => {
  const query = `DELETE from auth`;
  return await db.executeSql(query);
};

// Delete KoreaMapData to map table
export const deleteKoreaMapDataToDB = async (db: SQLiteDatabase) => {
  const query = `DELETE from map`;
  return await db.executeSql(query);
};

// Delete All Story
export const deleteAllStoryToDB = async (db: SQLiteDatabase) => {
  const query = `DELETE FROM story`;
  return await db.executeSql(query);
};

// Delete One Story
export const deleteOneStoryToDB = async (db: SQLiteDatabase, id: string) => {
  const query = `DELETE FROM story where id = '${id}'`;
  return await db.executeSql(query);
};
