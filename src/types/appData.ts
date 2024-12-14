import {KoreaMapDataObject} from './koreaMap';
import {Story} from './story';

export interface AppData {
  koreaMapData: KoreaMapDataObject;
  story: Story[];
  image: {[key: string]: string};
}

export type AppShowRegionName = 'show' | 'condition' | 'hide';
