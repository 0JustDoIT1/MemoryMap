import {
  IColoredRegionList,
  IGetKoreaMapDataByColorResult,
  IMapDataObject,
  IRegionData,
} from 'src/types/koreaMap';
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
import {safeUnlink} from 'src/utils/storage/fileSystem';
import {APP_DOC_DIR} from 'src/constants/storage';

// res type to KoreaMapDataObject
const mapResultSetToObject = (res: [ResultSet]): IMapDataObject => {
  const rows = res[0].rows;

  return Array.from({length: rows.length}, (_, i) => rows.item(i)).reduce(
    (acc, region) => {
      acc[region.id] = region;
      return acc;
    },
    {} as IMapDataObject,
  );
};

// Get KoreaMapData -> SQLite
export const getAllKoreaMapData = async (): Promise<IMapDataObject> => {
  const db = await getDBConnection();
  const result = await getKoreaMapDataToDB(db);

  return mapResultSetToObject(result);
};

export const updateKoreaMapData = async (
  data: IRegionData,
): Promise<[ResultSet]> => {
  const db = await getDBConnection();
  return saveKoreaMapDataToDB(db, data);
};

// Return data when color is updated
const updateDataByTypeColor = (
  data: IRegionData,
  color: string,
): IRegionData => {
  const {imageUrl, ...rest} = data;
  // Setting Data
  return {
    ...rest,
    background: color,
    type: 'color',
  };
};

// Update background on map (color) -> SQLite
export const updateMapColorById = async (
  data: IRegionData,
  color: string,
): Promise<void> => {
  // Setting Data
  const updateKoreaMapData = updateDataByTypeColor(data, color);

  // type is photo, remove the existing photo
  if (data.type === 'photo') {
    await Promise.all([
      safeUnlink(data.imageUrl),
      safeUnlink(data.zoomImageUrl),
    ]);
  }

  // Save SQLite
  const db = await getDBConnection();
  await saveKoreaMapDataToDB(db, updateKoreaMapData);
};

// Return data when image is updated
const updateDataByTypePhoto = (
  data: IRegionData,
  imageUrl: string,
  zoomImageUrl: string,
): IRegionData => ({
  ...data,
  background: `url(#${data.id})`,
  type: 'photo',
  imageUrl,
  zoomImageUrl,
});

// Update background on map (image) -> SQLite
export const updateMapPhotoById = async (
  data: IRegionData,
  imageUri: string,
): Promise<void> => {
  // Upload Image -> Save
  const cropImagePath = `file://${APP_DOC_DIR}/${data.id}_${Date.now()}.jpg`;
  const zoomImagePath = `file://${APP_DOC_DIR}/${data.id}_${Date.now()}_zoom.jpg`;

  // Response Image = ZoomImage
  // Crop Image for map view (with Image Resizer)
  const {width: cropWidth, height: cropHeight} =
    MAP_SVG_DATA[data.id].mapSvgStyle;

  await FileSystem.cp(imageUri, zoomImagePath);

  const resized = await ImageResizer.createResizedImage(
    imageUri,
    cropWidth,
    cropHeight,
    'PNG',
    0.9,
  );

  await FileSystem.cp(resized.uri, cropImagePath);

  if (data.type === 'photo') {
    Promise.all([
      await safeUnlink(data.imageUrl),
      await safeUnlink(data.zoomImageUrl),
    ]);
  }

  // Setting data
  const updateKoreaRegionData = updateDataByTypePhoto(
    data,
    cropImagePath,
    zoomImagePath,
  );

  // Save SQLite
  const db = await getDBConnection();
  await saveKoreaMapDataToDB(db, updateKoreaRegionData);
};

// Return data when background is deleted
const resetRegionData = (data: IRegionData): IRegionData => {
  const {imageUrl, zoomImageUrl, ...rest} = data;
  // Setting Data
  return {
    ...rest,
    background: '#ffffff',
    type: 'init',
    story: 0,
  };
};

// Delete background on map (color or image) -> SQLite
export const deleteMapDataById = async (data: IRegionData) => {
  // type is photo, remove the existing photo
  if (data.type === 'photo') {
    await Promise.all([
      await safeUnlink(data.imageUrl),
      await safeUnlink(data.zoomImageUrl),
    ]);
  }

  // Setting Data
  const updateKoreaRegionData = resetRegionData(data);

  // Save SQLite
  const db = await getDBConnection();
  await saveKoreaMapDataToDB(db, updateKoreaRegionData);
};

// Reset KoreaMapData -> SQLite
export const resetMapData = async (): Promise<void> => {
  // Save SQLite
  const db = await getDBConnection();

  await Promise.all(
    MAP_DATA_INIT.filter(item => item.type === 'photo').flatMap(item => [
      FileSystem.unlink(item.imageUrl!),
      FileSystem.unlink(item.zoomImageUrl!),
    ]),
  );

  await Promise.all(
    MAP_DATA_INIT.map(async item => await saveKoreaMapDataToDB(db, item)),
  );
};

// Get Colored(color & photo) KoreaMapData
export const getKoreaMapDataByColor =
  async (): Promise<IGetKoreaMapDataByColorResult> => {
    // Get SQLite
    const db = await getDBConnection();

    const res = await getKoreaMapDataByColorToDB(db);
    const obj = mapResultSetToObject(res);

    const regionList = getColorRegionList(obj);
    const regionMainList = Object.keys(regionList).sort((a, b) =>
      a.localeCompare(b, 'ko'),
    );

    return {all: regionList, main: regionMainList};
  };

// Update koreaMapData["story"] when story update(add or delete)
export const updateKoreaMapDataStory = async (
  id: string,
  count: number,
): Promise<void> => {
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

  // 가장 많이 색칠된 main 지역
  const res = await mostColorMainRegionToDB(db); // rows must be sorted by count DESC
  const rows = res[0].rows;

  // Most color region (main & count)
  const arr: {main: string; count: number}[] = Array.from(
    {length: rows.length},
    (_, i) => rows.item(i),
  );
  const top = arr.length ? arr[0].count : 0; // 최댓값

  const mostRegion = arr
    .filter(region => Number(region.count) === top) // 동률만
    .map(region => ({main: region.main, count: region.count}));

  return {...count, mostRegion};
};
