import {IMapDataObject} from './koreaMap';
import {IStory} from './story';

export interface IAppData {
  koreaMapData: IMapDataObject;
  story: IStory[];
  mapImage: {[key: string]: string};
  zoomImage: {[key: string]: string};
}
