import {
  GetColorRegionList,
  KoreaMapDataObject,
  KoreaRegionData,
} from 'src/types/koreaMap';
import {KoreaRegionList, RegionList} from 'src/constants/regionList';
import {koreaMapDataInit} from 'src/constants/koreaMapData';

// KoreaMapData Array to Object
export const koreaMapDataToObject = (data: KoreaRegionData[]) => {
  const koreaMapDataObject: KoreaMapDataObject = {};
  data.forEach(item => (koreaMapDataObject[item.id] = item));

  return koreaMapDataObject;
};

// Get local svg data by id
export const getSvgDataById = (id: string): RegionList => {
  let result: any;

  // Find the desired value in an object (Defth First Search method, nested objects are also possible)
  const DFS = (obj: any, name: any, val: any) => {
    if (obj[name] === val) result = obj;
    else
      Object.values(obj).forEach(value => {
        if (typeof value === 'object') DFS(value, name, val);
      });
  };

  DFS(KoreaRegionList, 'id', id);

  return result;
};

// Id array matching type
export const getIdArrayByType = (
  data: KoreaMapDataObject,
  type: 'init' | 'color' | 'photo',
) => {
  const arr: string[] = [];

  Object.values(data).forEach(value => {
    if (value.type === type) {
      arr.push(value.id);
    }
  });

  return arr;
};

// Get region name from the data (value, not title)
export const getRegionTitle = (data: KoreaRegionData) => {
  let title = data.title;
  if (title !== data.main) title = `${data.main} ${data.title}`;

  return title;
};

// Get region name from the KoreaMapDataInit (value, not title)
export const getRegionTitleByList = (id: string) => {
  const koreaMapDataObject = koreaMapDataToObject(koreaMapDataInit);

  const title = getRegionTitle(koreaMapDataObject[id]);

  return title;
};

// Get a list of map colored region (color & image)
export const getColorRegionList = (data: KoreaMapDataObject) => {
  const result: GetColorRegionList = {};

  const colorList = Object.values(data);

  colorList.forEach((region, index) => {
    const title = region.title;
    const main = region.main;

    const value =
      main === title
        ? {
            child: false,
            sub: [{id: region.id, title: title}],
          }
        : {
            child: true,
            sub: [{id: region.id, title: title}],
          };

    if (index === 0) result[main] = value;
    else {
      const exist = result[main];
      if (exist)
        result[main].sub.push({
          id: region.id,
          title: title,
        });
      else result[main] = value;
    }
  });

  return result;
};
