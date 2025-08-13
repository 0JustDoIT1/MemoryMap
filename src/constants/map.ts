import {IAppShowRegionName} from 'src/types/app';

export const MAP_EDGE_OFFSET = 70;
export const MIN_SCALE = 0.5;

export const MAP_TEXT_OPTIONS: {
  value: IAppShowRegionName;
  label: string;
}[] = [
  {value: 'show', label: '항상 표시'},
  {value: 'condition', label: '빈 지역명만 표시'},
  {value: 'hide', label: '표시 안함'},
];
