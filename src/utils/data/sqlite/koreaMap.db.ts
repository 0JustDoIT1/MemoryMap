import {IKoreaMapDataObject, IKoreaRegionData} from 'src/types/koreaMap';
import {getDBConnection} from 'src/database/sqlite';
import {MAP_DATA_INIT, MAP_SVG_DATA} from 'src/constants/koreaMapData';
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
import {getColorRegionList} from '../../screen/koreaMap.util';
import {Dirs, FileSystem} from 'react-native-file-access';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import {IDashboardMap} from 'src/types/dashboard';

// res type to KoreaMapDataObject
const _resToObject = async (res: [ResultSet]) => {
  const result: IKoreaMapDataObject = {};
  for (let i = 0; i < res[0].rows.length; i++) {
    const region = res[0].rows.item(i);
    result[region.id] = region;
    // if (region.imageUrl) {
    //   const base64string = await FileSystem.readFile(region.imageUrl, 'base64');
    //   result[region.id].imageUrl = 'data:image/jpg;base64,' + base64string;
    // }
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

export const updateKoreaMapData = async (data: IKoreaRegionData) => {
  const db = await getDBConnection();
  await saveKoreaMapDataToDB(db, data);
};

// Return data when color is updated
const _updateDataByTypeColor = async (
  data: IKoreaRegionData,
  color: string,
) => {
  // Setting Data
  const updateKoreaRegionData: IKoreaRegionData = {
    ...data,
    background: color,
    type: 'color',
  };
  delete updateKoreaRegionData.imageUrl;

  return updateKoreaRegionData;
};

// Update background on map (color) -> SQLite & Firebase
export const updateMapColorById = async (
  data: IKoreaRegionData,
  color: string,
) => {
  // Setting Data
  const updateKoreaMapData = await _updateDataByTypeColor(data, color);

  // Cache Clear
  const cacheDir = Dirs.CacheDir;
  await FileSystem.unlink(cacheDir);

  // type is photo, remove the existing photo -> Firebase
  if (data.type === 'photo') {
    await FileSystem.unlink(data.imageUrl!);
    await FileSystem.unlink(data.zoomImageUrl!);
  }

  // Save SQLite
  const db = await getDBConnection();
  await saveKoreaMapDataToDB(db, updateKoreaMapData);
};

// Return data when image is updated
const _updateDataByTypePhoto = async (
  data: IKoreaRegionData,
  imageUrl: string,
  zoomImageUrl: string,
) => {
  // Setting Data
  const updateKoreaRegionData: IKoreaRegionData = {
    ...data,
    background: `url(#${data.id})`,
    type: 'photo',
    imageUrl: imageUrl,
    zoomImageUrl: zoomImageUrl,
  };

  return updateKoreaRegionData;
};

// Update background on map (image) -> SQLite & Firebase
export const updateMapPhotoById = async (
  data: IKoreaRegionData,
  imageUri: string,
) => {
  // Upload Image -> Save Firebase Storage
  const cropImagePath = `file://${Dirs.DocumentDir}/${data.id}_${Number(new Date())}.jpg`;
  const zoomImagePath = `file://${Dirs.DocumentDir}/${data.id}_${Number(new Date())}_zoom.jpg`;

  // Cache Clear
  const cacheDir = Dirs.CacheDir;
  await FileSystem.unlink(cacheDir);

  // Response Image = ZoomImage
  // Crop Image for map view (with Image Resizer)
  const cropWidth = MAP_SVG_DATA[data.id].mapSvgStyle.width;
  const cropHeight = MAP_SVG_DATA[data.id].mapSvgStyle.height;
  const cropImage = await ImageResizer.createResizedImage(
    imageUri,
    cropWidth,
    cropHeight,
    'PNG',
    1,
  );

  if (data.type === 'photo') {
    const existCropImage = await FileSystem.exists(data.imageUrl!);
    if (existCropImage) await FileSystem.unlink(data.imageUrl!);

    const existZoomImage = await FileSystem.exists(data.zoomImageUrl!);
    if (existZoomImage) await FileSystem.unlink(data.zoomImageUrl!);
  }

  await FileSystem.cp(imageUri, zoomImagePath);
  await FileSystem.cp(cropImage.uri, cropImagePath);

  // Setting data
  const updateKoreaRegionData = await _updateDataByTypePhoto(
    data,
    cropImagePath,
    zoomImagePath,
  );

  // Save SQLite
  const db = await getDBConnection();
  await saveKoreaMapDataToDB(db, updateKoreaRegionData);
};

// Return data when background is deleted
const _deleteDataById = (data: IKoreaRegionData) => {
  // Setting Data
  const updateKoreaRegionData: IKoreaRegionData = {
    ...data,
    background: '#ffffff',
    type: 'init',
    story: 0,
  };

  delete updateKoreaRegionData.imageUrl;

  return updateKoreaRegionData;
};

// Delete background on map (color or image) -> SQLite & Firebase
export const deleteMapDataById = async (data: IKoreaRegionData) => {
  // Setting Data
  const updateKoreaRegionData = _deleteDataById(data);

  // type is photo, remove the existing photo -> Firebase
  if (data.type === 'photo') {
    await FileSystem.unlink(data.imageUrl!);
    await FileSystem.unlink(data.zoomImageUrl!);
  }

  // Save SQLite
  const db = await getDBConnection();
  await saveKoreaMapDataToDB(db, updateKoreaRegionData);
};

// Reset KoreaMapData -> SQLite & Firebase
export const resetMapData = async () => {
  // Save SQLite
  const db = await getDBConnection();
  MAP_DATA_INIT.forEach(async item => await saveKoreaMapDataToDB(db, item));
  MAP_DATA_INIT.forEach(async item => {
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
export const getDashboardKoreaMapData = async (): Promise<IDashboardMap> => {
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
