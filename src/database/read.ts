//// Read

import {ResultSet, SQLiteDatabase} from 'react-native-sqlite-storage';
import {APP_TABLE_NAME} from 'src/constants/db';
import {ICountedRegionByType} from 'src/types/koreaMap';
import {IPagination, IStory, IStoryPagination} from 'src/types/story';
import {resultArrToStoryArr} from 'src/utils/data/sqlite/story.db';

// Read Auth to auth table
export const getAuthToDB = async (db: SQLiteDatabase): Promise<[ResultSet]> => {
  try {
    const query = `SELECT * FROM ${APP_TABLE_NAME.auth}`;
    return await db.executeSql(query, []);
  } catch (error) {
    console.error('Auth DB 조회 실패:', error);
    throw error;
  }
};

// Read KoreaMapData to map table
export const getKoreaMapDataToDB = async (
  db: SQLiteDatabase,
): Promise<[ResultSet]> => {
  try {
    const query = `SELECT * FROM ${APP_TABLE_NAME.map}`;

    return await db.executeSql(query, []);
  } catch (error) {
    console.error('Map DB 조회 실패:', error);
    throw error;
  }
};

// Read Colored(color & photo) KoreaMapData to map table
export const getKoreaMapDataByColorToDB = async (
  db: SQLiteDatabase,
): Promise<[ResultSet]> => {
  try {
    const query = `SELECT * FROM ${APP_TABLE_NAME.map} WHERE type IN ('color', 'photo')`;

    return await db.executeSql(query, []);
  } catch (error) {
    console.error('Colored Map DB 조회 실패:', error);
    throw error;
  }
};

// Read Number of KoreaMapData by type
export const countKoreaMapDataByTypeToDB = async (
  db: SQLiteDatabase,
): Promise<ICountedRegionByType> => {
  try {
    const query = `
      SELECT
        SUM(CASE WHEN type = 'color' THEN 1 ELSE 0 END) AS color,
        SUM(CASE WHEN type = 'photo' THEN 1 ELSE 0 END) AS photo,
        COUNT(*) AS total
      FROM ${APP_TABLE_NAME.map}
    `;
    const [result] = await db.executeSql(query);
    const row = result.rows.item(0);

    return {
      color: row.color,
      photo: row.photo,
      init: row.total - row.color - row.photo,
    };
  } catch (error) {
    console.error('Map Count By Type 조회 실패:', error);
    throw error;
  }
};

// Read number of most colored regions
export const mostColorMainRegionToDB = async (
  db: SQLiteDatabase,
): Promise<[ResultSet]> => {
  try {
    const query = `SELECT main, COUNT(*) as count FROM ${APP_TABLE_NAME.map} WHERE type IN ('color', 'photo') GROUP BY main ORDER BY count DESC`;

    return await db.executeSql(query, []);
  } catch (error) {
    console.error('Region Count 조회 실패:', error);
    throw error;
  }
};

// Get all Story
export const getStoryAllToDB = async (
  db: SQLiteDatabase,
): Promise<[ResultSet]> => {
  try {
    const query = `SELECT * FROM ${APP_TABLE_NAME.story}`;

    return await db.executeSql(query, []);
  } catch (error) {
    console.error('Story DB All 조회 실패:', error);
    throw error;
  }
};

