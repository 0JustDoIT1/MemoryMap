import {
  IGetColorRegionList,
  IKoreaMapDataObject,
  IKoreaRegionData,
} from 'src/types/koreaMap';
import {koreaMapDataInit} from 'src/constants/koreaMapData';

// KoreaMapData Array to Object
export const koreaMapDataToObject = (
  data: IKoreaRegionData[],
): IKoreaMapDataObject => {
  return data.reduce((acc, cur) => {
    acc[cur.id] = cur;
    return acc;
  }, {} as IKoreaMapDataObject);
};

// Id array matching type
export const getIdArrayByType = (
  data: IKoreaMapDataObject,
  type: 'init' | 'color' | 'photo',
): string[] => {
  return Object.values(data)
    .filter(region => region.type === type)
    .map(region => region.id);
};

// Get region name from the data (main + title)
export const getRegionTitle = (data: IKoreaRegionData): string => {
  return data.title === data.main ? data.title : `${data.main} ${data.title}`;
};

// Get region name from the KoreaMapDataInit (main + title)
export const getRegionTitleById = (id: string): string => {
  const koreaMapDataObject = koreaMapDataToObject(koreaMapDataInit);
  return getRegionTitle(koreaMapDataObject[id]);
};

// Get main region name from the KoreaMapDataInit
export const getRegionMainTitleById = (id: string): string | undefined => {
  const region = koreaMapDataInit.find(item => item.id.includes(id));

  return region?.main;
};

// Get a list of map colored region (color & image)
export const getColorRegionList = (
  data: IKoreaMapDataObject,
): IGetColorRegionList => {
  return Object.values(data).reduce<IGetColorRegionList>((acc, region) => {
    const {id, title, main} = region;

    const entry = acc[main] ?? {
      child: main !== title,
      sub: [],
    };

    entry.sub.push({id, title});
    acc[main] = entry;

    return acc;
  }, {});
};
