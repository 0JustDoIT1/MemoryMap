export interface KoreaMapDataObject {
  [key: string]: KoreaRegionData;
}

export interface KoreaRegionData {
  id: string;
  title: string;
  main: string;
  type: 'init' | 'photo' | 'color';
  background: string;
  story: number;
  imageUrl?: string;
  zoomImageUrl?: string;
}

export interface SvgData {
  mapSvgStyle: {x: number; y: number; width: number; height: number};
  regionSvgStyle: {x: number; y: number; width: number; height: number};
  regionSvgType: 'path' | 'polygon';
  regionSvgPath: string;
}

export interface KoreaMapSvgData {
  [key: string]: SvgData;
}

// 지도 색칠된 지역(color & photo) 리스트 가져오기 결과값
export interface GetColorRegionList {
  [key: string]: {
    child: boolean;
    sub: {id: string; title: string}[];
  };
}
