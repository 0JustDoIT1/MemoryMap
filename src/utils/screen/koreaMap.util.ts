import {
  IColoredRegionList,
  IMapDataObject,
  IRegionData,
} from 'src/types/koreaMap';
import {MAP_DATA_INIT} from 'src/constants/koreaMapData';

// KoreaMapData Array to Object
export const koreaMapDataToObject = (data: IRegionData[]): IMapDataObject => {
  return data.reduce((acc, cur) => {
    acc[cur.id] = cur;
    return acc;
  }, {} as IMapDataObject);
};

// Id array matching type
export const getIdArrayByType = (
  data: IMapDataObject,
  type: 'init' | 'color' | 'photo',
): string[] => {
  return Object.values(data)
    .filter(region => region.type === type)
    .map(region => region.id);
};

// Get region name from the data (main + title)
export const getRegionTitle = (data: IRegionData): string => {
  return data.title === data.main ? data.title : `${data.main} ${data.title}`;
};

// Get region name from the KoreaMapDataInit (main + title)
export const getRegionTitleById = (id: string): string => {
  const koreaMapDataObject = koreaMapDataToObject(MAP_DATA_INIT);
  return getRegionTitle(koreaMapDataObject[id]);
};

// Get main region name from the KoreaMapDataInit
export const getRegionMainTitleById = (id: string): string | undefined => {
  const region = MAP_DATA_INIT.find(item => item.id.includes(id));

  return region?.main;
};

// Get a list of map colored region (color & image)
export const getColorRegionList = (
  data: IMapDataObject,
): IColoredRegionList => {
  return Object.values(data).reduce<IColoredRegionList>((acc, region) => {
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