// Get Story with pagination (+ filter, order by)
export const getStoryPaginationToDB = async (
  db: SQLiteDatabase,
  page: number,
  option: IPagination,
): Promise<IStoryPagination> => {
  try {
    const {
      filter = '',
      limit = 10,
      order = 'createdAt',
      sort = 'DESC',
    } = option;

    const params: any[] = [];
    let whereClause = '';
    let orderClause = '';
    let paginationClause = '';

    // ✅ where 절 구성
    if (filter) {
      whereClause = `WHERE regionId LIKE ?`;
      params.push(`${filter}%`);
    }

    // ✅ order by는 화이트리스트 필터링
    const allowedOrderFields = ['createdAt', 'updatedAt', 'point', 'title']; // 허용 필드
    const allowedSortValues = ['ASC', 'DESC'];

    if (
      allowedOrderFields.includes(order) &&
      allowedSortValues.includes(sort)
    ) {
      orderClause = `ORDER BY ${order} ${sort}`;
    }

    // ✅ LIMIT / OFFSET
    const offset = (page - 1) * limit;
    paginationClause = `LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const query = `SELECT * FROM ${APP_TABLE_NAME.story} ${whereClause} ${orderClause} ${paginationClause}`;
    const result = await db.executeSql(query, params);
    const storyArray = resultArrToStoryArr(result);

    // if (option) {
    //   if (option.filter && option.filter !== '')
    //     query += ` and regionId LIKE '${option.filter}%'`;
    //   if (
    //     option.order &&
    //     option.order !== '' &&
    //     option.sort &&
    //     option.sort !== ''
    //   )
    //     query += ` order by ${option.order} ${option.sort}`;
    //   if (page)
    //     query += ` LIMIT ${option.limit} OFFSET ${(page - 1) * option.limit}`;
    // }

    const countQuery = `SELECT COUNT(*) as count FROM ${APP_TABLE_NAME.story} ${whereClause}`;
    const countResult = await db.executeSql(
      countQuery,
      filter ? [`${filter}%`] : [],
    );
    const totalCount = countResult[0].rows.item(0).count;
    const totalPage = Math.ceil(totalCount / option.limit);

    return {
      doc: storyArray,
      currentCount: result[0].rows.length,
      totalCount: totalCount,
      currentPage: page,
      totalPage: totalPage,
    };
  } catch (error) {
    console.error('Story DB Pagination 조회 실패:', error);
    throw error;
  }
};

// Read One Story to story table
export const getOneStoryToDB = async (
  db: SQLiteDatabase,
  id: string,
): Promise<IStory> => {
  try {
    const query = `SELECT * FROM ${APP_TABLE_NAME.story} WHERE id = ?`;
    const [result] = await db.executeSql(query, [id]);

    return result.rows.item(0);
  } catch (error) {
    console.error('Story DB One 조회 실패:', error);
    throw error;
  }
};

// Read region id to story table
export const getStoryRegionIdToDB = async (
  db: SQLiteDatabase,
): Promise<[ResultSet]> => {
  try {
    const query = `SELECT regionId FROM ${APP_TABLE_NAME.story} GROUP BY regionId`;

    return await db.executeSql(query, []);
  } catch (error) {
    console.error('Story DB by ID 조회 실패:', error);
    throw error;
  }
};

// Read Number of Story
export const countStoryToDB = async (db: SQLiteDatabase): Promise<number> => {
  try {
    const query = `SELECT COUNT(*) as count FROM ${APP_TABLE_NAME.story}`;

    const [result] = await db.executeSql(query, []);
    return result.rows.item(0).count;
  } catch (error) {
    console.error('Story DB Count 조회 실패:', error);
    throw error;
  }
};

// Read region with the highest average story point (동점 허용)
export const maxStoryNumToDB = async (
  db: SQLiteDatabase,
): Promise<[ResultSet]> => {
  try {
    const query = `
      SELECT regionId, COUNT(*) as count
      FROM ${APP_TABLE_NAME.story}
      GROUP BY regionId
      HAVING count = (
        SELECT MAX(region_count)
        FROM (
          SELECT COUNT(*) as region_count
          FROM ${APP_TABLE_NAME.story}
          GROUP BY regionId
        )
      )
    `;
    return await db.executeSql(query);
  } catch (error) {
    console.error('Story DB MaxNum 조회 실패:', error);
    throw error;
  }
};

// Read region with the highest average story point (동점 허용)
export const highestPointStoryRegionToDB = async (
  db: SQLiteDatabase,
): Promise<[ResultSet]> => {
  try {
    const query = `
      SELECT regionId, AVG(point) as avg
      FROM ${APP_TABLE_NAME.story}
      GROUP BY regionId
      HAVING avg = (
        SELECT MAX(region_avg)
        FROM (
          SELECT AVG(point) as region_avg
          FROM ${APP_TABLE_NAME.story}
          GROUP BY regionId
        )
      )
    `;
    return await db.executeSql(query);
  } catch (error) {
    console.error('Story DB Highest Point 조회 실패:', error);
    throw error;
  }
};
