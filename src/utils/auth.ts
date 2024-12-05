import {User, FirebaseUser} from 'src/types/account';
import {readRealtime, setRealtime} from '../firebase/realtime';
import {getDocAll} from '../firebase/firestore';
import {getDBConnection, countData} from 'src/database/sqlite';
import {TableName} from 'src/database/table';
import {Story} from 'src/types/story';
import {
  saveAuthToDB,
  saveKoreaMapDataToDB,
  saveStoryToDB,
} from 'src/database/create';
import {getAuthToDB} from 'src/database/read';
import {KoreaMapDataObject} from 'src/types/koreaMap';
import {koreaMapDataToObject} from './koreaMap.util';
import {setUidToKoreaMapDataInit} from './koreaMap.db';
import {dateToFormatString} from './dateFormat';

// Save initial data when SignUp -> SQLite & Firebase
export const setInitialDataToDB = async (data: FirebaseUser) => {
  // Setting data
  const appUser: User = {
    ...data,
    createdAt: dateToFormatString(data.createdAt, 'YYYY-MM-DD HH:mm:ss'),
    subscribe: false,
  };

  const updateKoreaMapData = setUidToKoreaMapDataInit(data.uid);

  // Save SQLite
  const db = await getDBConnection();
  await saveAuthToDB(db, appUser);
  updateKoreaMapData.forEach(
    async item => await saveKoreaMapDataToDB(db, item),
  );

  // Save Firebase
  await setRealtime(data.uid, appUser, 'auth');
  const koreaMapDataObject = koreaMapDataToObject(updateKoreaMapData);
  await setRealtime(data.uid, koreaMapDataObject, 'map');

  return appUser;
};

// Get auth data when SignIn -> SQLite
export const getInitialDataToDB = async (data: FirebaseUser) => {
  // SQLite
  const db = await getDBConnection();
  const result = await getAuthToDB(db, data.uid).then(res =>
    res[0].rows.item(0),
  );

  return result;
};

// Sync Data SQLite & Firebase -> Firebase => SQLite
export const syncDataToSQLite = async (data: FirebaseUser) => {
  const db = await getDBConnection();
  // Check SQLite
  const authNum = await countData(db, TableName.auth, data.uid).then(
    res => res[0].rows.item(0)['count'],
  );
  const mapNum = await countData(db, TableName.map, data.uid).then(
    res => res[0].rows.item(0)['count'],
  );
  const storyNum = await countData(db, TableName.story, data.uid).then(
    res => res[0].rows.item(0)['count'],
  );

  if (authNum === 0 || mapNum === 0 || storyNum === 0) {
    console.log('SQLite 초기 없어유');
    // Firebase
    const user: User = await readRealtime(data.uid, 'auth').then(snapshot =>
      snapshot.val(),
    );
    const koreaMapData: KoreaMapDataObject = await readRealtime(
      data.uid,
      'map',
    ).then(snapshot => snapshot.val());
    const story = await getDocAll(data.uid).then(res => res);

    // Setting Data
    const koreaMapDataArray = Object.values(koreaMapData);

    // SQLite
    await saveAuthToDB(db, user);
    koreaMapDataArray.forEach(
      async item => await saveKoreaMapDataToDB(db, item),
    );
    if (story)
      story.forEach(
        async item => await saveStoryToDB(db, item.data() as Story),
      );
  }
};
