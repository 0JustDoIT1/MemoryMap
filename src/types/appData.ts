import {KoreaMapDataObject} from './koreaMap';
import {Story} from './story';

export interface AppData {
  koreaMapData: KoreaMapDataObject;
  story: Story[];
  mapImage: {[key: string]: string};
  zoomImage: {[key: string]: string};
}

export type AppShowRegionName = 'show' | 'condition' | 'hide';

export type AppAdShowType = 'map' | 'story';
