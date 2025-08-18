import {AD_SHOW_CATEGORY} from 'src/constants/ad';
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
  (typeof AD_SHOW_CATEGORY)[keyof typeof AD_SHOW_CATEGORY];
