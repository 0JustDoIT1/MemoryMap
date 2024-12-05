import {openDatabase, SQLiteDatabase} from 'react-native-sqlite-storage';
import {TableName} from './table';

// Connect SQLite Database
export const getDBConnection = async () => {
  return openDatabase({name: 'MemoryMap.db', location: 'default'});
};

// Create Table
export const createTable = async (db: SQLiteDatabase, tableName: string) => {
  let tableColumn!: string;

  if (tableName === TableName.auth) {
    tableColumn =
      '(uid TEXT UNIQUE PRIMARY KEY, email TEXT UNIQUE, displayName TEXT, subscribe INTEGER, createdAt TEXT)';
  }

  if (tableName === TableName.map) {
    tableColumn =
      '(id TEXT UNIQUE PRIMARY KEY, uid TEXT, title TEXT, main TEXT, type TEXT, background TEXT, story INTEGER, imageUrl TEXT, imageStyle TEXT)';
  }

  if (tableName === TableName.story) {
    tableColumn =
      '(id TEXT UNIQUE PRIMARY KEY, uid TEXT, regionId TEXT, startDate TEXT, endDate TEXT, title TEXT, contents TEXT, point INT, createdAt TEXT, updatedAt TEXT)';
  }

  const query = `CREATE TABLE IF NOT EXISTS ${tableName}${tableColumn};`;

  return await db.executeSql(query, []);
};

//// Select
export const countData = async (
  db: SQLiteDatabase,
  tableName: string,
  uid: string,
) => {
  const query = `SELECT COUNT(*) as count FROM ${tableName} where uid = '${uid}'`;

  return await db.executeSql(query, []);
};
