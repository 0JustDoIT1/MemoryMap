import {
  GetColorRegionList,
  KoreaMapDataObject,
  KoreaRegionData,
} from 'src/types/koreaMap';
import {koreaMapDataInit} from 'src/constants/koreaMapData';

// KoreaMapData Array to Object
export const koreaMapDataToObject = (data: KoreaRegionData[]) => {
  const koreaMapDataObject: KoreaMapDataObject = {};
  data.forEach(item => (koreaMapDataObject[item.id] = item));

  return koreaMapDataObject;
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

// Get region name from the data (main + title)
export const getRegionTitle = (data: KoreaRegionData) => {
  let title = data.title;
  if (title !== data.main) title = `${data.main} ${data.title}`;

  return title;
};

// Get region name from the KoreaMapDataInit (main + title)
export const getRegionTitleById = (id: string) => {
  const koreaMapDataObject = koreaMapDataToObject(koreaMapDataInit);

  const title = getRegionTitle(koreaMapDataObject[id]);

  return title;
};

// Get main region name from the KoreaMapDataInit
export const getRegionMainTitleById = (id: string) => {
  const region = koreaMapDataInit.find(item => item.id.includes(id));

  const main = region?.main!;

  return main;
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
