import {
  openDatabase,
  ResultSet,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {appTableName} from 'src/constants/app';

// Connect SQLite Database
export const getDBConnection = async () => {
  return openDatabase({
    name: 'MemoryMap.db',
    location: 'default',
  });
};

// Create Table
export const createTable = async (
  db: SQLiteDatabase,
  tableName: string,
): Promise<ResultSet[]> => {
  let tableColumn: string;

  switch (tableName) {
    case appTableName.map:
      tableColumn =
        '(id TEXT UNIQUE PRIMARY KEY, title TEXT, main TEXT, type TEXT, background TEXT, story INTEGER, imageUrl TEXT, zoomImageUrl TEXT)';
      break;
    case appTableName.story:
      tableColumn =
        '(id TEXT UNIQUE PRIMARY KEY, regionId TEXT, startDate TEXT, endDate TEXT, title TEXT, contents TEXT, point INT, createdAt TEXT, updatedAt TEXT)';
      break;

    default:
      throw new Error(`Unknown table name: ${tableName}`);
  }
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}${tableColumn};`;

  return await db.executeSql(query, []);
};

//// Select
export const countData = async (
  db: SQLiteDatabase,
  tableName: string,
): Promise<ResultSet[]> => {
  const query = `SELECT COUNT(*) as count FROM ${tableName}`;

  return await db.executeSql(query, []);
};
