import {KoreaMapDataObject, KoreaRegionData} from 'src/types/koreaMap';
import {getDBConnection} from 'src/database/sqlite';
import {koreaMapDataInit} from 'src/constants/koreaMapData';
import {
  deleteAllStorage,
  deleteStorage,
  downloadStorage,
  uploadStorage,
} from 'src/firebase/storage';
import {updateRealtime} from 'src/firebase/realtime';
import {
  saveKoreaMapDataToDB,
  updateMapStoryCountingToDB,
} from 'src/database/create';
import {
  countKoreaMapDataByTypeToDB,
  getKoreaMapDataByColorToDB,
  getKoreaMapDataToDB,
  mostColorMainRegionToDB,
} from 'src/database/read';
import {ResultSet} from 'react-native-sqlite-storage';
import {getColorRegionList, koreaMapDataToObject} from './koreaMap.util';

// res type to KoreaMapDataObject
const _resToObject = async (res: [ResultSet]) => {
  const result: KoreaMapDataObject = {};
  for (let i = 0; i < res[0].rows.length; i++) {
    const region = res[0].rows.item(i);
    result[region.id] = region;
    if (region.imageStyle)
      result[region.id].imageStyle = JSON.parse(region.imageStyle);
    if (region.type === 'photo') {
      const url = await downloadStorage(region.uid, region.id);
      result[region.id].imageUrl = url;
    }
  }

  return result;
};

// Setting value uid to KoreaMapDataInit
export const setUidToKoreaMapDataInit = (uid: string) => {
  const result: KoreaRegionData[] = [];
  koreaMapDataInit.forEach(item => {
    result.push({...item, uid: uid});
  });

  return result;
};

// Get KoreaMapData -> SQLite
export const getAllKoreaMapDataByUid = async (uid: string) => {
  const db = await getDBConnection();
  const result = await getKoreaMapDataToDB(db, uid).then(
    async res => await _resToObject(res),
  );
  return result;
};

// Return data when color is updated
const _updateDataByTypeColor = async (data: KoreaRegionData, color: string) => {
  // Setting Data
  const updateKoreaRegionData: KoreaRegionData = {
    ...data,
    background: color,
    type: 'color',
  };
  delete updateKoreaRegionData.imageUrl;
  delete updateKoreaRegionData.imageStyle;

  return updateKoreaRegionData;
};

// Update background on map (color) -> SQLite & Firebase
export const updateMapColorById = async (
  uid: string,
  data: KoreaRegionData,
  color: string,
) => {
  // Setting Data
  const updateKoreaMapData = await _updateDataByTypeColor(data, color);

  // type is photo, remove the existing photo -> Firebase
  if (data.type === 'photo') {
    await deleteStorage(uid, data.id);
  }

  // Save SQLite
  const db = await getDBConnection();
  await saveKoreaMapDataToDB(db, updateKoreaMapData);

  // Get SQLite
  const koreaMapData = await getAllKoreaMapDataByUid(uid);

  // Save Firebase
  await updateRealtime(uid, koreaMapData, 'map');
};

// Return data when image is updated
const _updateDataByTypePhoto = async (
  data: KoreaRegionData,
  imageStyle: {width: number; height: number},
) => {
  // Setting Data
  const updateKoreaRegionData: KoreaRegionData = {
    ...data,
    background: `url(#${data.id})`,
    type: 'photo',
    imageStyle: imageStyle,
  };

  return updateKoreaRegionData;
};

// Update background on map (image) -> SQLite & Firebase
export const updateMapPhotoById = async (
  uid: string,
  data: KoreaRegionData,
  uri: string,
  imageStyle: {width: number; height: number},
) => {
  // Upload Image -> Save Firebase Storage
  await uploadStorage(uid, data.id, uri);

  // Setting data
  const updateKoreaRegionData = await _updateDataByTypePhoto(data, imageStyle);
  // Save SQLite
  const db = await getDBConnection();
  await saveKoreaMapDataToDB(db, updateKoreaRegionData);
  // Get SQLite
  const koreaMapData = await getAllKoreaMapDataByUid(uid);
  // Save Firebase
  await updateRealtime(uid, koreaMapData, 'map');
};

// Return data when background is deleted
const _deleteDataById = (data: KoreaRegionData) => {
  // Setting Data
  const updateKoreaRegionData: KoreaRegionData = {
    ...data,
    background: '#ffffff',
    type: 'init',
    story: 0,
  };

  delete updateKoreaRegionData.imageUrl;
  delete updateKoreaRegionData.imageStyle;

  return updateKoreaRegionData;
};

// Delete background on map (color or image) -> SQLite & Firebase
export const deleteMapDataById = async (uid: string, data: KoreaRegionData) => {
  // Setting Data
  const updateKoreaRegionData = _deleteDataById(data);

  // type is photo, remove the existing photo -> Firebase
  if (data.type === 'photo') {
    await deleteStorage(uid, data.id);
  }

  // Save SQLite
  const db = await getDBConnection();
  await saveKoreaMapDataToDB(db, updateKoreaRegionData);

  // Get SQLite
  const koreaMapData = await getAllKoreaMapDataByUid(uid);

  // Save Firebase
  await updateRealtime(uid, koreaMapData, 'map');
};

// Reset KoreaMapData -> SQLite & Firebase
export const resetMapData = async (uid: string) => {
  // Setting Data
  const updateKoreaMapData = setUidToKoreaMapDataInit(uid);

  const koreaMapDataObject = koreaMapDataToObject(updateKoreaMapData);

  // Save SQLite
  const db = await getDBConnection();
  updateKoreaMapData.forEach(
    async item => await saveKoreaMapDataToDB(db, item),
  );
  // Save Firebase
  await deleteAllStorage(uid);
  await updateRealtime(uid, koreaMapDataObject, 'map');
};

// Get Colored(color & photo) KoreaMapData
export const getKoreaMapDataByColor = async (uid: string) => {
  // Get SQLite
  const db = await getDBConnection();
  const result = await getKoreaMapDataByColorToDB(db, uid).then(res =>
    _resToObject(res),
  );

  const regionList = getColorRegionList(result);
  const regionMainList = Object.keys(regionList).sort();

  return {all: regionList, main: regionMainList};
};

// Update koreaMapData["story"] when story update(add or delete)
export const updateKoreaMapDataStory = async (
  uid: string,
  id: string,
  count: number,
) => {
  // Save SQLite
  const db = await getDBConnection();
  await updateMapStoryCountingToDB(db, uid, id, count);

  // Get SQLite
  const koreaMapData = await getAllKoreaMapDataByUid(uid);

  // Save Firebase
  await updateRealtime(uid, koreaMapData, 'map');
};

// Get dashboadrd info of KoreaMapData by type
export const getDashboardKoreaMapData = async (uid: string) => {
  // Get SQLite
  const db = await getDBConnection();
  // Color Count (color & photo & init)
  const count = await countKoreaMapDataByTypeToDB(db, uid);
  // Most color region (main & count)
  const mostRegion: {main: string; count: number}[] = [];
  await mostColorMainRegionToDB(db, uid).then(res => {
    for (let i = 0; i < res[0].rows.length; i++) {
      const item = res[0].rows.item(i);
      if (i !== 0 && mostRegion[0].count > item['count']) return;
      mostRegion.push(item);
    }
  });

  return {...count, mostRegion: mostRegion};
};
