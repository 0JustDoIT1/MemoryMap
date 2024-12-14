import {KoreaMapDataObject, KoreaRegionData} from 'src/types/koreaMap';
import {getDBConnection} from 'src/database/sqlite';
import {koreaMapDataInit} from 'src/constants/koreaMapData';
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
import {getColorRegionList} from '../utils/koreaMap.util';
import {Dirs, FileSystem} from 'react-native-file-access';

// res type to KoreaMapDataObject
const _resToObject = async (res: [ResultSet]) => {
  const result: KoreaMapDataObject = {};
  for (let i = 0; i < res[0].rows.length; i++) {
    const region = res[0].rows.item(i);
    result[region.id] = region;
    if (region.imageStyle)
      result[region.id].imageStyle = JSON.parse(region.imageStyle);
  }

  return result;
};

// Get KoreaMapData -> SQLite
export const getAllKoreaMapData = async () => {
  const db = await getDBConnection();
  const result = await getKoreaMapDataToDB(db).then(
    async res => await _resToObject(res),
  );

  return result;
};

export const updateKoreaMapData = async (data: KoreaRegionData) => {
  const db = await getDBConnection();
  await saveKoreaMapDataToDB(db, data);
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
  data: KoreaRegionData,
  color: string,
) => {
  // Setting Data
  const updateKoreaMapData = await _updateDataByTypeColor(data, color);

  // type is photo, remove the existing photo -> Firebase
  if (data.type === 'photo') {
    await FileSystem.unlink(data.imageUrl!);
  }

  // Save SQLite
  const db = await getDBConnection();
  await saveKoreaMapDataToDB(db, updateKoreaMapData);
};

// Return data when image is updated
const _updateDataByTypePhoto = async (
  data: KoreaRegionData,
  imageUrl: string,
  imageStyle: {width: number; height: number},
) => {
  // Setting Data
  const updateKoreaRegionData: KoreaRegionData = {
    ...data,
    background: `url(#${data.id})`,
    type: 'photo',
    imageUrl: imageUrl,
    imageStyle: imageStyle,
  };

  return updateKoreaRegionData;
};

// Update background on map (image) -> SQLite & Firebase
export const updateMapPhotoById = async (
  data: KoreaRegionData,
  uri: string,
  imageStyle: {width: number; height: number},
) => {
  // Upload Image -> Save Firebase Storage
  const imagePath = `file://${Dirs.DocumentDir}/${data.id}_${Number(new Date())}.jpg`;

  if (data.type === 'photo') {
    const existImage = await FileSystem.exists(data.imageUrl!);
    if (existImage) await FileSystem.unlink(data.imageUrl!);
  }

  await FileSystem.cp(uri, imagePath);

  // Setting data
  const updateKoreaRegionData = await _updateDataByTypePhoto(
    data,
    imagePath,
    imageStyle,
  );

  // Save SQLite
  const db = await getDBConnection();
  await saveKoreaMapDataToDB(db, updateKoreaRegionData);
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
export const deleteMapDataById = async (data: KoreaRegionData) => {
  // Setting Data
  const updateKoreaRegionData = _deleteDataById(data);

  // type is photo, remove the existing photo -> Firebase
  if (data.type === 'photo') {
    await FileSystem.unlink(data.imageUrl!);
  }

  // Save SQLite
  const db = await getDBConnection();
  await saveKoreaMapDataToDB(db, updateKoreaRegionData);
};

// Reset KoreaMapData -> SQLite & Firebase
export const resetMapData = async () => {
  // Save SQLite
  const db = await getDBConnection();
  koreaMapDataInit.forEach(async item => await saveKoreaMapDataToDB(db, item));
  koreaMapDataInit.forEach(async item => {
    if (item.type === 'photo') {
      await FileSystem.unlink(item.imageUrl!);
    }
  });
};

// Get Colored(color & photo) KoreaMapData
export const getKoreaMapDataByColor = async () => {
  // Get SQLite
  const db = await getDBConnection();
  const result = await getKoreaMapDataByColorToDB(db).then(res =>
    _resToObject(res),
  );

  const regionList = getColorRegionList(result);
  const regionMainList = Object.keys(regionList).sort();

  return {all: regionList, main: regionMainList};
};

// Update koreaMapData["story"] when story update(add or delete)
export const updateKoreaMapDataStory = async (id: string, count: number) => {
  // Save SQLite
  const db = await getDBConnection();
  await updateMapStoryCountingToDB(db, id, count);
};

// Get dashboadrd info of KoreaMapData by type
export const getDashboardKoreaMapData = async () => {
  // Get SQLite
  const db = await getDBConnection();
  // Color Count (color & photo & init)
  const count = await countKoreaMapDataByTypeToDB(db);
  // Most color region (main & count)
  const mostRegion: {main: string; count: number}[] = [];
  await mostColorMainRegionToDB(db).then(res => {
    for (let i = 0; i < res[0].rows.length; i++) {
      const item = res[0].rows.item(i);
      if (i !== 0 && mostRegion[0].count > item['count']) return;
      mostRegion.push(item);
    }
  });

  return {...count, mostRegion: mostRegion};
};
