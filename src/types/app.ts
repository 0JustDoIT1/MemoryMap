import {adShowCategory} from 'src/constants/app';
import {IKoreaMapDataObject} from './koreaMap';
import {IStory} from './story';

export interface IAppData {
  koreaMapData: IKoreaMapDataObject;
  story: IStory[];
  mapImage: {[key: string]: string};
  zoomImage: {[key: string]: string};
}

export type IAppShowRegionName = 'show' | 'condition' | 'hide';

export type IAppAdShowCategory =
  (typeof adShowCategory)[keyof typeof adShowCategory];
