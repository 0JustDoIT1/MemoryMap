//// Delete
import {SQLiteDatabase} from 'react-native-sqlite-storage';

// Delete Auth to auth table
export const deleteAuthToDB = async (db: SQLiteDatabase, uid: string) => {
  const query = `DELETE from auth where uid = '${uid}'`;
  return await db.executeSql(query);
};

// Delete KoreaMapData to map table
export const deleteKoreaMapDataToDB = async (
  db: SQLiteDatabase,
  uid: string,
) => {
  const query = `DELETE from map where uid = '${uid}'`;
  return await db.executeSql(query);
};

// Delete All Story
export const deleteAllStoryToDB = async (db: SQLiteDatabase, uid: string) => {
  const query = `DELETE FROM story where uid = '${uid}'`;
  return await db.executeSql(query);
};

// Delete One Story
export const deleteOneStoryToDB = async (db: SQLiteDatabase, id: string) => {
  const query = `DELETE FROM story where id = '${id}'`;
  return await db.executeSql(query);
};
