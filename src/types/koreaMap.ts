export type IMapDataObject = Record<string, IRegionData>;

export interface IRegionData {
  id: string;
  title: string;
  main: string;
  type: 'init' | 'photo' | 'color';
  background: string;
  story: number;
  imageUrl?: string;
  zoomImageUrl?: string;
}

export interface ISvgData {
  mapSvgStyle: {x: number; y: number; width: number; height: number};
  mapSvgType: 'path' | 'polygon';
  mapSvgPath: string;
  regionSvgStyle: {x: number; y: number; width: number; height: number};
  regionSvgType: 'path' | 'polygon';
  regionSvgPath: string;
  strokeConfig: {
    stroke: string;
    strokeWidth: string;
    strokeMiterlimit?: string;
  };
}

export type IMapSvgData = Record<string, ISvgData>;

// 지도 색칠된 지역(color & photo) 리스트 가져오기 결과값

interface IColoredRegionData {
  child: boolean;
  sub: {id: string; title: string}[];
}

export type IColoredRegionList = Record<string, IColoredRegionData>;

export interface IGetKoreaMapDataByColorResult {
  all: IColoredRegionList;
  main: string[];
}

export interface ICountedRegionByType {
  color: number;
  photo: number;
  init: number;
}

export type IShowRegionName = 'show' | 'condition' | 'hide';
