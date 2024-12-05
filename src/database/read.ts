//// Read

import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {resultArrToStoryArr} from 'src/utils/story.db';

// Read Auth to auth table
export const getAuthToDB = async (db: SQLiteDatabase, uid: string) => {
  try {
    const query = `SELECT * FROM auth WHERE uid = '${uid}'`;
    return await db.executeSql(query, []);
  } catch (error) {
    throw new Error('SQLite 조회 에러');
  }
};

// Read KoreaMapData to map table
export const getKoreaMapDataToDB = async (db: SQLiteDatabase, uid: string) => {
  try {
    const query = `SELECT * FROM map WHERE uid = '${uid}'`;

    return await db.executeSql(query, []);
  } catch (error) {
    throw new Error('SQLite 조회 에러');
  }
};

// Read Colored(color & photo) KoreaMapData to map table
export const getKoreaMapDataByColorToDB = async (
  db: SQLiteDatabase,
  uid: string,
) => {
  try {
    const query = `SELECT * FROM map WHERE uid =  '${uid}' AND type IN ('color', 'photo')`;

    return await db.executeSql(query, []);
  } catch (error) {
    throw new Error('SQLite 조회 에러');
  }
};

// Read Number of KoreaMapData by type
export const countKoreaMapDataByTypeToDB = async (
  db: SQLiteDatabase,
  uid: string,
) => {
  try {
    const colorQuery = `SELECT COUNT(*) as count FROM map WHERE uid = '${uid}' AND type = 'color'`;
    const photoQuery = `SELECT COUNT(*) as count FROM map WHERE uid = '${uid}' AND type = 'photo'`;

    const colorNum = await db
      .executeSql(colorQuery, [])
      .then(res => res[0].rows.item(0)['count']);
    const photoNum = await db
      .executeSql(photoQuery, [])
      .then(res => res[0].rows.item(0)['count']);

    return {color: colorNum, photo: photoNum, init: 163 - colorNum - photoNum};
  } catch (error) {
    throw new Error('SQLite 조회 에러');
  }
};

// Read number of most colored regions
export const mostColorMainRegionToDB = async (
  db: SQLiteDatabase,
  uid: string,
) => {
  try {
    const query = `SELECT main, COUNT(*) as count FROM map WHERE uid = '${uid}' AND type IN ('color', 'photo') GROUP BY main ORDER BY count DESC`;

    return await db.executeSql(query, []);
  } catch (error) {
    throw new Error('SQLite 조회 에러');
  }
};

// Get Story with pagination (+ filter, order by)
export const getStoryPaginationToDB = async (
  db: SQLiteDatabase,
  uid: string,
  page: number,
  option: {
    filter?: string;
    order?: string;
    sort?: string;
    limit: number;
  },
) => {
  try {
    let query = `SELECT * FROM story WHERE uid = '${uid}'`;

    if (option) {
      if (option.filter && option.filter !== '')
        query += ` and regionId = '${option.filter}'`;
      if (
        option.order &&
        option.order !== '' &&
        option.sort &&
        option.sort !== ''
      )
        query += ` order by ${option.order} ${option.sort}`;
      if (page)
        query += ` LIMIT ${option.limit} OFFSET ${(page - 1) * option.limit}`;
    }

    const countQuery = `SELECT COUNT(*) as count FROM story WHERE uid = '${uid}'`;

    const result = await db.executeSql(query, []);
    const storyArray = resultArrToStoryArr(result);

    const countResult = await db.executeSql(countQuery);
    const totalCount = countResult[0].rows.item(0)['count'];
    const totalPage = Math.ceil(totalCount / option.limit);

    return {
      doc: storyArray,
      currentCount: result[0].rows.length,
      totalCount: totalCount,
      currentPage: page,
      totalPage: totalPage,
    };
  } catch (error) {
    throw new Error('SQLite 조회 에러');
  }
};

// Read One Story to story table
export const getOneStoryToDB = async (db: SQLiteDatabase, id: string) => {
  try {
    const query = `SELECT * FROM story WHERE id = '${id}'`;
    return await db.executeSql(query, []);
  } catch (error) {
    throw new Error('SQLite 조회 에러');
  }
};

// Read region id to story table
export const getStoryRegionIdToDB = async (db: SQLiteDatabase, uid: string) => {
  try {
    const query = `SELECT regionId FROM story WHERE uid = '${uid}' GROUP BY regionId`;

    return await db.executeSql(query, []);
  } catch (error) {
    throw new Error('SQLite 조회 에러');
  }
};

// Read Number of Story
export const countStoryToDB = async (db: SQLiteDatabase, uid: string) => {
  try {
    const query = `SELECT COUNT(*) as count FROM story WHERE uid = '${uid}'`;

    return await db.executeSql(query, []);
  } catch (error) {
    throw new Error('SQLite 조회 에러');
  }
};

// Read region with the highest average story point
export const maxStoryNumToDB = async (db: SQLiteDatabase, uid: string) => {
  try {
    const query = `SELECT regionId, count(*) as count FROM story WHERE uid = '${uid}' GROUP BY regionId`;

    return await db.executeSql(query, []);
  } catch (error) {
    throw new Error('SQLite 조회 에러');
  }
};

// Read region with the highest average story point
export const highestPointStoryRegionToDB = async (
  db: SQLiteDatabase,
  uid: string,
) => {
  try {
    const query = `SELECT regionId, avg(point) as avg FROM story WHERE uid = '${uid}' GROUP BY regionId`;

    return await db.executeSql(query, []);
  } catch (error) {
    throw new Error('SQLite 조회 에러');
  }
};
